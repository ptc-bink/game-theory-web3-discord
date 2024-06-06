"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CardLogo from "@/public/avatar/cardLogo.svg"
import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"
import Edit from "@/public/avatar/edit.svg"
import Cancel from "@/public/avatar/close-circle.svg"

import { IGiveawayCardProps, IUserInfo } from "@/utils/_type";
import AppContext from "@/providers/AppContext";
import { useRouter } from "next/router";

const GiveawayCard: React.FC<IGiveawayCardProps> = ({ giveawayID, chain, avatar, title, entrants, quantity, enterDate, timeRemaining, harvested, bidders, winners }) => {

    const { setSelectedGiveawayID, isAdmin } = useContext(AppContext);
    const [detailOpen, setDetailOpen] = useState<boolean>(false);
    const router = useRouter();

    const detailItem = (index: number, item: IUserInfo) => {

        const isWinner = winners?.includes(item.id);

        return (
            <div key={index} className="flex gap-1 hover:bg-cgrey-200 w-fit cursor-pointer">
                <Image
                    src={Cancel}
                    width="16"
                    height="16"
                    alt={index + "th cancel"}
                />
                <p className={`text-sm leading-[18px] font-medium`} style={{ color: `${isWinner ? "#FFD105" : "#939393"}` }}>{`${index}. ${item.username}(${item.id})`}</p>
            </div>
        )
    }

    const handleDetailOpen = () => {
        setDetailOpen(!detailOpen);
    }

    const handleEdit = async () => {
        setSelectedGiveawayID(giveawayID);

        router.push('/dashboard/edit-giveaway')
    }

    return (
        <div className="flex flex-col p-6 gap-6 rounded-2xl border border-cgrey-200">
            <div className="flex items-center gap-4">
                <div className="bg-cdark-200 border border-cgrey-200 rounded-lg p-3">
                    <img src={`https://cdn.discordapp.com/avatars/137375133336731648/${avatar}.webp`} alt="creator avatar" width={24} height={24} />
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-cwhite text-base font-normal">{title}</p>
                    <p className="text-cgrey-900 text-xs leading-[18px] font-normal">{giveawayID}</p>
                </div>
            </div>
            <div className="grid md:grid-cols-2 grid-row-2 gap-3">
                <div className="grid grid-cols-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Chain:</p>
                        <p className="text-cwhite text-sm font-semibold">{chain}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Entrants:</p>
                        <p className="text-cwhite text-sm font-semibold">{entrants}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Quantity:</p>
                        <p className="text-cwhite text-sm font-semibold">{quantity}</p>
                    </div>
                </div>
                {harvested ?
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Enter date:</p>
                            <p className="text-cwhite text-sm font-semibold">{enterDate}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Time remaining:</p>
                            <p className="text-cwhite text-sm font-semibold">Ended</p>
                        </div>
                        <Link href="/dashboard/harvest-winners" onClick={() => setSelectedGiveawayID(giveawayID)} className="flex text-cwhite text-sm font-normal gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-cdark-50 outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full" >
                            Harvest Winners
                        </Link>
                    </div> :
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col gap-1">
                            <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Enter date:</p>
                            <p className="text-cwhite text-sm font-semibold">{enterDate}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-cgrey-900 text-xs leading-[18px] font-normal">Time remaining</p>
                            <p className="text-cwhite text-sm font-semibold">{Math.floor(timeRemaining / 3600 / 60 / 24)} days</p>
                            {/* <p className="text-cwhite text-sm font-semibold">{timeRemaining}</p> */}
                        </div>
                    </div>}
            </div>
            {detailOpen &&
                <div className="flex flex-col rounded-lg">
                    <div className="grid md:grid-rows-10 md:grid-flow-col max-h-[220px] overflow-scroll grid-flow-row gap-y-[1.5px] border border-cgrey-200 rounded-t-lg px-1 py-[10px] bg-cdark-50">
                        {bidders?.map((item: IUserInfo, index: number) => (
                            detailItem(index + 1, item)
                        ))}
                    </div>
                    {harvested || <div className="flex justify-center items-center bg-cgrey-200 gap-1 px-4 py-2 rounded-b-lg">
                        <Image
                            src={Cancel}
                            width="16"
                            height="16"
                            alt="cancel"
                        />
                        <p className="text-xs leading-[18px] font-medium text-cgrey-900">Not Finished Yet</p>
                    </div>}
                </div >
            }
            < div className="flex justify-between gap-2" >
                {
                    detailOpen ? (
                        <button aria-label="hide" onClick={handleDetailOpen} className="flex gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-cdark-50 outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full" >
                            <p className="text-cwhite text-sm font-normal">Hide</p>
                            <Image
                                src={ArrowUp}
                                width="16"
                                height="16"
                                alt="arrow up"
                            />
                        </button>
                    ) : (
                        <button aria-label="details" onClick={handleDetailOpen} className="flex gap-2 hover:bg-cdark-200 transition-all justify-center items-center bg-cdark-50 outline-none border border-cgrey-200 rounded-lg px-[10px] py-4 w-full">
                            <p className="text-cwhite text-sm font-normal">Details</p>
                            <Image
                                src={ArrowDown}
                                width="16"
                                height="16"
                                alt="arrow down"
                            />
                        </button>
                    )}
                {isAdmin && <button aria-label="edit" onClick={() => handleEdit()} className="flex gap-2 justify-center items-center hover:bg-cdark-200 bg-cdark-50 outline-none border border-cgrey-200 rounded-lg py-[10px] px-6 w-fit">
                    <p className="text-cwhite text-sm font-normal hidden md:block">Edit</p>
                    <Image
                        src={Edit}
                        width="16"
                        height="16"
                        alt="edit"
                    />
                </button>}
            </div >
        </div >
    )
}

export default GiveawayCard;