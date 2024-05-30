'use client'

import React, { useContext } from "react";
import Image from "next/image";

import CloseCircle from "@/public/avatar/close-circle.svg"
import AppContext from "@/providers/AppContext";
import { useRouter } from "next/router";

const RemoveEntrantsModal: React.FC<RemoveEntrantsModalProps> = () => {

    const { setRemoveEntrantModalOpen, setRemoveApproval } = useContext(AppContext);
    const router = useRouter();

    const handleRemoveBtn = () => {
        setRemoveApproval(true);
        setRemoveEntrantModalOpen(false)
    }

    return (
        <div className="flex flex-col items-center justify-center bg-[#1D1E22] border border-cgrey-200 p-6 rounded-md w-[450px] gap-6">
            <Image
                src={CloseCircle}
                width="50"
                height="50"
                alt="dangerous cancel"
            />
            <div className="flex flex-col text-center text-xl text-cwhite leading-[30px] items-center font-semibold">
                <p>Are you sure you want to remove this</p>
                <p>entrant?</p>
            </div>
            <div className="flex w-full justify-between gap-4">
                <p className="flex justify-center hover:bg-cgrey-200 cursor-pointer w-full text-center p-3 rounded-md border border-cwhite text-sm text-cwhite leading-4 font-medium" onClick={() => setRemoveEntrantModalOpen(false)}>No</p>
                <p className="flex justify-center hover:bg-cgrey-200 hover:text-cwhite cursor-pointer w-full text-center p-3 rounded-md border border-[#EEEEEE] bg-cwhite text-cdark-100 text-sm leading-4 font-medium" onClick={handleRemoveBtn}>Yes</p>
            </div>
        </div>
    )
}

export default RemoveEntrantsModal;

interface RemoveEntrantsModalProps {
}