"use client"

import React, { useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Search from "@/public/avatar/search-normal.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Table from "@/pages/components/forms/Table";

const JSONOBJECT: React.FC<IJSONOBJECT> = () => {

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
                <div className="flex gap-2">
                    <div className="flex flex-grow">
                        <SearchBtn
                            placeholder="Search..."
                            endContent="Search"
                            endContentImg={Search}
                        />
                    </div>
                    <div className="flex justify-between items-center rounded-lg outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-[10px] py-3 gap-2">
                        <Image
                            src={Add}
                            width="16"
                            height="16"
                            alt="add button"
                        />
                        <p className="text-cdark-100">Sumbit</p>
                    </div>
                </div>
            </div>
            <Table />
        </div>
    );
}

export default JSONOBJECT;

interface IJSONOBJECT { }