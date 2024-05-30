"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Driver from "@/public/avatar/driver.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Table from "@/pages/components/forms/Table";
import { getAllocation, getServers } from "@/hook";
import { IAllocation, IServer } from "@/utils/_type";
import AppContext from "@/providers/AppContext";
import BackBtn from "../components/BackBtn";

const Allocation: React.FC<IAllocationProps> = () => {

    const { allocationDeleted, allocationEdited, setAllocationDeleted, setAllocationEdited } = useContext(AppContext)
    const [searchInput, setSearchInput] = useState<string>("");
    const [allocations, setAllocations] = useState<IAllocation[]>([]);
    const [filterAllocations, setFilterAllocations] = useState<IAllocation[]>([]);

    const initAction = async () => {

        const tempServerList = await getServers();

        if (tempServerList) {
            if (tempServerList.length > 0) {
                const tempAllocations: IAllocation[] = await getAllocation(tempServerList[0]?.guildID);

                if (tempAllocations && tempAllocations.length > 0) {
                    setAllocations(tempAllocations);
                    setFilterAllocations(tempAllocations);
                }
            }
        }
    }

    const searchInputAction = async () => {
        if (searchInput !== undefined) {
            if (allocations.length > 0) {
                const tempAllocations: IAllocation[] = allocations.filter(allocation =>
                    allocation.title.toLowerCase().includes(searchInput?.toLowerCase()) ||
                    allocation.id.toLowerCase().includes(searchInput?.toLowerCase())
                )
                setFilterAllocations(tempAllocations);
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    useEffect(() => {
        searchInputAction();
    }, [searchInput])

    useEffect(() => {
        if (allocationDeleted || allocationEdited) {
            initAction()
            setAllocationDeleted(false);
            setAllocationEdited(false);
        }
    }, [allocationDeleted, allocationEdited])

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex flex-col gap-4">
                <div className="md:block hidden">
                    <div className="flex gap-6 items-center">
                        <BackBtn />
                        <p className="text-cwhite text-2xl font-semibold">Allocations</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-grow">
                        <SearchBtn
                            placeholder="Search ..."
                            endContent="Refresh"
                            callback={setSearchInput}
                        />
                    </div>
                    <Link href="/allocations/add" className="w-fit flex justify-between items-center rounded-lg outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-3 gap-2">
                        <Image
                            src={Add}
                            width="16"
                            height="16"
                            alt="add button"
                        />
                        <p className="text-cdark-100 text-sm md:leading-5 leading-4 font-medium md:block hidden">Submit</p>
                    </Link>
                </div>
            </div>
            {filterAllocations.length > 0 ?
                <Table allocations={filterAllocations}
                /> : <div className="flex justify-center items-center min-h-[calc(100vh-280px)]">
                    <div className="flex flex-col w-fit gap-4 px-3 py-4 justify-center items-center">
                        <Image
                            src={Driver}
                            width="32"
                            height="32"
                            alt="no server to show"
                        />
                        <div className="flex flex-col w-full text-center justify-center gap-2">
                            <p className="text-2xl text-center font-medium text-cwhite">No Allocations To Show</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Allocation;

interface IAllocationProps { }