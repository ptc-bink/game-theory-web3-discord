'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";
import { IDropdownListProps, IServer } from "@/pages/utils/_type";
import Dropdown from "./Dropdown";
import { getUserDetails } from "@/pages/hooks/hook";

const ProfileModal: React.FC<ProfileModalProps> = () => {

    const { setProfileModalOpen, username, userImage, userID, serverList, setServerID, setUserID } = useContext(AppContext);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [userProfile, setUserProfile] = useState<any>();
    const [serverValue, setServerValue] = useState<string>("");
    const [ethHot, setEthHot] = useState<string>("");
    const [ethCold, setEthCold] = useState<string>("");
    const [sol, setSol] = useState<string>("");
    const [btc, setBtc] = useState<string>("");

    const handleEdit = async () => {

        const data = { ethHot, ethCold, sol, btc }

        setProfileModalOpen(false);
    }

    const initAction = async () => {
        if (serverList.length > 0) {
            const initServerValue: string = serverList[0].guildID;

            const tempUserProfile = await getUserDetails(userID, initServerValue);
            const tempServerDropdownList: IDropdownListProps[] = serverList?.map((item, index) => {
                return { name: item.guild.name, id: item.guild.id }
            })

            setServerDropdownList(tempServerDropdownList);
            setServerValue(initServerValue)
            setUserProfile(userProfile);

            console.log("getUserProfile =====>", tempUserProfile);

        }
    }

    const serverValueAction = async () => {
        const tempUserProfile = await getUserDetails(userID, serverValue);
        setUserProfile(tempUserProfile);
    }

    useEffect(() => {
        serverValueAction();
    }, [serverValue])

    useEffect(() => {
        initAction()
    }, [])

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-[#FFFFFF] font-semibold">User Profile</p>
                <div onClick={() => setProfileModalOpen(false)} className="cursor-pointer">
                    <Image
                        src={Cancel}
                        width="24"
                        height="24"
                        alt="cancel"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <img src={userImage} width="155" height="155" alt="user avatar" className="rounded-lg" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">User Name</p>
                            <input type="text" disabled placeholder="Input User ID" value={username} onChange={(e) => setUserID(e.target.value)} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">User ID</p>
                            <input type="text" disabled placeholder="Input User ID" value={userID} onChange={(e) => setUserID(e.target.value)} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Server ID</p>
                    <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="Select Server"
                        className="hover:bg-cdark-200 bg-cdark-100"
                        callback={setServerValue}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">ETH HOT*</p>
                        <input type="text" placeholder="0" onChange={(e) => setEthCold(e.target.value)} value={ethHot} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" />
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