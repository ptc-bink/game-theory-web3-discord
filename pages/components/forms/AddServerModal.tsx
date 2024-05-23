'use client'

import React, { useState, useContext } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import { marketChannelIdList, generalChannelIdList } from "@/pages/utils/_data";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";

const AddServerModal: React.FC<AddServerModalProps> = () => {

    const { setAddServerModalOpen } = useContext(AppContext);
    const [marketChannelId, setMarketChannelId] = useState<string>("");
    const [generalChannelId, setGeneralChannelId] = useState<string>("");

    const closeAddServerModal = () => {
        setAddServerModalOpen(false);
    }

    const handleSave = () => {
        console.log("handleSave");
        closeAddServerModal();
    }

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-[#FFFFFF] font-semibold">Server Details</p>
                <div onClick={closeAddServerModal} className="cursor-pointer">
                    <Image
                        src={Cancel}
                        width="24"
                        height="24"
                        alt="cancel"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Redis Key</p>
                    <input type="text" placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Market Channel ID</p>
                    <Dropdown dropdownList={marketChannelIdList} placeholder="Select market ID" callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">General Channel ID</p>
                    <Dropdown dropdownList={generalChannelIdList} placeholder="Select general ID" callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Date</p>
                    <input type="date" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                </div>
            </div>
            <div className="bg-[#FFFFFF] p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-[#FFFFFF] border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleSave()}>Save</div>
        </div>
    )
}

export default AddServerModal;

interface AddServerModalProps {

}