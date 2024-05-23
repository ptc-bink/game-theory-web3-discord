"use client"

import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";

import Preview from "@/public/avatar/eye.svg"
import User from "@/public/avatar/user.svg"
import Avartar from "@/public/img/Avatar.png"

import { IPreviewCardProps } from "../utils/_type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const PreviewCard: React.FC<IPreviewCardProps> = ({ title, description, expiry, winningRole, chain, quantity, restricted, requirements, price }) => {

    const { data: session } = useSession();
    const router = useRouter();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
    const [userImage, setUserImage] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const date = new Date();

    useEffect(() => {
        if (session) {
            setUserImage(session?.user?.image || "");
            setUsername(session?.user?.name || "");
        } else {
            router.push('/')
        }
    }, [])

    const handlePreviewEnter = () => { }

    return (
        <div className="w-full flex flex-col h-fit rounded-md gap-4 p-4 bg-[#1D1E22] border border-[#292A2E]">
            <div className="flex gap-2">
                <Image
                    src={Preview}
                    width="24"
                    height="24"
                    alt="preview"
                />
                <p className="text-[#FFFFFF] text-base font-semibold">Preview</p>
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-sm bg-cgrey-200 border-l-[3px] border-[#15F115]">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1 text-[#FFFFFF]">
                        <p className="text-base font-semibold">{title ? title : "Title"}</p>
                        <p className="text-xs leading-[18px] font-normal">{description ? description : "Description"}</p>
                    </div>
                    <img src={userImage} alt="user avatar" width={48} height={48} className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Expiry</label>
                        <p className="bg-[#393F4B] w-fit rounded-sm px-1 text-xs font-medium text-[#ECDEDB]">{expiry}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Winning Role</label>
                        <p className="text-xs font-medium text-[#FFFFFF]">{winningRole ? winningRole : "-"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Chain</label>
                            <p className="text-[#FFFFFF] text-xs leading-[18px] font-medium">{chain ? chain : "Ethereum"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Quantity</label>
                            <p className="text-[#FFFFFF] text-xs leading-[18px] font-medium">{quantity ? quantity : "-"}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Requirements</label>
                        <p className="text-[#FFFFFF] text-xs leading-[18px] font-medium">{requirements ? requirements : "-"}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Entrants</label>
                        <p className="text-[#FFFFFF] text-xs leading-[18px] font-medium">-</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[#FFFFFF] text-xs leading-[18px] font-semibold">Price:</label>
                        <p className="text-[#FFFFFF] text-xs leading-[18px] font-medium">{price ? price : "Free"}</p>
                    </div>
                </div>
                <div className="border border-[#393A3D]"></div>
                <div className="flex gap-2 items-center justify-start">
                    <img src={userImage} alt="user avatar" width={24} height={24} className="rounded-full" />
                    <p className=" text-xs leading-[18px] font-normal text-[#FFFFFF]">Created By - {username}<span className="border mx-1 rounded-full border-[#[#FFFFFF]]" />Today at {date.toLocaleTimeString()}</p>
                </div>
            </div>
            <button className="rounded outline-none px-6 py-3 bg-[#248047] w-fit text-[#FFFFFF]" onClick={handlePreviewEnter}>Enter</button>
        </div>
    )
}

export default PreviewCard;