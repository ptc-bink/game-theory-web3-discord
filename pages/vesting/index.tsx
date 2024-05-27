"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "@/pages/components/forms/Dropdown";

import { getVestingReports } from "../hooks/hook";
import AppContext from "../providers/AppContext";
import PermittedUsersModal from "../components/PermittedUsersModal";

const VESTING: React.FC<IVESTING> = () => {

    const [winningRole, setWinningRole] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [vestingReports, setVestingReports] = useState<any[]>([]);
    const { permittedUserModalOpen, setPermittedUserModalOpen } = useContext(AppContext);

    const initAction = async () => {
        const tempVestingReports: any[] = await getVestingReports();

        if (tempVestingReports && tempVestingReports.length > 0) {
            setVestingReports(tempVestingReports);
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
                    <p className="text-[#FFFFFF] text-2xl font-semibold">Vesting Reports</p>
                </div>
                <div className="flex gap-4">
                    {/* <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="select"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServer}
                    /> */}
                    <div className="flex w-full text-sm font-normal">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search servers"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        <button onClick={() => setPermittedUserModalOpen(true)} className="ml-2 text-cdark-100 flex justify-between w-fit items-center rounded-lg outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-[10px] py-3">
                            Permitted Users
                        </button>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-[#292A2E] bg-[#141518] px-2 py-3 text-[#FFFFFF] text-base font-normal h-[calc(100vh-280px)]">
                sdfasdfdasfdasf
            </div>
            {permittedUserModalOpen && <PermittedUsersModal />}
        </div>
    );
}

export default VESTING;

interface IVESTING { }