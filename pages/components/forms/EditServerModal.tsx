'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/providers/AppContext";
import { IChannel, IDropdownListProps, IEditServerModalProps } from "@/utils/_type";
import { administrationChannellist } from "@/hook";

const EditServerModal: React.FC<IEditServerModalProps> = ({ key, server, rediskey, marketChannel, generalChannel, submitWallet, vestingChannel, reminderChannel, winnersChannel, channelList }) => {

    const { setEditServerModalID } = useContext(AppContext);
    const [chainDropdownList, setChainDropdownList] = useState<IDropdownListProps[]>([])
    const [marketChannelID, setMarketChannelId] = useState<string>();
    const [generalChannelID, setGeneralChannelId] = useState<string>();
    const [submitWalletID, setSubmitWalletId] = useState<string>();
    const [vestingChannelID, setVestingChannelId] = useState<string>();
    const [reminderChannelID, setReminderChannelId] = useState<string>();
    const [winnersChannelID, setWinnersChannelId] = useState<string>();
    const [marketChannelName, setMarketChannelName] = useState<string>();
    const [generalChannelName, setGeneralChannelName] = useState<string>();
    const [submitWalletName, setSubmitWalletName] = useState<string>();
    const [vestingChannelName, setVestingChannelName] = useState<string>();
    const [reminderChannelName, setReminderChannelName] = useState<string>();
    const [winnersChannelName, setWinnersChannelName] = useState<string>();
    const [date, setDate] = useState<string>("");

    const initAction = async () => {

        console.log("server ====>", server);

        if (channelList.length > 0) {
            const tempChainDropdownList: IDropdownListProps[] = channelList.map((item: IChannel) => (
                {
                    name: item.name,
                    id: item.id,
                }
            ))

            setChainDropdownList(tempChainDropdownList);

            const tempMarketChannel = channelList.find((item:IChannel) => item.id === marketChannel);

            if (tempMarketChannel) {
                setMarketChannelName(tempMarketChannel.name);
            } else {
                console.error("Market channel not found");
            }

            const tempGeneralChannel = channelList.find((item:IChannel) => item.id === generalChannel);

            if (tempGeneralChannel) {
                setGeneralChannelName(tempGeneralChannel.name);
            } else {
                console.error("General channel not found");
            }

            const tempSubmitWallet = channelList.find((item:IChannel) => item.id === submitWallet);

            if (tempSubmitWallet) {
                setSubmitWalletName(tempSubmitWallet.name);
            } else {
                console.error("Submit channel not found");
            }

            const tempVestingChannel = channelList.find((item:IChannel) => item.id === vestingChannel);

            if (tempVestingChannel) {
                setVestingChannelName(tempVestingChannel.name);
            } else {
                console.error("Vesting channel not found");
            }

            const tempReminderChannel = channelList.find((item:IChannel) => item.id === reminderChannel);

            if (tempReminderChannel) {
                setReminderChannelName(tempReminderChannel.name);
            } else {
                console.error("Reminder channel not found");
            }

            const tempWinnersChannel = channelList.find((item:IChannel) => item.id === winnersChannel);

            if (tempWinnersChannel) {
                setWinnersChannelName(tempWinnersChannel.name);
            } else {
                console.error("Winners channel not found");
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    const closeModal = () => {
        setEditServerModalID(0);
    }

    const handleSaveChange = () => {
        console.log("handleSave");
        closeModal();
    }

    return (
        <div key={key} className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-cwhite font-semibold">Edit Server</p>
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
                    <p className="text-sm font-normal text-cwhite">Redis Key</p>
                    <input type="text" disabled placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" value={rediskey} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Market Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={marketChannelName} placeholder="Select market ID" callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">General Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={generalChannelName} placeholder="Select general ID" callback={setGeneralChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Submit Wallet ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={submitWalletName} placeholder="Select wallet ID" callback={setSubmitWalletId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Vesting Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={vestingChannelName} placeholder="Select vesting ID" callback={setVestingChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Reminder Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={reminderChannelName} placeholder="Select reminder ID" callback={setReminderChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Winners Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={winnersChannelName} placeholder="Select winners ID" callback={setWinnersChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-cwhite">Date</p>
                    <input type="date" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div className="bg-cwhite p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleSaveChange()}>Save Changes</div>
        </div>
    )
}

export default EditServerModal;