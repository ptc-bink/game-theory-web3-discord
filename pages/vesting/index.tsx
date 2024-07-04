"use client"

import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import JsonView from "react18-json-view";
import toast from "react-hot-toast";
import 'react18-json-view/src/style.css'

import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import UserAdd from "@/public/avatar/user-add.svg"

import PermittedUsersModal from "@/pages/components/PermittedUsersModal";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "@/pages/components/forms/Dropdown";
import AppContext from "@/providers/AppContext";

import { getVestingReportsList, getServers, getVestingReportData } from "@/hook";
import { IDropdownListProps, IVestingReport, IServer, IVestingReportListItem } from "@/utils/_type";

const VESTING: React.FC<IVESTING> = () => {

    const { permittedUserModalOpen, setPermittedUserModalOpen } = useContext(AppContext);
    const [vestingReports, setVestingReports] = useState<IVestingReport[]>([]);
    const [filterMiddleVestingReports, setFilterMiddleVestingReports] = useState<IVestingReport[]>([]);
    const [filterFinalVestingReports, setFilterFinalVestingReports] = useState<IVestingReport[]>([]);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [reportNameDropdownList, setReportNameDropdownList] = useState<IDropdownListProps[]>([]);
    const [totalHeld, setTotalHeld] = useState<number>(0);
    const [totalMint, setTotalMint] = useState<number>(0);
    const [totalBought, seTtotalBought] = useState<number>(0);
    const [totalSpend, setTotalSpend] = useState<number>(0);
    const [totalSold, setTotalSold] = useState<number>(0);
    const [totalEarned, setTotalEarned] = useState<number>(0);
    const [passedVesting, setPassedVesting] = useState<number>(0);
    const [searchValue, setSearchValue] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");
    const [reportValue, setReportValue] = useState<number>();
    const [isInitialized, setIsInitialized] = useState<boolean>(false);
    const [detailItemIndex, setDetailItemIndex] = useState<number>(0);

    const mainAction = async (serverID: string) => {
        const res: any = await getVestingReportsList(serverID);

        let tempVestingReportList: IVestingReportListItem[] = [];
        let tempVestingReports: IVestingReport[] = [];
        let tempReportNameDropdownList: IDropdownListProps[] = [];

        if (res.status === 200 && res.data.length > 0) {

            tempVestingReportList = res.data;

            tempReportNameDropdownList = tempVestingReportList.map(item => {
                return {
                    id: item.id.toString(),
                    name: item.title
                }
            })
        } else {
            toast.error("No report to show")
        }

        if (tempVestingReportList.length > 0) {
            for (const vestingReport of tempVestingReportList) {
                const res: any = await getVestingReportData(serverID, vestingReport.id.toString());

                if (res.status === 200 && res.data.length > 0) {
                    const temp: IVestingReport[] = res.data.map((item: any) => {
                        return {
                            reportID: vestingReport.id,
                            ...item
                        }
                    })

                    tempVestingReports = tempVestingReports.concat(temp);
                }
            }
        }

        setReportNameDropdownList(tempReportNameDropdownList);
        setVestingReports(tempVestingReports);
        setIsInitialized(false)
    }

    const initAction = async () => {
        const tempServerList: any = await getServers();

        if (tempServerList.status == 200) {
            if (tempServerList.data.length > 0) {

                const tempServerDropdownList: IDropdownListProps[] = tempServerList.data.map((item: IServer, index: number) => {
                    return { name: item.guild.name, id: item.guild.id }
                })

                // setServerValue(tempServerList.data[0].guildID)
                setServerDropdownList(tempServerDropdownList);
                // mainAction(tempServerList.data[0].guildID)

            } else {
                toast.error("No server to show")
            }
        }
    }

    const reportAction = async (reportValue: number) => {
        let tempVestingReports: IVestingReport[] = [];

        if (reportValue) {
            if (vestingReports.length > 0) {
                tempVestingReports = vestingReports.filter(filterMiddleVestingReport =>
                    filterMiddleVestingReport.reportID == reportValue
                )
            }
        } else {
            tempVestingReports = vestingReports;
        }

        let tempTotalHeld = 0;
        let tempTotalMint = 0;
        let tempTotalBought = 0;
        let tempTotalSpend = 0;
        let tempTotalSold = 0;
        let tempTotalEarned = 0;
        let tempPassedVesting = 0;

        for (const tempVestingReport of vestingReports) {
            tempTotalHeld += tempVestingReport.NFTs_held;
            tempTotalMint += tempVestingReport.NFTs_minted;
            tempTotalBought += tempVestingReport.NFTs_bought;
            tempTotalSpend += parseFloat(tempVestingReport.Amount_Spent_NFTs);
            tempTotalSold += tempVestingReport.NFTs_sold;
            tempTotalEarned += parseFloat(tempVestingReport.Amount_Earned_NFTs);
            tempPassedVesting += tempVestingReport.passed_vesting;
        }

        setTotalHeld(tempTotalHeld);
        setTotalMint(tempTotalMint);
        seTtotalBought(tempTotalBought);
        setTotalSpend(tempTotalSpend);
        setTotalSold(tempTotalSold);
        setTotalEarned(tempTotalEarned);
        setPassedVesting(tempPassedVesting);

        setFilterMiddleVestingReports(tempVestingReports);
        setFilterFinalVestingReports(tempVestingReports);
    }

    const filterAction = async () => {
        let tempVestingReports: IVestingReport[] = [];

        if (searchValue !== "") {
            if (filterMiddleVestingReports.length > 0) {
                tempVestingReports = filterMiddleVestingReports.filter(vestingReport =>
                    vestingReport.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                    vestingReport.user_id.includes(searchValue.toLowerCase()) ||
                    vestingReport.wallet1?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    vestingReport.wallet2?.toLowerCase().includes(searchValue.toLowerCase())
                )

            }
        } else {
            tempVestingReports = filterMiddleVestingReports;
        }

        setFilterFinalVestingReports(tempVestingReports);
    }

    const handleDetailItem = (index: number) => {
        setDetailItemIndex(index);
    }

    const tablebody = (item: IVestingReport, index: number) => {
        return (
            <>
                <tr key={index} onClick={() => handleDetailItem(index)} className={`${detailItemIndex == index && "bg-cgrey-200"} hover:bg-cgrey-100`}>
                    <td>{index}</td>
                    <td className="text-left pl-3">{item.username.length > 10 ? item.username.slice(0, 4) + "..." + item.username.slice(-3) : item.username}</td>
                    <td className="text-left">{item.wallet1 ? item.wallet1.slice(0, 4) + "..." + item.wallet1.slice(-3) : "-"}</td>
                    <td>{item.wallet2 ? item.wallet2.slice(0, 4) + "..." + item.wallet2.slice(-3) : "-"}</td>
                    <td>{item.NFTs_held == 0 ? "-" : item.NFTs_held}</td>
                    <td>{item.NFTs_minted == 0 ? "-" : item.NFTs_minted}</td>
                    <td>{item.Held_Minted_for_Days == 0 ? "-" : item.Held_Minted_for_Days + "  days"}</td>
                    <td>{item.NFTs_bought == 0 ? "-" : item.NFTs_bought}</td>
                    <td>{item.Held_Bought_for_Days == 0 ? "-" : item.Held_Bought_for_Days + "  days"}</td>
                    <td>{parseFloat(item.Amount_Spent_NFTs).toFixed(3) == "0.000" ? "-" : parseFloat(item.Amount_Spent_NFTs).toFixed(3)}</td>
                    <td>{item.NFTs_sold == 0 ? "-" : item.NFTs_sold}</td>
                    <td>{parseFloat(item.Amount_Earned_NFTs).toFixed(3) == "0.000" ? "-" : parseFloat(item.Amount_Earned_NFTs).toFixed(3)}</td>
                    <td className="flex items-center justify-center">{item.passed_vesting ? <TiTick className=" text-[#00FF00]" /> : <IoClose className="text-[#FF0000] " />}</td>
                </tr>
                {detailItemIndex == index &&
                    item.transaction_hashes.length > 0 &&
                    (<>
                        <tr className="bg-cgrey-200 hover:bg-cdark-100">
                            <td className="text-center underline font-bold" colSpan={13}>EXPANDED ( PROOFS ) - For&nbsp;&nbsp;&nbsp;<span className="underline font-bold uppercase">{item.username}</span></td>
                        </tr>
                        <tr className="bg-cgrey-200 hover:bg-cdark-100">
                            <td></td>
                            <td className="text-left pl-3 underline font-bold">Type</td>
                            <td className="text-left underline font-bold" colSpan={11}>Hash</td>
                        </tr>
                        {item.transaction_hashes.map(transaction => {
                            return (
                                <tr key={index} className="bg-cgrey-200 hover:bg-cdark-100">
                                    <td></td>
                                    <td className="text-left pl-3">{transaction.type}</td>
                                    <td colSpan={11} className="text-left underline text-[#5865F2]"><a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank">{`https://etherscan.io/tx/${transaction.hash}`}</a></td>
                                </tr>
                            )
                        })}
                    </>)
                }
            </>
        )
    }

    const handlePermiitedBtn = async () => {
        setPermittedUserModalOpen(true)
    }

    useEffect(() => {

        filterAction();

    }, [searchValue])

    useEffect(() => {
        setIsInitialized(true);

        if (serverValue) {
            mainAction(serverValue);
            toast.success("Please select report");
        } else {
            toast.success("Please select server");
            setFilterFinalVestingReports([]);
            setReportNameDropdownList([]);
        }
    }, [serverValue])

    useEffect(() => {
        if (serverValue && reportValue) {
            reportAction(reportValue);
        } else {
            if (serverValue) toast.success("Please select report");

            setTotalHeld(0);
            setTotalMint(0);
            seTtotalBought(0);
            setTotalSpend(0);
            setTotalSold(0);
            setTotalEarned(0);
            setPassedVesting(0);

            setFilterFinalVestingReports([]);
        }
    }, [reportValue])

    useEffect(() => {
        initAction();
    }, [])

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex flex-col gap-4">
                <div className="md:block hidden">
                    <div className="flex gap-6 items-center">
                        <div className="bg-cdark-200 border cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
                            <Image
                                src={ArrowLeft}
                                width="24"
                                height="24"
                                alt="arrow left"
                            />
                        </div>
                        <p className="text-cwhite text-2xl font-semibold">Vesting Reports</p>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 items-center">
                    <div className="flex gap-2 md:flex-row flex-col">
                        <Dropdown
                            dropdownList={serverDropdownList}
                            placeholder="Select server"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setServerValue}
                        />
                        <Dropdown
                            dropdownList={reportNameDropdownList}
                            placeholder="Select report"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setReportValue}
                        />
                    </div>
                    <div className="flex w-full text-sm font-normal gap-2 items-center">
                        <div className="flex flex-grow ">
                            <SearchBtn
                                placeholder="Search reports"
                                endContent="Refresh"
                                callback={setSearchValue}
                                isInitialized={isInitialized}
                            />
                        </div>
                        <div onClick={handlePermiitedBtn} className=" cursor-pointer hover:bg-cgrey-900 hover:border-cdark-100 flex gap-2 justify-between w-fit items-center rounded-lg outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-2">
                            <Image
                                src={UserAdd}
                                width="16"
                                height="16"
                                alt="user avatar"
                            />
                            <p className="text-cdark-100 text-sm leading-5 font-medium text-center sm:block hidden">Permitted Users</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <table className="text-center border-collapse border border-cgrey-900">
                    <thead>
                        <tr className="border-collapse border border-cgrey-900 p-2 text-sm font-normal text-cgrey-900">
                            <th className="border-collapse border border-cgrey-900 p-2">Total Held</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Total Mint</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Total Bought</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Total Spend</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Total Sold</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Total Earned</th>
                            <th className="border-collapse border border-cgrey-900 p-2">Passed vesting</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-collapse border border-cgrey-900 font-normal text-cwhite">
                            <td className="border-collapse border border-cgrey-900 p-2">{totalHeld}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{totalMint}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{totalBought}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{totalSpend.toFixed(2)}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{totalSold}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{totalEarned.toFixed(2)}</td>
                            <td className="border-collapse border border-cgrey-900 p-2">{passedVesting}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {
                filterFinalVestingReports.length > 0 ? <div
                    className="w-full text-center items-center text-cwhite text-sm border border-cgrey-200 rounded">
                    <table className="w-full border-collapse overflow-scroll">
                        <thead>
                            <tr className="sticky z-10 top-0 bg-cgrey-200 text-sm font-bold text-cgrey-900">
                                <th className="pl-3">ID</th>
                                <th className="text-left pl-3">Name</th>
                                <th>Wallet1</th>
                                <th>Wallet2</th>
                                <th>NFTs Held</th>
                                <th>NFTs Minted</th>
                                <th>Held Minted</th>
                                <th>NFTs Bought</th>
                                <th>Held Bought</th>
                                <th>Amount Spend</th>
                                <th>NFTs Sold</th>
                                <th>Amount Earned</th>
                                <th>Passed Vesting</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterFinalVestingReports.map((item: IVestingReport, index: number) => {
                                return tablebody(item, index + 1);
                            })}
                        </tbody>
                    </table>
                </div> : <div className="flex flex-col gap-4 px-3 py-4 min-h-[calc(100vh-380px)] justify-center items-center">
                    <div className="text-cwhite text-2xl leading-8 font-medium text-center w-full">No vesting report to Show</div>
                </div>
            }
            {permittedUserModalOpen && serverValue !== "" && <PermittedUsersModal data={vestingReports} />}
        </div>
    );
}

export default VESTING;

interface IVESTING { }