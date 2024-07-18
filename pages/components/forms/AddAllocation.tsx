'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";


import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/providers/AppContext";
import { addAllocation } from "@/hook";

const AddAllocationModal: React.FC<AddAllocationModalProps> = () => {

    const { setAddAllocationModalOpen } = useContext(AppContext);
    const [title, setTitle] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [allocation, setAllocation] = useState<number>(0);
    const [mintDate, setMintDate] = useState<Date>();
    const [mintHoldDays, setMintHoldDays] = useState<number>(0);
    const [secondaryBuyHoldDays, setSecondaryBuyHoldDays] = useState<number>(0);
    const [secondaryBuyHoldHours, setSecondaryBuyHoldHours] = useState<number>(0);
    const [secondaryBuyAmount, setSecondaryBuyAmount] = useState<number>(0);
    const [priceVoid, setPriceVoid] = useState<number>(0);
    const [contract, setContract] = useState<string>("");

    const handleSubmit = async () => {

        if (!allocation || !mintHoldDays || !secondaryBuyHoldDays || !secondaryBuyHoldHours || !secondaryBuyAmount || !amount || !priceVoid || !title || !contract || !mintDate) {
            return console.log("plz input all value");
        }

        const data: any = { allocation, mintHoldDays, secondaryBuyHoldDays, secondaryBuyHoldHours, secondaryBuyAmount, priceVoid, mintDate, title, amount };

        await addAllocation(data);
    }
    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 max-h-[calc(100vh-50px)] overflow-scroll gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-cwhite font-semibold">Add Allocation</p>
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
                        <p className="text-sm font-normal text-cwhite">Title</p>
                        <input type="string" onChange={(e) => setTitle(e.target.value)} placeholder="Input title" value={title} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Contract</p>
                        <input type="string" value={contract} onChange={(e) => setContract(e.target.value)} placeholder="Input contract" className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Allocation</p>
                        <input type="number" onChange={(e) => setAllocation(e.target.valueAsNumber)} placeholder="Choose Allocation" value={allocation} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Mint hold days</p>
                        <input type="number" min="0" onChange={(e) => setMintHoldDays(e.target.valueAsNumber)} placeholder="Choose Mint hold days" value={mintHoldDays} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Secondary buy hold days</p>
                        <input type="number" min="0" onChange={(e) => setSecondaryBuyHoldDays(e.target.valueAsNumber)} placeholder="Choose Secondary buy hold" value={secondaryBuyHoldDays} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Secondary buy hold hours</p>
                        <input type="number" min="0" onChange={(e) => setSecondaryBuyHoldHours(e.target.valueAsNumber)} placeholder="Choose Secondary buy hold" value={secondaryBuyHoldHours} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Secondary buy amount</p>
                        <input type="number" min="0" placeholder="Choose Secondary buy amount" onChange={(e) => setSecondaryBuyAmount(e.target.valueAsNumber)} value={secondaryBuyAmount} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Price void</p>
                        <input type="number" step={.001} min={.001} onChange={(e) => setPriceVoid(e.target.valueAsNumber)} placeholder="Choose Price void" value={priceVoid} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Amount</p>
                        <input type="number" min="0" onChange={(e) => setAmount(e.target.valueAsNumber)} placeholder="Choose Amount" value={amount} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                </div>
                <div className="grid gap-3">
                    {/* <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Mint Date</p>
                        <input type="datetime-local" onChange={(e) => setMintDate(e.target.valueAsDate as Date)} placeholder="Choose Amount" value={mintDate} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div> */}
                </div>
            </div>
            <button aria-label="submit" className="bg-cwhite p-3 rounded-md border cursor-pointer hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-cgrey-100 text-sm leading-4 text-center font-medium" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default AddAllocationModal;

interface AddAllocationModalProps {

}