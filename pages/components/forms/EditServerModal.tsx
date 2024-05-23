'use client'

import React, { useState, useContext } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import { marketChannelIdList, generalChannelIdList } from "@/pages/utils/_data";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";

const EditServerModal: React.FC<EditServerModalProps> = ({ server, marketChannel, generalChannel }) => {

    const { setEditServerModalOpen } = useContext(AppContext);
    const [inputValue, setInputValue] = useState<string>(server);
    const [marketChannelId, setMarketChannelId] = useState<string>("");
    const [generalChannelId, setGeneralChannelId] = useState<string>("");

    const closeModal = () => {
        setEditServerModalOpen(false);
    }

    const handleInputValue = (e: any) => {
        setInputValue(e.target.value)
    }

    const handleSaveChange = () => {
        console.log("handleSave");
        closeModal();
    }

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-[#FFFFFF] font-semibold">Edit Server</p>
                <div onClick={closeModal} className="cursor-pointer">
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
                    <p className="text-sm font-normal text-[#FFFFFF]">Title</p>
                    <input type="text" placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" value={inputValue} onChange={(e) => handleInputValue(e)} />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Market Channel ID</p>
                    <Dropdown dropdownList={marketChannelIdList} placeholder={marketChannel} callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">General Channel ID</p>
                    <Dropdown dropdownList={generalChannelIdList} placeholder={generalChannel} callback={setGeneralChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                </div>
            </div>
            <div className="bg-[#FFFFFF] p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-[#FFFFFF] border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleSaveChange()}>Save Changes</div>
        </div>
    )
}

export default EditServerModal;

interface EditServerModalProps {
    server: string
    marketChannel: string
    generalChannel: string
}