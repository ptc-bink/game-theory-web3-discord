'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";
import { IChannel, IDropdownListProps, IEditServerModalProps } from "@/pages/utils/_type";
import { administrationChannellist } from "@/pages/hooks/hook";

const EditServerModal: React.FC<IEditServerModalProps> = ({ server, rediskey, marketChannel, generalChannel, submitWallet, vestingChannel, reminderChannel, winnersChannel }) => {

    const { setEditServerModalOpen } = useContext(AppContext);
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
        const tempChannelList: IChannel[] = await administrationChannellist(server);

        if (tempChannelList) {
            if (tempChannelList.length > 0) {
                const tempChainDropdownList: IDropdownListProps[] = tempChannelList.map((item) => (
                    {
                        name: item.name,
                        id: item.id,
                    }
                ))

                setChainDropdownList(tempChainDropdownList);

                const tempMarketChannelName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === marketChannel))].name
                const tempGeneralChannelName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === generalChannel))].name
                const tempSubmitWalletName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === submitWallet))].name
                const tempVestingChannelName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === vestingChannel))].name
                const tempReminderChannelName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === reminderChannel))].name
                const tempWinnersChannelName: string = tempChannelList[tempChannelList.findIndex(item => (item.id === winnersChannel))].name

                setMarketChannelName(tempMarketChannelName);
                setGeneralChannelName(tempGeneralChannelName);
                setSubmitWalletName(tempSubmitWalletName);
                setVestingChannelName(tempVestingChannelName);
                setReminderChannelName(tempReminderChannelName);
                setWinnersChannelName(tempWinnersChannelName);
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    const closeModal = () => {
        setEditServerModalOpen(false);
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
                    <p className="text-sm font-normal text-[#FFFFFF]">Redis Key</p>
                    <input type="text" disabled placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" value={rediskey} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Market Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={marketChannelName} placeholder="Select market ID" callback={setMarketChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">General Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={generalChannelName} placeholder="Select general ID" callback={setGeneralChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Submit Wallet ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={submitWalletName} placeholder="Select wallet ID" callback={setSubmitWalletId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Vesting Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={vestingChannelName} placeholder="Select vesting ID" callback={setVestingChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Reminder Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={reminderChannelName} placeholder="Select reminder ID" callback={setReminderChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Winners Channel ID</p>
                        <Dropdown dropdownList={chainDropdownList} initValue={winnersChannelName} placeholder="Select winners ID" callback={setWinnersChannelId} className="hover:bg-cdark-200 bg-cdark-100" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#FFFFFF]">Date</p>
                    <input type="date" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-[#141518] border border-[#292A2E] text-[#FFFFFF]" onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div className="bg-[#FFFFFF] p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-[#FFFFFF] border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleSaveChange()}>Save Changes</div>
        </div>
    )
}

export default EditServerModal;