"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Driver from "@/public/avatar/driver.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Table from "@/pages/components/forms/Table";
import { getAllocation, getServers } from "../hooks/hook";
import { IAllocation, IServer } from "../utils/_type";
import AppContext from "../providers/AppContext";

const Allocation: React.FC<IAllocationProps> = () => {

    const { serverList } = useContext(AppContext);

    const [searchInput, setSearchInput] = useState<string>();
    const [allocations, setAllocations] = useState<IAllocation[]>([]);

    const initAction = async () => {

        console.log("serverList  ========>", serverList);

        const tempAllocations: IAllocation[] = await getAllocation(serverList[0]?.guildID);

        if (tempAllocations && tempAllocations.length > 0) {
            setAllocations(tempAllocations)
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-center">
                    <div className="bg-cdark-200 border cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
                        <Image
                            src={ArrowLeft}
                            width="24"
                            height="24"
                            alt="arrow left"
                        />
                    </div>
                    <p className="text-[#FFFFFF] text-2xl font-semibold">Allocations</p>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-grow">
                        <SearchBtn
                            placeholder="Search..."
                            endContent="Search"
                            callback={setSearchInput}
                        />
                    </div>
                    <Link href="/allocations/add" className="flex justify-between items-center rounded-lg outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-[10px] py-3 gap-2">
                        <Image
                            src={Add}
                            width="16"
                            height="16"
                            alt="add button"
                        />
                        <p className="text-cdark-100">Submit</p>
                    </Link>
                </div>
            </div>
            {allocations.length > 0 ? <Table
                allocations={allocations}
            /> : <div className="flex justify-center items-center min-h-[calc(100vh-280px)]">
                <div className="flex flex-col w-fit border border-cgrey-100 gap-4 px-3 py-4 justify-center items-center">
                    <Image
                        src={Driver}
                        width="32"
                        height="32"
                        alt="no server to show"
                    />
                    <div className="flex flex-col w-full text-center justify-center gap-2">
                        <p className="text-2xl font-medium text-[#FFFFFF]">No Allocation To Show</p>
                        <p className="text-base leading-[18px] font-normal text-[#939393]">Your trusted server will show here</p>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default Allocation;

interface IAllocationProps { }