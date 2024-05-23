"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import GiveawayCard from "@/pages/components/GiveawayCard";
import Dropdown from "@/pages/components/forms/Dropdown";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import { IBiddersGiveaway, IGiveaway, IServerList } from "../utils/_type";

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
    const [serverList, setServerList] = useState<IServerList[]>([]);
    const [biddersGiveawayList, setBiddersGiveawayList] = useState<IBiddersGiveaway[]>([]);

    const initAction = async () => {
        const res: any = await getDashboardInfo();
        const serverList: IServerList[] = await getServerList();

        const isCheck: any = adminCheck()

        if (isCheck.message == "User is an administrator") {
            setIsAdmin(true);
        }

        setIsAdmin(true)

        setServerList(serverList);
        setBiddersGiveawayList(res.biddersGiveawayList);
    }

    const chainValueAction = async () => {
        const giveAways: any = await GetGiveaways(serverValue);

        setGiveAways(giveAways);
    }

    useEffect(() => {
        initAction();
        console.log("dashboard giveaway ====>", giveAways);
    }, [])

    useEffect(() => {


        chainValueAction();
    }, [serverValue])

    // const serverList: IServerList[] = res?.serverList;
    // const serverList: IServerList = res?.serverList;
    // const biddersGiveawayList: IBiddersGiveaway[] = res?.biddersGiveawayList;
    // const initGiveawayList: IGiveaway[] = res?.giveawayList;

    // console.log("serverList ===>", serverList);
    // console.log("biddersGiveawayList ===>", biddersGiveawayList);
    // console.log("initGiveawayList ===>", initGiveawayList);


    return (
        <div className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <p className="text-[#FFFFFF] text-2xl font-semibold md:block hidden">Dashboard</p>
                <div className="items-center w-full grid md:grid-cols-2 grid-rows-2 gap-4 pt-4 text-sm">
                    <div>
                        <Dropdown
                            dropdownList={serverList}
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
                                endContentImg={Refresh}
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
            <div className="flex flex-col gap-4">
                {giveAways?.map((item, index) => (
                    < GiveawayCard
                        id={item.messageID}
                        chain={item.chain}
                        avatar={item.creator.avatar}
                        username={item.creator.username}
                        entrants={item.entrants}
                        quantity={item.quantity}
                        enterDate={item.chain}
                        timeRemaining={item.expiry.toString()}
                        status="active"
                        bidders={item.bidders}
                        winners={item.winners}
                    />
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

interface IDashboard { };