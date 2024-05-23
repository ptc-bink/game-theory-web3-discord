"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CardLogo from "@/public/avatar/cardLogo.svg"
import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"
import Edit from "@/public/avatar/edit.svg"
import Cancel from "@/public/avatar/close-circle.svg"

import { IGiveawayCardProps, IUserInfo } from "../utils/_type";
import { UserInfo } from "../hooks/hook";

const GiveawayCard: React.FC<IGiveawayCardProps> = ({ id, chain, avatar, username, entrants, quantity, enterDate, timeRemaining, status, bidders, winners }) => {

    const [biddersInfoList, setBiddersInfoList] = useState<any>();
    const [detailOpen, setDetailOpen] = useState<boolean>(false);

    const initAction = async () => {
        const biddersInfoList = bidders?.forEach((userID, index) => {
            return UserInfo(userID);
        })

        setBiddersInfoList(biddersInfoList);
    }

    useEffect(() => {
        initAction()
    }, [])

    const detailItem = (index: number, item: IUserInfo) => {

        const isWinner = winners.includes(item.id);
        const textColor = isWinner ? "#FFD105" : "#939393";

        return (
            <div className="flex gap-1 hover:bg-cgrey-200">
                <Image
                    src={Cancel}
                    width="16"
                    height="16"
                    alt={index + "th cancel"}
                />
                <p className={`text-xs leading-[18px] font-medium text-[${textColor}]`}>{`${index}. ${item.name}(${item.id})`}</p>
            </div>
        )
    }

    const handleDetailOpen = () => {
        setDetailOpen(!detailOpen);
    }

    return (
        <div className="flex flex-col p-6 gap-6 rounded-2xl border border-cgrey-200">
            <div className="flex items-center gap-4">
                <div className="bg-[#202125] border border-[#292A2E] rounded-lg p-3">
                    <img src={`https://cdn.discordapp.com/avatars/${id}/${avatar}.webp`} alt="creator avatar" width={24} height={24} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[#FFFFFF] text-base font-normal">{username}</p>
                    <p className="text-[#939393] text-xs leading-[18px] font-normal">{id}</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 grid-row-2">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Chain:</p>
                        <p className="text-[#FFFFFF] text-sm font-semibold">{chain}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Entrants:</p>
                        <p className="text-[#FFFFFF] text-sm font-semibold">{entrants}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Quantity:</p>
                        <p className="text-[#FFFFFF] text-sm font-semibold">{quantity}</p>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Enter date:</p>
                        <p className="text-[#FFFFFF] text-sm font-semibold">{enterDate}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Time remaining:</p>
                        <p className="text-[#FFFFFF] text-sm font-semibold">{timeRemaining}</p>
                    </div>
                    <Link href="/dashboard/harvest-winners" className="flex text-[#FFFFFF] text-sm font-normal gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-[#141518] outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full" >
                        Harvest Winners
                    </Link>
                    {/* <div className="flex flex-col gap-1">
                        <p className="text-[#939393] text-xs leading-[18px] font-normal">Status:</p>
                        {status === "active" && (
                            <div className="px-1 w-fit rounded-sm bg-[#3F904E] bg-opacity-[0.16] text-xs leading-[18px] font-medium text-[#3F904E]">Active</div>
                        )}
                        {status === "postpone" && (
                            <div className="px-1 w-fit rounded-sm bg-[#FFD105] bg-opacity-[0.16] text-xs leading-[18px] font-medium text-[#FFD105]">Postpone</div>
                        )}
                    </div> */}
                </div>
            </div>
            {detailOpen &&
                <div className="flex flex-col rounded-lg">
                    <div className="grid md:grid-rows-10 md:grid-flow-col max-h-[220px] overflow-scroll grid-flow-row gap-y-[1.5px] border border-cgrey-200 rounded-t-lg px-1 py-[10px] bg-[#141518]">
                        {biddersInfoList?.map((item: IUserInfo, index: number) => (
                            detailItem(index + 1, item)
                        ))}
                    </div>
                    <div className="flex justify-center items-center bg-cgrey-200 gap-1 px-4 py-2 rounded-b-lg">
                        <Image
                            src={Cancel}
                            width="16"
                            height="16"
                            alt="cancel"
                        />
                        <p className="text-xs leading-[18px] font-medium text-[#939393]">Not Finished Yet</p>
                    </div>
                </div >
            }
            < div className="flex justify-between gap-2" >
                {
                    detailOpen ? (
                        <button onClick={handleDetailOpen} className="flex gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-[#141518] outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full" >
                            <p className="text-[#FFFFFF] text-sm font-normal">Hide</p>
                            <Image
                                src={ArrowUp}
                                width="16"
                                height="16"
                                alt="arrow down"
                            />
                        </button>
                    ) : (
                        <button onClick={handleDetailOpen} className="flex gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-[#141518] outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full">
                            <p className="text-[#FFFFFF] text-sm font-normal">Details</p>
                            <Image
                                src={ArrowDown}
                                width="16"
                                height="16"
                                alt="arrow down"
                            />
                        </button>
                    )}
                <button className="flex gap-2 justify-center items-center hover:bg-cdark-200 bg-[#141518] outline-none border border-cgrey-200 rounded-lg py-[10px] px-6 w-fit">
                    <p className="text-[#FFFFFF] text-sm font-normal hidden md:block">Edit</p>
                    <Image
                        src={Edit}
                        width="16"
                        height="16"
                        alt="edit"
                    />
                </button>
            </div >
        </div >
    )
}

export default GiveawayCard;