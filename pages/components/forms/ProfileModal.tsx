'use client'

import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import Dropdown from "./Dropdown";

import AppContext from "@/providers/AppContext";
import { IDropdownListProps, IServer } from "@/utils/_type";
import { getServers, getUserDetails } from "@/hook";

import Cancel from "@/public/avatar/close.svg"
import User from "@/public/avatar/user.svg"

const ProfileModal: React.FC<ProfileModalProps> = () => {

    const { setProfileModalOpen, setServerID, setUserID, username, userImage, userID } = useContext(AppContext);
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

        const tempServerList: any = await getServers();

        if (tempServerList.status === 200) {
            if (tempServerList.data.length > 0) {
                const initServerValue: string = tempServerList.data[0].guildID;
                const tempServerDropdownList: IDropdownListProps[] = tempServerList.data?.map((item: IServer, index: number) => {
                    return { name: item.guild.name, id: item.guild.id }
                })
                const tempUserProfile: any = await getUserDetails(userID, initServerValue);

                if (tempUserProfile.status == 200) {
                    setUserProfile(tempUserProfile.data);
                } else {
                    toast.error("No user info to show")
                }

                setServerDropdownList(tempServerDropdownList);
                setServerValue(initServerValue)
                setUserProfile(userProfile);
            } else {
                return toast.error("No server to show");
            }
        } else {
            return toast.error("Server error");
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
                <p className="text-base text-cwhite font-semibold">User Profile</p>
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
                        {userImage ?
                            <img src={userImage} width="155" height="155" alt="user avatar" className="rounded-lg" />
                            : <Image
                                src={User}
                                width={155}
                                height={155}
                                alt="user avatar"
                                className="rounded-full border-[1.5px] border-cgrey-200"
                            />
                        }
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">User Name</p>
                            <input type="text" disabled placeholder="-" value={username} onChange={(e) => setUserID(e.target.value)} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">User ID</p>
                            <input type="text" disabled placeholder="-" value={userID} onChange={(e) => setUserID(e.target.value)} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-cwhite">Server ID</p>
                    <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="Select Server"
                        className="hover:bg-cdark-200 bg-cdark-100"
                        callback={setServerValue}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">ETH HOT*</p>
                        <input type="text" placeholder="0" onChange={(e) => setEthHot(e.target.value)} value={ethHot} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">ETH COLD*</p>
                        <input type="number" placeholder="0" onChange={(e) => setEthCold(e.target.value)} value={ethCold} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div><div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">BTC*</p>
                        <input type="number" placeholder="0" onChange={(e) => setBtc(e.target.value)} value={btc} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">SOL*</p>
                        <input type="number" placeholder="0" onChange={(e) => setSol(e.target.value)} value={sol} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
            </div>
            <div className="bg-cwhite p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleEdit()}>Edit User Profile</div>
        </div>
    )
}

export default ProfileModal;

interface ProfileModalProps {

}