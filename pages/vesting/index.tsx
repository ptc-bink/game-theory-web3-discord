"use client"

import React, { useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "@/pages/components/forms/Dropdown";

import { winningRoleList } from "@/pages/utils/_data";

const VESTING: React.FC<IVESTING> = () => {

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
                        {/* <Dropdown
                            dropdownList={winningRoleList}
                            placeholder="user wallet address"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setWinningRole}
                        /> */}
                    </div>
                    <div className="flex w-fit">
                        <div className="flex w-full text-sm font-normal">
                            <div className="flex w-full rounded-lg border border-cgrey-200 px-4 py-[10px] bg-[#141518]">
                                {/* <input type="text" onChange={(e) => callback(e.target.value)} placeholder="" className="outline-none appearance-none bg-[#141518] w-full placeholder:text-[#939393] text-[#FFFFFF]" />
                                <div className="hover:cursor-pointer flex gap-2 w-fit justify-between items-center  text-[#FFFFFF]">
                                    <Image
                                        src={Refresh}
                                        width="16"
                                        height="16"
                                        alt="refresh"
                                    />
                                    <span className="sm:block hidden hover:underline">{endContent}</span>
                                </div> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="rounded-2xl border border-[#292A2E] bg-[#141518] px-2 py-3 text-[#FFFFFF] text-base font-normal h-[calc(100vh-280px)]">
                sdfasdfdasfdasf
            </div>
        </div>
    );
}

export default VESTING;

interface IVESTING { }