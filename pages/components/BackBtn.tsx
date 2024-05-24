"use client"

import React from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import { useRouter } from "next/router";

const BackBtn: React.FC<IBackBtn> = () => {

    const router = useRouter();

    return (
        <div onClick={() => router.back()} className="bg-cdark-200 border hover:cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
            <Image
                src={ArrowLeft}
                width="24"
                height="24"
                alt="arrow left"
            />
        </div>

    );
}

export default BackBtn;

interface IBackBtn {}