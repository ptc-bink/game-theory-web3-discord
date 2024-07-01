'use client'

import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import Image from "next/image";

import Dropdown from "./Dropdown";

import AppContext from "@/providers/AppContext";
import { IDropdownListProps, IUserProfile, IUserServer } from "@/utils/_type";
import { editUserProfile, getUserDetails, getUserServers } from "@/hook";

import Cancel from "@/public/avatar/close.svg"
import User from "@/public/avatar/user.svg"

const ProfileModal: React.FC<ProfileModalProps> = () => {

    const { setProfileModalOpen, username, userImage, userID } = useContext(AppContext);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [userProfile, setUserProfile] = useState<IUserProfile>();
    const [serverValue, setServerValue] = useState<string>("");
    const [ethHot, setEthHot] = useState<string>();
    const [ethCold, setEthCold] = useState<string>();
    const [btcHot, setBtcHot] = useState<string>();
    const [btcCold, setBtcCold] = useState<string>();
    const [solHot, setSolHot] = useState<string>();
    const [solCold, setSolCold] = useState<string>();

    const handleEdit = async () => {

        const data = {
            ETH_HOT: ethHot,
            ETH_COLD: ethCold,
            BTC_HOT: btcHot,
            BTC_COLD: btcCold,
            SOL_HOT: solHot,
            SOL_COLD: solCold
        }

        console.log("data ====>", data);


        const res: any = editUserProfile(serverValue, data);

        if (res.status === 200) {
            toast.success("Successfully edited");
        } else {
            toast.error("Try again later")
        }
        setProfileModalOpen(false);
    }

    const mainAction = async (serverID: string) => {
        const tempUserProfile: any = await getUserDetails(serverID);

        console.log("tempUserProfile ====>", tempUserProfile);

        if (tempUserProfile.status === 200) {
            setUserProfile(tempUserProfile.data);
            setEthCold(tempUserProfile.data.ETH_COLD ? tempUserProfile.data.ETH_COLD : undefined)
            setEthHot(tempUserProfile.data.ETH_HOT ? tempUserProfile.data.ETH_HOT : undefined)
            setSolCold(tempUserProfile.data.SOL_COLD ? tempUserProfile.data.SOL_COLD : undefined)
            setSolHot(tempUserProfile.data.SOL_HOT ? tempUserProfile.data.SOL_HOT : undefined)
            setBtcCold(tempUserProfile.data.BTC_COLD ? tempUserProfile.data.BTC_COLD : undefined)
            setBtcHot(tempUserProfile.data.BTC_HOT ? tempUserProfile.data.BTC_HOT : undefined)
        } else if (tempUserProfile.status === 401) {
            toast.error("User is not registered in the server")
        } else {
            toast.error("No user info to show")
        }
    }

    const initAction = async () => {
        const tempServerList: any = await getUserServers();

        if (tempServerList.status === 200) {
            if (tempServerList.data.length > 0) {

                const tempInitServerValue: string = tempServerList.data[0].id;
                const tempServerDropdownList: IDropdownListProps[] = tempServerList.data?.map((item: IUserServer, index: number) => {
                    return { name: item.name, id: item.id }
                })

                console.log("tempInitServerValue ===>", tempInitServerValue);
                console.log("tempServerList ===>", tempServerList);

                setServerValue(tempInitServerValue)
                setServerDropdownList(tempServerDropdownList);
                mainAction(tempInitServerValue);
            } else {
                return toast.error("No server to show");
            }
        } else {
            return toast.error("Server error");
        }
    }

    const filterAction = async () => {
        mainAction(serverValue);
    }

    useEffect(() => {
        if (serverValue) {
            filterAction();
        }
    }, [serverValue])

    useEffect(() => {
        initAction()
    }, [])

    return (
        <div className="flex flex-col w-[450px] h-[calc(100vh-88px)] overflow-scroll rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
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
                            <input type="text" disabled placeholder="-" value={username} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">User ID</p>
                            <input type="text" disabled placeholder="-" value={userID} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
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
                        initValue={serverDropdownList[0]?.name}
                    />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">ETH HOT*</p>
                        <input type="string" placeholder="" onChange={(e) => setEthHot(e.target.value)} value={ethHot} className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">ETH COLD*</p>
                        <input type="string" placeholder="" onChange={(e) => setEthCold(e.target.value)} value={ethCold} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">BTC HOT*</p>
                        <input type="string" placeholder="" onChange={(e) => setBtcHot(e.target.value)} value={btcHot} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">BTC COLD*</p>
                        <input type="string" placeholder="" onChange={(e) => setBtcCold(e.target.value)} value={btcCold} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">SOL HOT*</p>
                        <input type="string" placeholder="" onChange={(e) => setSolHot(e.target.value)} value={solHot} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">SOL COLD*</p>
                        <input type="string" placeholder="" onChange={(e) => setSolCold(e.target.value)} value={solCold} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
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