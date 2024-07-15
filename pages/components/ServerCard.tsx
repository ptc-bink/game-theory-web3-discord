"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

import Driver from "@/public/avatar/driver.svg"
import Edit from "@/public/avatar/edit.svg"
import Trash from "@/public/avatar/trash.svg"

import AppContext from "../../providers/AppContext";
import EditServerModal from "./forms/EditServerModal";
import RemoveEntrantsModal from "./forms/RemoveEntrantsModal";
import { IChannel, IServerCardProps } from "../../utils/_type";
import { removeEntry } from "../../hook";

const ServerCard: React.FC<IServerCardProps> = ({ index, id, rediskey, name, serverImg, adminImg, createdBy, paymentExpires, marketChannel, generalChannel, submitWallet, vestingChannel, reminderChannel, winnersChannel, channelList }) => {

    const { userID, editServerModalID, removeEntrantModalOpen, removeApproval, setRemoveApproval, setRemoveEntrantModalOpen, setEditServerModalID } = useContext(AppContext);
    const [marketChannelName, setMarketChannelName] = useState<string>();
    const [generalChannelName, setGeneralChannelName] = useState<string>();
    const [submitWalletName, setSubmitWalletName] = useState<string>();
    const [vestingChannelName, setVestingChannelName] = useState<string>();
    const [reminderChannelName, setReminderChannelName] = useState<string>();
    const [winnersChannelName, setWinnersChannelName] = useState<string>();

    const initAction = async () => {
    
        if (channelList) {
            if (channelList.length > 0) {
                const tempMarketChannelName: string = channelList[channelList.findIndex(item => (item.id == marketChannel))]?.name;
                const tempGeneralChannelName: string = channelList[channelList.findIndex(item => (item.id == generalChannel))]?.name;
                const tempSubmitWalletName: string = channelList[channelList.findIndex(item => (item.id == submitWallet))]?.name;
                const tempVestingChannelName: string = channelList[channelList.findIndex(item => (item.id == vestingChannel))]?.name;
                const tempReminderChannelName: string = channelList[channelList.findIndex(item => (item.id == reminderChannel))]?.name;
                const tempWinnersChannelName: string = channelList[channelList.findIndex(item => (item.id == winnersChannel))]?.name;

                setMarketChannelName(tempMarketChannelName);
                setGeneralChannelName(tempGeneralChannelName);
                setSubmitWalletName(tempSubmitWalletName);
                setVestingChannelName(tempVestingChannelName);
                setReminderChannelName(tempReminderChannelName);
                setWinnersChannelName(tempWinnersChannelName);
            }
        }else{
            console.log("channelList is empty")
        }
    }

    const removeApprovalAction = async () => {
        if (!marketChannel || !createdBy || id) {
            return toast.error("Please input all value")
        }

        const data = {
            marketID: marketChannel,
            serverID: id,
            removeUserID: createdBy
        }
        const res = await removeEntry(data);

        setRemoveApproval(false);
    }

    const handleModalOpen = () => {
        console.log("key ==========================================>", index);
        
        setEditServerModalID(index)
    }

    useEffect(() => {
        initAction()
    }, [])

    useEffect(() => {

        if (removeApproval) {
            console.log("removeApproval ===>");
            removeApprovalAction();
        }
    }, [removeApproval])

    if (!createdBy) {
        return null;
    }else{
        return (
      
            <div key={index} className="w-full flex flex-col rounded gap-4 hover:border hover:border-cwhite p-4 border border-cgrey-200">
                <div className="flex gap-4 rounded">
                    <div className="flex justify-center items-start border border-cgrey-200 bg-cdark-200 rounded-lg">
                        {
                            serverImg ?
                                <img src={serverImg} width={48} height={48} alt="server image" className="rounded-lg" />
                                : <Image
                                    src={Driver}
                                    width="48"
                                    height="48"
                                    alt="server mark"
                                />
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-base font-semibold text-cwhite">{name}</p>
                        <div className="flex gap-2">
                            {
                                adminImg ?
                                    <img src={adminImg} width={16} height={24} alt="created image" className="rounded-full" />
                                    : <Image
                                        src={Driver}
                                        width="24"
                                        height="24"
                                        alt="server mark"
                                    />
                            }
                            <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Created by {createdBy}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">Payment Expires</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{paymentExpires ? new Date(paymentExpires * 1000).toDateString() : "-"}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">Market Channel</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{marketChannelName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">General Channel</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{generalChannelName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">Submit Wallet</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{submitWalletName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">Vesting Channel</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{vestingChannelName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">reminderChannel</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{reminderChannelName}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs leading-[18px] font-normal text-cgrey-900">Winners Channel</p>
                        <p className="text-xs leading-[18px] font-semibold text-cwhite">{winnersChannelName}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                    <div className="flex w-full justify-center items-center px-4 py-[10px] rounded-lg border cursor-pointer hover:bg-cgrey-200 border-cgrey-200 gap-2" onClick={handleModalOpen}>
                        <p className="text-sm font-normal text-cwhite sm:block hidden">Edit Server</p>
                        <Image
                            src={Edit}
                            width="16"
                            height="16"
                            alt="edit"
                        />
                    </div>
                    <div className="flex w-full justify-center items-center px-4 py-[10px] rounded-lg border cursor-pointer hover:bg-cgrey-200 hover:border-cdark-100 border-cgrey-200 gap-2" onClick={() => setRemoveEntrantModalOpen(true)}>
                        <p className="text-sm font-normal text-cwhite sm:block hidden">Remove Server</p>
                        <Image
                            src={Trash}
                            width="16"
                            height="16"
                            alt="edit"
                        />
                    </div>
                </div>
                {
                    editServerModalID === index && (
                        <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                            <EditServerModal
                                key={index}
                                rediskey={rediskey}
                                server={id}
                                marketChannel={marketChannel}
                                generalChannel={generalChannel}
                                submitWallet={submitWallet}
                                vestingChannel={vestingChannel}
                                reminderChannel={reminderChannel}
                                winnersChannel={winnersChannel}
                                channelList={channelList}
                            />
                        </div>
                    )
                }
                {
                    removeEntrantModalOpen && (
                        <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                            <RemoveEntrantsModal
                            />
                        </div>
                    )
                }
            </div>
        )
    }

}

export default ServerCard;