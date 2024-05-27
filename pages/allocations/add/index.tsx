"use client"

import React, { useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import { useRouter } from "next/router";
import BackBtn from "@/pages/components/BackBtn";
import { addAllocation } from "@/pages/hooks/hook";

const HarvestWinners: React.FC<IHarvestWinners> = () => {

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
        <div className="flex flex-col p-8 gap-4">
            <div className="w-3/5 flex flex-col gap-4">
                <div className="flex gap-6 items-center">
                    <BackBtn />
                    <p className="text-[#FFFFFF] text-2xl font-semibold">Add</p>
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
        </div>
    );
}

export default HarvestWinners;

interface IHarvestWinners { }