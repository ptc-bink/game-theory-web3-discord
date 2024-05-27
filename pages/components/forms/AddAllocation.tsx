'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";


import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/pages/providers/AppContext";
import { addAllocation } from "@/pages/hooks/hook";

const AddAllocationModal: React.FC<AddAllocationModalProps> = () => {

    const { setAddAllocationModalOpen } = useContext(AppContext);
    const [allocation, setAllocation] = useState<number>(22);
    const [mintHoldDays, setMintHoldDays] = useState<number>(21);
    const [secondaryBuyHoldDays, setSecondaryBuyHoldDays] = useState<number>(28);
    const [secondaryBuyHours, setSecondaryBuyHours] = useState<number>(72);
    const [secondaryBuyAmount, setSecondaryBuyAmount] = useState<number>(1);
    const [priceVoid, setPriceVoid] = useState<number>(0.00);
    const [isVoid, setIsVoid] = useState<number>(2);

    const handleSubmit = async () => {

        if (!allocation || !mintHoldDays || !secondaryBuyHoldDays || !secondaryBuyHours || !secondaryBuyAmount || !priceVoid || !isVoid) {
            return console.log("plz input all value");
        }

        const data: any = { allocation, mintHoldDays, secondaryBuyHoldDays, secondaryBuyHours, secondaryBuyAmount, priceVoid, isVoid };

        await addAllocation(data);
    }
    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-[#FFFFFF] font-semibold">Add Allocation</p>
                <div onClick={() => setAddAllocationModalOpen(false)} className="cursor-pointer">
                    <Image
                        src={Cancel}
                        width="24"
                        height="24"
                        alt="cancel"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Allocation</p>
                        <input type="number" onChange={(e) => setAllocation(e.target.valueAsNumber)} placeholder="Choose Allocation" value={allocation} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Mint hold days</p>
                        <input type="number" onChange={(e) => setMintHoldDays(e.target.valueAsNumber)} placeholder="Choose Mint hold days" value={mintHoldDays} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Secondary buy hold days</p>
                        <input type="number" onChange={(e) => setSecondaryBuyHoldDays(e.target.valueAsNumber)} placeholder="Choose Secondary buy hold days" value={secondaryBuyHoldDays} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Secondary buy hours</p>
                        <input type="number" placeholder="Choose Secondary buy hours" onChange={(e) => setSecondaryBuyHours(e.target.valueAsNumber)} value={secondaryBuyHours} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Secondary buy amount</p>
                        <input type="number" placeholder="Choose Secondary buy amount" onChange={(e) => setSecondaryBuyAmount(e.target.valueAsNumber)} value={secondaryBuyAmount} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Price void</p>
                        <input type="number" step={0.00001} min={0.00001} onChange={(e) => setPriceVoid(e.target.valueAsNumber)} placeholder="Choose Price void" value={priceVoid} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div>
                <div className="grid gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Is void</p>
                        <input type="number" value={isVoid} onChange={(e) => setIsVoid(e.target.valueAsNumber)} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                </div>
            </div>
            <button className="flex self-end outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-4 py-3 w-fit rounded-md text-[#16171B]" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddAllocationModal;

interface AddAllocationModalProps {

}