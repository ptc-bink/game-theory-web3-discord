"use client"

import React, { useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "@/pages/components/forms/Dropdown";

import { winningRoleList } from "@/pages/utils/_data";

const VESTINGREPORTS: React.FC<IVESTINGREPORTS> = () => {

    const [winningRole, setWinningRole] = useState<string>("");

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
                    <p className="text-[#FFFFFF] text-2xl font-semibold">JSON OBJECT</p>
                </div>
                <div className="flex gap-4">
                    <div className="flex flex-grow">
                        <Dropdown
                            dropdownList={winningRoleList}
                            placeholder="user wallet address"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setWinningRole}
                        />
                    </div>
                    <div className="flex w-fit">
                        <SearchBtn
                            placeholder="Search..."
                            endContent="Search"
                            endContentImg={Search}
                        />
                    </div>

                </div>
            </div>
            <div className="rounded-2xl border border-[#292A2E] bg-[#141518] px-2 py-3 text-[#FFFFFF] text-base font-normal h-[calc(100vh-280px)]">
                sdfasdfdasfdasf
            </div>
        </div>
    );
}

export default VESTINGREPORTS;

interface IVESTINGREPORTS { }