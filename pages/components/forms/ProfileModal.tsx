'use client'

import React, { useState, useContext } from "react";
import Image from "next/image";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";

const ProfileModal: React.FC<ProfileModalProps> = () => {

    const { setProfileModalOpen, serverID, userID, setServerID, setUserID } = useContext(AppContext);
    const [ethHot, setEthHot] = useState<string>("");
    const [ethCold, setEthCold] = useState<string>("");
    const [sol, setSol] = useState<string>("");
    const [btc, setBtc] = useState<string>("");

    const closeProfileModal = () => {
        setProfileModalOpen(false);
    }

    const handleEdit = async () => {
        console.log("ethHot ====>", ethHot);
        console.log("ethCold ====>", ethCold);
        console.log("btc ====>", btc);
        console.log("sol ====>", sol);

        closeProfileModal();
    }

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-[#FFFFFF] font-semibold">User Profile</p>
                <div onClick={closeProfileModal} className="cursor-pointer">
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
                    <p className="text-sm font-normal text-[#FFFFFF]">Server ID</p>
                    <input type="text" placeholder="Input Server ID" value={serverID} onChange={(e) => { setServerID(e.target.value) }} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">User ID</p>
                    <input type="text" placeholder="Input User ID" value={userID} onChange={(e) => setUserID(e.target.value)} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">ETH HOT*</p>
                        <input type="text" placeholder="Input User ID" onChange={(e) => setEthCold(e.target.value)} value={ethHot} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">ETH COLD*</p>
                        <input type="number" placeholder="0" onChange={(e) => setEthCold(e.target.value)} value={ethCold} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div><div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">BTC*</p>
                        <input type="number" placeholder="0" onChange={(e) => setBtc(e.target.value)} value={btc} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">SOL*</p>
                        <input type="number" placeholder="0" onChange={(e) => setSol(e.target.value)} value={sol} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div>
            </div>
            <div className="bg-[#FFFFFF] p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-[#FFFFFF] border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleEdit()}>Edit User Profile</div>
        </div>
    )
}

export default ProfileModal;

interface ProfileModalProps {

}