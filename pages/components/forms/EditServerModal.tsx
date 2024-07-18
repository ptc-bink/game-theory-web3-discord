'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/providers/AppContext";
import { IChannel, IDropdownListProps, IEditServerModalProps } from "@/utils/_type";
import { administrationChannellist, editServer } from "@/hook";
import toast from "react-hot-toast";
import moment from "moment";

const EditServerModal: React.FC<IEditServerModalProps> = ({ key, server, rediskey, marketChannel, generalChannel, submitWallet, vestingChannel, reminderChannel, winnersChannel, channelList, paymentExpires }) => {

    const { setEditServerModalID, setServerRemoved } = useContext(AppContext);
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
    const [paymentExpiresDate, setPaymentExpiresDate] = useState<string>();

    const [date, setDate] = useState<string>("");
    const [RedisKey, setRediskey] = useState<string>(rediskey);

    const initAction = async () => {

    
        console.log("server ====>", server);
        console.log("Payment Expires", paymentExpires);
        

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
                setMarketChannelId(tempMarketChannel.id);
                setMarketChannelName(tempMarketChannel.name);
            } else {
                console.error("Market channel not found");
            }

            const tempGeneralChannel = channelList.find((item:IChannel) => item.id === generalChannel);

            if (tempGeneralChannel) {
                setGeneralChannelId(tempGeneralChannel.id);
                setGeneralChannelName(tempGeneralChannel.name);
            } else {
                console.error("General channel not found");
            }

            const tempSubmitWallet = channelList.find((item:IChannel) => item.id === submitWallet);

            if (tempSubmitWallet) {
                setSubmitWalletId(tempSubmitWallet.id);
                setSubmitWalletName(tempSubmitWallet.name);
            } else {
                console.error("Submit channel not found");
            }

            const tempVestingChannel = channelList.find((item:IChannel) => item.id === vestingChannel);

            if (tempVestingChannel) {
                setVestingChannelId(tempVestingChannel.id);
                setVestingChannelName(tempVestingChannel.name);
            } else {
                console.error("Vesting channel not found");
            }

            const tempReminderChannel = channelList.find((item:IChannel) => item.id === reminderChannel);

            if (tempReminderChannel) {
                setReminderChannelId(tempReminderChannel.id);
                setReminderChannelName(tempReminderChannel.name);
            } else {
                console.error("Reminder channel not found");
            }

            const tempWinnersChannel = channelList.find((item:IChannel) => item.id === winnersChannel);

            if (tempWinnersChannel) {
                setWinnersChannelId(tempWinnersChannel.id);
                setWinnersChannelName(tempWinnersChannel.name);
            } else {
                console.error("Winners channel not found");
            }
        }
        if (paymentExpires) {
            setDate(paymentExpires.toString())
            setPaymentExpiresDate(moment(paymentExpires*1000).format("YYYY-MM-DD"));

            console.log(moment(paymentExpires*1000).format("YYYY-MM-DD"))
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    const closeModal = () => {
        setEditServerModalID(0);
    }

    const handleSaveChange = () => {
        if (!RedisKey){
            return toast.error("Missing Redis Key")
        }
        if (!marketChannelID){
            return toast.error("Missing Market Channel ID")
        }
        if (!generalChannelID){
            return toast.error("Missing General Channel ID")
        }
        if (!submitWalletID){
            return toast.error("Missing Submit Wallet ID")
        }


        const data = {
            serverID: server,
            rediskey: RedisKey,
            marketChannelID: marketChannelID,
            generalChannelID: generalChannelID,
            Submit_Wallet_ID: submitWalletID,
            Vesting_Channel_ID: vestingChannelID,
            Reminder_Channel_ID: reminderChannelID,
            Winners_Channel_ID: winnersChannelID,
            paymentExpires: date
        }

        const res = editServer(data);

        console.log("edit server response:", res);
        setServerRemoved(true); //reusing this to refresh the server list
        closeModal();
    }

    const handleDateChange = (e: any) => {
        const selectedDate = new Date(e.target.value);
        setPaymentExpiresDate(e.target.value)
        console.log("Selected Date", paymentExpiresDate);        
        if (isNaN(selectedDate.getTime())) {
            return toast.error("Invalid date format");
        }
        const unitTime = Math.floor(selectedDate.getTime() / 1000);
        setDate(unitTime.toString());

        console.log("unitTime", unitTime);
        console.log("BAse Date", selectedDate);
        console.log("Base Data" , e.target.value);
    }

    return (
        <div key={key} className="flex flex-col w-[450px] max-h-[calc(100vh-88px)] overflow-scroll rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
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
                    <input type="text" placeholder="Input redis key" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" value={rediskey} onChange={(e) => setRediskey(e.target.value)}/>
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
                    <input type="date" className="outline-none placeholder:text-sm placeholder:font-normal px-3 py-[10px] rounded-md bg-cdark-50 border border-cgrey-200 text-cwhite" value ={paymentExpiresDate?paymentExpiresDate:moment(paymentExpires*1000).format("DD-MM-YYYY")}  onChange={handleDateChange}/>
                </div>
            </div>
            <div className="bg-cwhite p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={() => handleSaveChange()}>Save Changes</div>
        </div>
    )
}

export default EditServerModal;