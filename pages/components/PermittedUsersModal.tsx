'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaLeftLong } from "react-icons/fa6";
import { FaRightLong } from "react-icons/fa6";
import { FaUpLong } from "react-icons/fa6";
import { FaDownLong } from "react-icons/fa6";

import Cancel from "@/public/avatar/close.svg"
import { getServers, getAllocationpermittedusers } from "@/hook";
import AppContext from "@/providers/AppContext";
import { IPermittedUser, IServer, IUserInfo, IVestingReport } from "@/utils/_type";

const PermittedUsersModal: React.FC<IPermittedUsersModal> = ({ serverValue, reportValue }) => {

    const { setPermittedUserModalOpen } = useContext(AppContext);
    const [permittedUsers, setPermittedusers] = useState<IUserInfo[]>([]);
    const [serverMembers, setServerMembers] = useState<IUserInfo[]>([]);
    const [popingData, setPopingData] = useState<IUserInfo[]>([]);
    const [pushingData, setPushingData] = useState<IUserInfo[]>([]);
    const [serverMemberFlags, setServerMemberFlags] = useState<boolean[]>([false]);
    const [permittedUserFlags, setPermittedUserFlags] = useState<boolean[]>([false]);

    const handlePushButton = () => {
        setPermittedusers([...pushingData, ...permittedUsers]);
        setServerMembers(serverMembers.filter(member => !pushingData.includes(member)))
        setServerMemberFlags([false]);
        setPushingData([])
    }

    const handlePopButton = () => {
        setPermittedusers(permittedUsers.filter(user => !popingData.includes(user)));
        setServerMembers([...popingData, ...serverMembers]);
        setPermittedUserFlags([false]);
        setPopingData([]);
    }

    const initAction = async () => {
        if (!serverValue || !reportValue) {
            setPermittedUserModalOpen(false);
            return toast.error("No server selected")
        }

        const tempServer = await getServers();

        console.log('tempServer.data :>> ', tempServer.data);

        if (tempServer.status == 200) {
            const temp: IServer = tempServer.data.find((item: IServer) => item.guildID == serverValue);
            setServerMembers(temp.guild.members);
        }

        const res = await getAllocationpermittedusers(serverValue, reportValue);

        console.log('tempPermittedusers :>> ', res);
        if (res.status == 200) {
            const temppermittedUsers: IUserInfo[] = res.data.map((userId: string) => {
                return {
                    id: userId,
                    username: (serverMembers.find((item: IUserInfo) => item.id === userId))?.username,
                    avatar: (serverMembers.find((item: IUserInfo) => item.id === userId))?.avatar
                }
            })

            setPermittedusers(temppermittedUsers)
        }
    }

    const handleSetPushingUser = (user: IUserInfo, index: number) => {
        setServerMemberFlags(prevFlags => {
            const newFlags = [...prevFlags];
            newFlags[index] = !newFlags[index];

            return newFlags;
        });

        if (pushingData.includes(user)) {
            setPushingData(pushingData.filter(item => item !== user));
        } else {
            setPushingData([...pushingData, user]);
        }
    }

    const handleSetPopingUser = (user: IUserInfo, index: number) => {
        setPermittedUserFlags(prevFlags => {
            const newFlags = [...prevFlags];
            newFlags[index] = !newFlags[index];
            return newFlags;
        });
        if (popingData.includes(user)) {
            setPopingData(popingData.filter(item => item !== user));
        } else {
            setPopingData([...popingData, user]);
        }
    }

    const handleAddUser = () => {
        console.log("users ===>", permittedUsers);

        setPermittedUserModalOpen(false);
        setPermittedusers([]);
        setServerMembers([]);
        setPopingData([]);
        setPushingData([]);
        setServerMemberFlags([]);
        setPermittedUserFlags([]);
    }

    useEffect(() => {
        initAction();
    }, [])

    return (
        <div className="flex flex-col fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
            <div className="flex flex-col rounded-md p-6 gap-6 border md:h-[450px] h-5/6 lg:w-3/5 md:w-4/5 w-5/6 border-cgrey-200 overflow-scroll bg-cgrey-100">
                <div className="flex justify-between gap-4">
                    <p className="text-base text-cwhite font-semibold">Permitted Users</p>
                    <Image
                        src={Cancel}
                        width="24"
                        height="24"
                        alt="cancel"
                        className="cursor-pointer"
                        onClick={() => setPermittedUserModalOpen(false)}
                    />
                </div>
                <div className="grid md:grid-cols-9 grid-cols-none gap-3 w-full">
                    <div className="col-span-4 gap-2 flex flex-col">
                        <input type="string" placeholder="Search members" className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                        <div className="flex flex-col px-5 py-3 gap-[6px] rounded-lg bg-cdark-50 border overflow-y-auto  border-cgrey-200 overflow-scroll h-[235px]">
                            {serverMembers.map((item, index) => (
                                <div key={index} className={`flex items-center text-sm gap-2 cursor-pointer leading-[18px] font-medium hover:text-cwhite hover:bg-cgrey-100 text-cgrey-900 ${serverMemberFlags[index] ? "bg-cgrey-100" : ""}`} onClick={() => handleSetPushingUser(item, index)}>
                                    <img src={item.avatar} width={24} height={24} alt="user modal" />
                                    <p>{item.username}</p>
                                    <p>{item.id}</p>
                                </div>
                            ))}
                        </div>
                        {/* <input type="string" placeholder="Manual ID input" className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" /> */}
                    </div>
                    <div className="md:col-span-1 col-span-4 flex md:flex-col flex-row gap-8 justify-center text-center items-center">
                        <button onClick={handlePushButton} className="md:block hidden"><FaRightLong className="h-8 w-8 text-cwhite hover:text-cblue-500" /></button>
                        <button onClick={handlePopButton} className="block md:hidden"><FaUpLong className="h-8 w-8 text-cwhite hover:text-cblue-500" /></button>
                        <button onClick={handlePopButton} className="md:block hidden"><FaLeftLong className="h-8 w-8 text-cwhite hover:text-cblue-500" /></button>
                        <button onClick={handlePushButton} className="block md:hidden"><FaDownLong className="h-8 w-8 text-cwhite hover:text-cblue-500" /></button>
                    </div>
                    <div className="col-span-4 flex flex-col gap-2">
                        <div className="col-span-4 flex flex-col px-5 py-3 gap-[6px] rounded-lg bg-cdark-50 border overflow-scroll border-cgrey-200 h-[285px]">
                            {permittedUsers.map((item, index) => (
                                <div key={index} className={`flex text-sm items-center cursor-pointer leading-[18px] font-medium hover:text-cwhite hover:bg-cgrey-100 text-cgrey-900 ${permittedUserFlags[index] ? "bg-cgrey-100" : ""}`} onClick={() => handleSetPopingUser(item, index)}>
                                    <img src={item.avatar} width={24} height={24} alt="user modal" />
                                    <p>{item.username ? item.username : `unknown `}</p>
                                    <p>{` (${item.id})`}</p>
                                </div>
                            ))}
                        </div>
                        <button aria-label="add user" className="flex justify-center items-center rounded-md outline-none bg-cwhite border border-[#EEEEEE] text-cdark-100 text-sm leading-4 font-medium p-3" onClick={handleAddUser}>
                            Add user
                        </button>
                    </div>
                </div>
                {/* <div className="flex justify-between gap-4">
                    <p className="text-base text-cwhite font-semibold">Permitted Users</p>
                    <Image
                        src={Cancel}
                        width="24"
                        height="24"
                        alt="cancel"
                        className="cursor-pointer"
                        onClick={() => setPermittedUserModalOpen(false)}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <div className="px-1 py-[10px] grid gap-[6px] min-h-[76px] rounded-lg border bg-cdark-50 border-cgrey-200">
                        <p className="text-xs font-medium leading-5 text-cgrey-900 overflow-hidden">{
                            users.map((item, index) => (item + ", "))
                        }</p>
                    </div>
                    <button aria-label="add user" className="flex justify-center items-center rounded-md outline-none bg-cwhite border border-[#EEEEEE] text-cdark-100 text-sm leading-4 font-medium p-3" onClick={handleAddUser}>
                        Add user
                    </button>
                </div>
                <div className="flex flex-col px-1 py-[10px] gap-[6px] rounded-lg bg-cdark-50 border overflow-y-auto  border-cgrey-200 max-h-[235px]">
                    {permittedUsers.map((item, index) => (
                        <div key={index} className={`text-sm cursor-pointer leading-[18px] font-medium hover:text-cwhite hover:bg-cgrey-100 text-cgrey-900 ${flags[index] ? "bg-cgrey-100" : ""}`} onClick={() => handleSetUser(item.id, index)}>{item.id}</div>
                    ))}
                </div> */}
            </div>
        </div >
    )
}

export default PermittedUsersModal;

interface IPermittedUsersModal {
    serverValue: string,
    reportValue: number
}
