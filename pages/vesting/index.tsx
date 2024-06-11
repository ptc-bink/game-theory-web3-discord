"use client"

import React, { useContext, useEffect, useState } from "react";
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

import { getPermittedusers, getServers, getVestingReports } from "@/hook";
import { IDropdownListProps, IVestingReport, IServer } from "@/utils/_type";

const VESTING: React.FC<IVESTING> = () => {

    const { permittedUserModalOpen, setPermittedUserModalOpen } = useContext(AppContext);
    const [vestingReports, setVestingReports] = useState<IVestingReport[]>([]);
    const [filterMiddleVestingReports, setFilterMiddleVestingReports] = useState<IVestingReport[]>([]);
    const [filterVestingReports, setFilterVestingReports] = useState<IVestingReport[]>([]);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [reportNameDropdownList, setReportNameDropdownList] = useState<IDropdownListProps[]>([]);
    const [reportNameFilterDropdownList, setReportNameFilterDropdownList] = useState<IDropdownListProps[]>([]);
    const [totalHeld, setTotalHeld] = useState<number>(0);
    const [totalMint, setTotalMint] = useState<number>(0);
    const [totalBought, seTtotalBought] = useState<number>(0);
    const [totalSpend, setTotalSpend] = useState<number>(0);
    const [totalSold, setTotalSold] = useState<number>(0);
    const [totalEarned, setTotalEarned] = useState<number>(0);
    const [passedVesting, setPassedVesting] = useState<number>(0);
    const [winningRole, setWinningRole] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");
    const [reportName, setReportName] = useState<string>("");

    const initAction = async () => {
        const tempServerList: any = await getServers();

        if (tempServerList.status == 200) {
            if (tempServerList.data.length > 0) {
                const tempServerDropdownList: IDropdownListProps[] = tempServerList.data.map((item: IServer, index: number) => {
                    return { name: item.guild.name, id: item.guild.id }
                })

                setServerDropdownList(tempServerDropdownList);

                let tempVestingReports: IVestingReport[] = [];

                for (const server of tempServerList.data) {
                    const res: any = await getVestingReports(server.guildID);

                    console.log("res ====> ", res);

                    if (res.status === 200) {
                        if (Array.isArray(res.data) && res.data.length > 0) {

                            for (const tempVestingReport of res.data) {
                                tempVestingReport.serverID = server.guildID;
                            }

                            tempVestingReports = tempVestingReports.concat(res.data);
                        }
                    }
                }

                let tempTotalHeld = 0;
                let tempTotalMint = 0;
                let tempTotalBought = 0;
                let tempTotalSpend = 0;
                let tempTotalSold = 0;
                let tempTotalEarned = 0;
                let tempPassedVesting = 0;

                for (const tempVestingReport of tempVestingReports) {
                    console.log(typeof (tempVestingReport.Amount_Spent_NFTs), "=================");

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

                setVestingReports(tempVestingReports);
                setFilterMiddleVestingReports(tempVestingReports);
                setFilterVestingReports(tempVestingReports);

            } else {
                toast.error("No server to show")
            }
        }
    }

    const filterAction = async () => {

        let tempVestingReports: IVestingReport[] = [];

        if (searchValue !== "") {
            if (vestingReports.length > 0) {
                tempVestingReports = vestingReports.filter(vestingReport =>
                    vestingReport.user_id.includes(searchValue?.toLowerCase()) ||
                    vestingReport.wallet1.toLowerCase().includes(searchValue?.toLowerCase()) ||
                    vestingReport.wallet2.toLowerCase().includes(searchValue?.toLowerCase())
                )
                setFilterVestingReports(tempVestingReports)
                setFilterMiddleVestingReports(tempVestingReports);
            }
        }

        if (serverValue !== "") {
            if (filterMiddleVestingReports.length > 0) {
                tempVestingReports = filterMiddleVestingReports.filter(filterMiddleVestingReport =>
                    filterMiddleVestingReport.serverID.includes(serverValue)
                )
                setFilterVestingReports(tempVestingReports);
            }
        }
    }

    const tablebody = (item: IVestingReport, index: number) => {
        return (
            <tr key={index} className="hover:bg-cgrey-200">
                <td>{index + 1}</td>
                <td className="text-left pl-3">{item.username.length > 10 ? item.username.slice(0, 4) + "..." + item.username.slice(-3) : item.username}</td>
                <td>{item.wallet1 ? item.wallet1.slice(0, 4) + "..." + item.wallet1.slice(-3) : "-"}</td>
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
        )
    }

    const handlePermiitedBtn = async () => {
        if (serverValue == "") {
            return toast.error("Please select server")
        }

        setPermittedUserModalOpen(true)
    }

    useEffect(() => {

        filterAction();

    }, [searchValue, serverValue])

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
                            dropdownList={serverDropdownList}
                            placeholder="Select report"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setServerValue}
                        />
                    </div>
                    <div className="flex w-full text-sm font-normal gap-2 items-center">
                        <div className="flex flex-grow ">
                            <SearchBtn
                                placeholder="Search servers"
                                endContent="Refresh"
                                callback={setSearchValue}
                            />
                        </div>
                        {/* <div onClick={handlePermiitedBtn} className=" cursor-pointer hover:bg-cgrey-900 hover:border-cdark-100 flex gap-2 justify-between w-fit items-center rounded-lg outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-2">
                            <Image
                                src={UserAdd}
                                width="16"
                                height="16"
                                alt="user avatar"
                            />
                            <p className="text-cdark-100 text-sm leading-5 font-medium text-center sm:block hidden">Permitted Users</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div id="Allied table" className="w-full flex justify-center items-center text-cwhite">
                <table className="text-center border-collapse border border-cgrey-900">
                    <tr className="border-collapse border border-cgrey-900 p-2">
                        <th className="border-collapse border border-cgrey-900 p-2">Total Held</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Total Mint</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Total Bought</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Total Spend</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Total Sold</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Total Earned</th>
                        <th className="border-collapse border border-cgrey-900 p-2">Passed vesting</th>
                    </tr>
                    <tr className="border-collapse border border-cgrey-900">
                        <td className="border-collapse border border-cgrey-900 p-2">{totalHeld}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{totalMint}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{totalBought}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{totalSpend.toFixed(2)}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{totalSold}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{totalEarned.toFixed(2)}</td>
                        <td className="border-collapse border border-cgrey-900 p-2">{passedVesting}</td>
                    </tr>
                </table>
            </div>
            <div id="Allocation table" className="w-full text-center items-center text-cwhite text-sm font-semibold overflow-scroll max-h-[calc(100vh-330px)]">
                <table className="w-full border-collapse">
                    <tr className="sticky z-10 top-0 bg-cgrey-200 rounded-lg">
                        <th>ID</th>
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
                    {vestingReports.map((item: IVestingReport, index: number) => {
                        return tablebody(item, index);
                    })}
                </table>
            </div>
            {permittedUserModalOpen && <PermittedUsersModal />}
        </div>
    );
}

export default VESTING;

interface IVESTING { }