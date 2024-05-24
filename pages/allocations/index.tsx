"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Table from "@/pages/components/forms/Table";
import { getAllocation } from "../hooks/hook";
import { getServerList } from "../hooks/action";
import { IAllocation, IServer } from "../utils/_type";

const Allocation: React.FC<IAllocationProps> = () => {

    const [searchInput, setSearchInput] = useState<string>();
    const [allocations, setAllocations] = useState<IAllocation[]>([]);

    const initAction = async () => {
        const tempServerList: IServer[] = await getServerList();
        const tempAllocations: IAllocation[] = await getAllocation(tempServerList[0].guildID);

        setAllocations(tempAllocations)
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
                        <p className="text-cdark-100">Add</p>
                    </Link>
                </div>
            </div>
            <Table allocations={allocations} />
        </div>
    );
}

export default Allocation;

interface IAllocationProps { }