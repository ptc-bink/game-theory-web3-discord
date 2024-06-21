'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import Cancel from "@/public/avatar/close.svg"
import { getVestingReportData } from "@/hook";
import AppContext from "@/providers/AppContext";
import { IPermittedUser, IServer, IVestingReport } from "@/utils/_type";

const PermittedUsersModal: React.FC<IPermittedUsersModal> = ({ data }) => {

    const { setPermittedUserModalOpen } = useContext(AppContext);
    const [users, setUsers] = useState<string[]>([]);
    const [permittedUsers, setPermittedusers] = useState<IPermittedUser[]>([]);
    const [flags, setFlags] = useState<boolean[]>([]);

    const initAction = async () => {
        // if (serverValue === "") {
        //     return toast.error("No server selected")
        // }

        // const tempPermmittedusers: any = await getVestingReportData(serverValue);
        // if (tempPermmittedusers.status == 200) {
        //     return setPermittedusers(tempPermmittedusers.data);
        // }
    }

    const handleSetUser = (user: string, index: number) => {
        setFlags(prevFlags => {
            const newFlags = [...prevFlags];
            newFlags[index] = !newFlags[index];
            return newFlags;
        });
        if (users.includes(user)) {
            setUsers(users.filter(item => item !== user));
        } else {
            setUsers([...users, user]);
        }
    }

    const handleAddUser = () => {
        console.log("users ===>", users);

        setPermittedUserModalOpen(false);
    }

    useEffect(() => {
        initAction();
    }, [])

    return (
        <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
            <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
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
                </div>
            </div>
        </div >
    )
}

export default PermittedUsersModal;

interface IPermittedUsersModal {
    data: IVestingReport[]
}
