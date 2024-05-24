"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import GiveawayCard from "@/pages/components/GiveawayCard";
import Dropdown from "@/pages/components/forms/Dropdown";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import { IBiddersGiveaway, IGiveaway, IServer, IDropdownListProps } from "../utils/_type";

// import { giveawayList, dashboardDropdownList } from "@/pages/utils/_data";

import Refresh from "@/public/avatar/refresh.svg"
import Add from "@/public/avatar/add.svg"

// import { giveAways } from "../utils/_data";

import { adminCheck, getDashboardInfo, getServerList } from "@/pages/hooks/action";
import { GetGiveaways } from "../hooks/hook";
import AppContext from "../providers/AppContext";

const Dashboard: React.FC<IDashboard> = () => {

    const { isAdmin, setIsAdmin } = useContext(AppContext);
    const [serverValue, setServerValue] = useState<string>("");
    const [giveAways, setGiveAways] = useState<IGiveaway[]>([]);
    const [serverList, setServerList] = useState<IServer[]>([]);
    const [searchInput, setSearchInput] = useState<string>();
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([])

    const initAction = async () => {
        const serverList: IServer[] = await getServerList();
        const giveAways: any = await GetGiveaways();

        console.log("dashboard giveaways =====>", giveAways);


        const isCheck: any = adminCheck()

        if (isCheck.message == "User is an administrator") {
            setIsAdmin(true);
        }

        if (serverList.length > 0) {
            const serverDropdownList: IDropdownListProps[] = serverList.map((item, index) => {
                return { name: item.guild.name, id: item.guild.id }
            })
            setServerDropdownList(serverDropdownList);
        }

        setIsAdmin(true)
        setGiveAways(giveAways);

        setServerList(serverList);
    }

    const chainValueAction = async () => {
        const giveAways: any = await GetGiveaways();

        setGiveAways(giveAways);
    }

    useEffect(() => {
        initAction();
    }, [])

    useEffect(() => {
        chainValueAction();
    }, [serverValue])

    return (
        <div className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <p className="text-[#FFFFFF] text-2xl font-semibold md:block hidden">Dashboard</p>
                <div className="items-center w-full grid md:grid-cols-2 grid-rows-2 gap-4 pt-4 text-sm">
                    <div>
                        <Dropdown
                            dropdownList={serverDropdownList}
                            placeholder="Select"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setServerValue}
                        />
                    </div>
                    <div className="flex w-full text-sm font-normal">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search giveaway"
                                endContent="Refresh"
                                // endContentImg={Refresh}
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
                            <p className="text-cdark-100 lg:block hidden">Create Giveaway</p>
                        </Link>}
                    </div>
                </div>
            </div>
            {giveAways.length > 0 && <div className="flex flex-col gap-4">
                {giveAways?.map((item, index) => (
                    < GiveawayCard
                        id={item.messageID}
                        chain={item.chain}
                        avatar={item.creator.avatar}
                        username={item.creator.username}
                        entrants={item.entrants}
                        quantity={item.quantity}
                        enterDate={item.chain}
                        timeRemaining={item.expiry}
                        harvested={item.harvested}
                        bidders={item.bidders}
                        winners={item.winners}
                    />
                ))}
            </div>}
        </div>
    );
}

export default Dashboard;

interface IDashboard { };