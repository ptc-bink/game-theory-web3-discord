"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import GiveawayCard from "@/pages/components/GiveawayCard";
import Dropdown from "@/pages/components/forms/Dropdown";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import { IGiveaway, IServer, IDropdownListProps } from "../utils/_type";

import Refresh from "@/public/avatar/refresh.svg"
import Add from "@/public/avatar/add.svg"

// import { giveAways } from "../utils/_data";

import { getGiveaways, getServers } from "../hooks/hook";
import AppContext from "../providers/AppContext";

const Dashboard: React.FC<IDashboard> = () => {

    const { isAdmin } = useContext(AppContext);
    const [serverValue, setServerValue] = useState<string>("");
    const [giveaways, setGiveaways] = useState<IGiveaway[]>([]);
    const [filterData, setFilterData] = useState<IGiveaway[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([])

    const initAction = async () => {

        const tempServerList: IServer[] = await getServers();
        const tempGiveaways: IGiveaway[] = await getGiveaways();

        if (tempServerList) {
            if (tempServerList.length > 0) {
                const tempServerDropdownList: IDropdownListProps[] = tempServerList.map((item, index) => {
                    return { name: item.guild.name, id: item.guild.id }
                })
                setServerDropdownList(tempServerDropdownList);
            } else {
                return toast.error("No server to show")
            }
        }

        if (tempGiveaways !== undefined) {
            if (tempGiveaways.length > 0) {
                setGiveaways(tempGiveaways);
                setFilterData(tempGiveaways);
            } else {
                return toast.error("No giveaway to show");
            }
        } else {
            return toast.error("Sever error");
        }
    }

    const filterAction = async () => {

        if (giveaways.length > 0) {

            let tempFilterData: IGiveaway[] = [];

            if (serverValue !== "") {
                tempFilterData = giveaways.filter(giveaway =>
                    giveaway.messageID.toLowerCase().includes(serverValue.toLowerCase())
                )
            }

            if (searchInput !== "" && tempFilterData.length > 0) {
                tempFilterData = giveaways.filter(giveaway =>
                    giveaway.title.toLowerCase().includes(searchInput?.toLowerCase()) ||
                    giveaway.messageID.toLowerCase().includes(searchInput?.toLowerCase()) ||
                    giveaway.chain.toLowerCase().includes(searchInput?.toLowerCase()) ||
                    giveaway.type.toLowerCase().includes(searchInput?.toLowerCase())
                )
                setFilterData(tempFilterData);
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    useEffect(() => {
        filterAction();
    }, [searchInput, serverValue])

    return (
        <div className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <p className="text-[#FFFFFF] text-2xl font-semibold md:block hidden">Dashboard</p>
                <div className="items-center w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-4 pt-4 text-sm">
                    <div>
                        <Dropdown
                            dropdownList={serverDropdownList}
                            placeholder="Select Server"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setServerValue}
                        />
                    </div>
                    <div className="flex w-full text-sm font-normal">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search giveaway"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        {isAdmin && <Link href="/dashboard/create-giveaway" className="ml-2 flex justify-between bg-[#FFFFFF] w-fit items-center rounded-lg outline-none border border-[#EEEEEE] px-[10px] py-3">
                            <Image
                                src={Add}
                                width="16"
                                height="16"
                                alt="add button"
                            />
                            <p className="text-[#16171B] text-sm leading-5 font-medium lg:block hidden">Create Giveaway</p>
                        </Link>}
                    </div>
                </div>
            </div>
            {
                filterData.length > 0 ?
                    <div className="flex flex-col gap-4">
                        {filterData?.map((item, index) => (
                            < GiveawayCard
                                key={index}
                                giveawayID={item.messageID}
                                chain={item.chain}
                                avatar={item.creator.avatar}
                                title={item.title}
                                entrants={item.entrants}
                                quantity={item.quantity}
                                enterDate={item.chain}
                                timeRemaining={item.expiry}
                                harvested={item.harvested}
                                bidders={item.bidders}
                                winners={item.winners}
                            />
                        ))}
                    </div> :
                    <div className="flex flex-col gap-4 px-3 py-4 min-h-[calc(100vh-280px)] justify-center items-center">
                        <div className="text-[#FFFFFF] text-2xl leading-8 font-medium text-center w-full">No Giveaway to Show</div>
                    </div>
            }
        </div>
    );
}

export default Dashboard;

interface IDashboard { };