'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/providers/AppContext";
import { addServer, administrationChannellist, getChainList } from "@/hook";
import { IChannel, IDropdownListProps } from "@/utils/_type";
import toast from "react-hot-toast";

const AddServerModal: React.FC<AddServerModalProps> = () => {

    const { setAddServerModalOpen, serverID } = useContext(AppContext);
    const [channelDropdownList, setChannelDropdownList] = useState<IDropdownListProps[]>([])
    const [marketChannelID, setMarketChannelId] = useState<string>("");
    const [generalChannelID, setGeneralChannelId] = useState<string>("");
    const [submitWalletID, setSubmitWalletId] = useState<string>("");
    const [vestingChannelID, setVestingChannelId] = useState<string>("");
    const [reminderChannelID, setReminderChannelId] = useState<string>("");
    const [winnersChannelID, setWinnersChannelId] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [redisKey, setRediskey] = useState<string>("");

    useEffect(() => {
        const initAction = async () => {
            const tempChannelList: any = await administrationChannellist(serverID);

            if (tempChannelList.status === 200) {
                if (Array.isArray(tempChannelList.data)) {
                    if (tempChannelList.data.length > 0) {
                        const tempChannelDropdownList: IDropdownListProps[] = tempChannelList.data?.map((item: IChannel) => (
                            {
                                name: item.name,
                                id: item.id,
                            }
                        ))

                        setChannelDropdownList(tempChannelDropdownList);
                    }
                }
            }

        }
        initAction()
    }, [])

    const handleSave = async () => {
        if (!redisKey || !serverID) {
            return toast.error("Please insert all values")
        }

        const data = {
            rediskey: redisKey,
            serverID: serverID,
            // name: name,
            marketChannelID: marketChannelID,
            generalChannelID: generalChannelID,
            Submit_Wallet_ID: submitWalletID,
            Vesting_Channel_ID: vestingChannelID,
            Reminder_Channel_ID: reminderChannelID,
            Winners_Channel_ID: winnersChannelID,
            date: date
        }

        const res = await addServer(data);

        console.log("add server response:", res);
        setAddServerModalOpen(false);
    }

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 max-h-[calc(100vh-50px)] overflow-scroll gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4 items-center">
                <p className="text-base text-cwhite font-semibold">Add Server</p>
                <div onClick={() => setAddServerModalOpen(false)} className="cursor-pointer hover:bg-cdark-100 p-1 rounded-full">
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
                    <p className="text-sm font-normal text-cwhite">Redis Key</p>
                    <input type="text" placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" value={redisKey} onChange={(e) => setRediskey(e.target.value)} />
                </div>
                <div className="grid md:md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Market Channel ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select market ID" callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">General Channel ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select general ID" callback={setGeneralChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Submit Wallet ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select wallet ID" callback={setSubmitWalletId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Vesting Channel ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select vesting ID" callback={setVestingChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Reminder Channel ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select reminder ID" callback={setReminderChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Winners Channel ID</p>
                        <Dropdown dropdownList={channelDropdownList} placeholder="Select winners ID" callback={setWinnersChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-cwhite">Date</p>
                    <input type="date" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" onChange={(e) => setDate(e.target.valueAsDate ? (e.target.valueAsDate.getTime() / 1000).toString() : "")} />
                </div>
            </div>
            <div className="bg-cwhite p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-cdark-100 text-sm leading-4 text-center font-medium" onClick={() => handleSave()}>Save</div>
        </div>
    )
}

export default AddServerModal;

interface AddServerModalProps {

}