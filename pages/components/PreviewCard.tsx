"use client"

import React, { useEffect, useContext, useState } from "react";
import Image from "next/image";

import Preview from "@/public/avatar/eye.svg"
import User from "@/public/avatar/user.svg"

import { IPreviewCardProps } from "../../utils/_type";
import { useRouter } from "next/router";
import AppContext from "../../providers/AppContext";
import { formatDate } from "../../utils/utils";

const PreviewCard: React.FC<IPreviewCardProps> = ({ title, description, expiry, winningRole, chain, type, quantity, required, requirements, price }) => {

    const [date, setDate] = useState<string | null>(null);

    const router = useRouter();
    const { userImage, username, isAdmin } = useContext(AppContext);

    useEffect(() => {
        const updateDate = () => {
            setDate(formatDate(new Date()));
        };

        updateDate(); // Initial call to set the date
        const intervalId = setInterval(updateDate, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, []);



    const handlePreviewEnter = () => { }

    return (
        <div className="w-full flex flex-col h-fit rounded-md gap-4 p-4 bg-[#1D1E22] border border-cgrey-200">
            {/* <div className="md:hidden block"> */}
            <div className="flex gap-2">
                <Image
                    src={Preview}
                    width="24"
                    height="24"
                    alt="preview"
                />
                <p className="text-cwhite text-base font-semibold">Preview</p>
                {/* </div> */}
            </div>
            <div className="flex flex-col gap-3 p-4 rounded-sm bg-cgrey-200 border-l-[3px] border-[#15F115]">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1 text-cwhite">
                        <p className="text-base font-semibold">{title ? title : "Title"}</p>
                        <p className="text-sm leading-[18px] font-normal">{description ? description : "Description"}</p>
                    </div>
                    {userImage ? <img src={userImage} alt="user image" width={48} height={48} className="rounded-lg" />
                        : <img src={User} alt="user image" width={48} height={48} className="rounded-lg" />
                    }
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-cwhite text-sm leading-[18px] font-semibold">Expiry</label>
                        <p className="bg-[#393F4B] w-fit rounded-sm px-1 text-sm font-medium text-[#ECDEDB]">{expiry}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-cwhite text-sm leading-[18px] font-semibold">Chain</label>
                            <p className="text-cwhite text-sm leading-[18px] font-medium">{chain !== "" ? chain : "-"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-cwhite text-sm leading-[18px] font-semibold">Quantity</label>
                            <p className="text-cwhite text-sm leading-[18px] font-medium">{quantity ? quantity : "-"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-cwhite text-sm leading-[18px] font-semibold">Type</label>
                            <p className="text-cwhite text-sm leading-[18px] font-medium">{type !== "" ? type : "-"}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-cwhite text-sm leading-[18px] font-semibold">Winning Role</label>
                            {
                                winningRole ?
                                    <p className="text-sm font-medium text-cwhite w-fit rounded-sm px-1" style={{ backgroundColor: `${winningRole.color}` }}>
                                        {winningRole.name}
                                    </p> :
                                    <p className="text-sm font-medium text-cwhite">-</p>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-cwhite text-sm leading-[18px] font-semibold">Requirements</label>
                        {
                            required.length > 0 ?
                                <div className="flex gap-1">
                                    {required.map(item =>
                                        <p className="text-sm font-medium text-cwhite w-fit rounded-sm px-1" style={{ backgroundColor: `${item.color}` }}>
                                            {item.name}
                                        </p>
                                    )}
                                </div> :
                                <p className="text-sm font-medium text-cwhite">-</p>
                        }
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-cwhite text-sm leading-[18px] font-semibold">Entrants</label>
                        <p className="text-cwhite text-sm leading-[18px] font-medium">-</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-cwhite text-sm leading-[18px] font-semibold">Price:</label>
                        <p className="text-cwhite text-sm leading-[18px] font-medium">{price ? price : "Free"}</p>
                    </div>
                </div>
                <div className="border border-[#393A3D]"></div>
                <div className="flex gap-2 items-center justify-start">
                    {userImage ? <img src={userImage} alt="user avatar" width={24} height={24} className="rounded-full" />
                        : <img src={User} alt="user avatar" width={24} height={24} className="rounded-full" />
                    }
                    <p className=" text-sm leading-[18px] font-normal text-cwhite">Created By - {username}<span className="border mx-1 rounded-full border-[#cwhite]" />Today at {date}</p>
                </div>
            </div>
            <button aria-label="enter" className="rounded outline-none px-6 py-3 bg-[#248047] w-fit text-cwhite" onClick={handlePreviewEnter}>Enter</button>
        </div>
    )
}

export default PreviewCard;

