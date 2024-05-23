"use client"

import React, { useContext, useState } from "react";
import Image from "next/image";

import Driver from "@/public/avatar/driver.svg"
import Avatar from "@/public/img/Avatar.png"
import Edit from "@/public/avatar/edit.svg"
import AppContext from "../providers/AppContext";

import EditServerModal from "./forms/EditServerModal";

const ServerCard: React.FC<ServerCardProps> = ({ server, createdBy, paymentExpires, marketChannel, generalChannel }) => {

    const { editServerModalOpen, setEditServerModalOpen } = useContext(AppContext);

    return (
        <div className="w-full flex flex-col gap-4 p-4 border border-cgrey-200">
            <div className="flex gap-4">
                <div className="flex justify-center items-center p-3 border border-[#292A2E] bg-[#202125] rounded-lg">
                    <Image
                        src={Driver}
                        width="24"
                        height="24"
                        alt="server mark"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-base font-semibold text-[#FFFFFF]">{server}</p>
                    <div className="flex gap-2">
                        <Image
                            src={Avatar}
                            width="16"
                            height="16"
                            alt="created avatar"
                        />
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Created by {createdBy}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                    <p className="text-xs leading-[18px] font-normal text-[#939393]">Payment Expires</p>
                    <p className="text-xs leading-[18px] font-semibold text-[#FFFFFF]">{paymentExpires}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-xs leading-[18px] font-normal text-[#939393]">Market Channel</p>
                    <p className="text-xs leading-[18px] font-semibold text-[#FFFFFF]">{marketChannel}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-xs leading-[18px] font-normal text-[#939393]">General Channel</p>
                    <p className="text-xs leading-[18px] font-semibold text-[#FFFFFF]">{generalChannel}</p>
                </div>
            </div>
            <div className="flex justify-center items-center px-4 py-[10px] rounded-lg border cursor-pointer hover:bg-cgrey-200 border-cgrey-200 gap-2" onClick={() => setEditServerModalOpen(true)}>
                <p className="text-sm font-normal text-[#FFFFFF]">Edit Server</p>
                <Image
                    src={Edit}
                    width="16"
                    height="16"
                    alt="edit"
                />
            </div>
            {editServerModalOpen && (
                <div className="flex fixed top-0 left-0 w-screen h-screen bg-[#141518]/30 backdrop-blur-sm justify-center items-center">
                    <EditServerModal
                        server={server}
                        marketChannel={marketChannel}
                        generalChannel={generalChannel}
                    />
                </div>
            )}
        </div>
    )
}

export default ServerCard;

interface ServerCardProps {
    server: string;
    createdBy: string;
    paymentExpires: string;
    marketChannel: string;
    generalChannel: string;
}