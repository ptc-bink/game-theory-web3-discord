'use client'

import React, { useContext } from "react";
import Image from "next/image";

import CloseCircle from "@/public/avatar/close-circle.svg"
import AppContext from "@/pages/providers/AppContext";
import { useRouter } from "next/router";

const RemoveEntrantsModal: React.FC<RemoveEntrantsModalProps> = ({ serverID, marketID, removeUserID }) => {

    const { setRemoveEntrantModalOpen } = useContext(AppContext);
    const router = useRouter();

    const handleRemoveBtn = () => {
        const data = {
            serverID: serverID,
            marketID: marketID,
            removeUserID: removeUserID
        };


    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#1D1E22] border border-[#292A2E] p-6 rounded-md w-[450px] gap-6">
            <CloseCircle className="w-[50px] h-[50px]" fill="#DC3546" />
            <Image
                src={CloseCircle}
                className=""
                width="50"
                height="50"
                alt="dangerous cancel"
            />
            <div className="flex flex-col text-center text-xl text-[#FFFFFF] leading-[30px] items-center font-semibold">
                <p>Are you sure you want to remove this</p>
                <p>entrant?</p>
            </div>
            <div className="flex w-full justify-between gap-4">
                <p className="flex justify-center hover:bg-cgrey-200 cursor-pointer w-full text-center p-3 rounded-md border border-[#FFFFFF] text-sm text-[#FFFFFF] leading-4 font-medium" onClick={() => router.back()}>No</p>
                <p className="flex justify-center hover:bg-cgrey-200 hover:text-[#FFFFFF] cursor-pointer w-full text-center p-3 rounded-md border border-[#EEEEEE] bg-[#FFFFFF] text-[#16171B] text-sm leading-4 font-medium" onClick={handleRemoveBtn}>Yes</p>
            </div>
        </div>
    )
}

export default RemoveEntrantsModal;

interface RemoveEntrantsModalProps {
    serverID: string,
    marketID: string,
    removeUserID: string
}