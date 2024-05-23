'use client'

import React, { useState } from "react";
import Image from "next/image";

import Refresh from "@/public/avatar/refresh.svg"

const SearchBtn: React.FC<SearchBtnProps> = ({ placeholder, endContent, endContentImg }) => {

    return (
        <div className="flex w-full text-sm font-normal">
            <div className="flex w-full rounded-lg border border-cgrey-200 px-4 py-[10px] bg-[#141518]">
                <input type="text" placeholder={placeholder} className="outline-none appearance-none bg-[#141518] w-full placeholder:text-[#939393] text-[#FFFFFF]" />
                <div className="flex gap-2 w-fit justify-between items-center  text-[#FFFFFF]">
                    <Image
                        src={Refresh}
                        width="16"
                        height="16"
                        alt="refresh"
                    />
                    <span className="sm:block hidden">{endContent}</span>
                </div>
            </div>
        </div>
    )
}

export default SearchBtn;

interface SearchBtnProps {
    placeholder: string
    endContent: string
    endContentImg: any
}