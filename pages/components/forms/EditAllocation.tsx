'use client'

import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";

import Cancel from "@/public/avatar/close.svg"
import AppContext from "@/providers/AppContext";
import { editAllocation } from "@/hook";
import { IAllocation } from '../../../utils/_type';
import moment from "moment";
import toast from "react-hot-toast";

const EditAllocationModal: React.FC<IAllocation> = (data) => {

    const { setEditAllocationModalOpen } = useContext(AppContext);
    const [title, setTitle] = useState<string>(data.title);
    const [amount, setAmount] = useState<number>(0);
    const [allocation, setAllocation] = useState<number>(data.allocation);
    const [mintHoldDays, setMintHoldDays] = useState<number>(data.vesting?.mint_hold_days as number);
    const [secondaryBuyDays, setSecondaryBuyDays] = useState<any>();
    const [secondaryBuyHours, setSecondaryBuyHours] = useState<any>();
    const [secondaryBuy, setSecondaryBuy] = useState<any>();
    const [secondaryBuyAmount, setSecondaryBuyAmount] = useState<number>(data.vesting?.secondary_buy_amount as number);
    const [priceVoid, setPriceVoid] = useState<number>(data.vesting?.price_void as number);
    const [contract, setContract] = useState<string>(data.contract);

    const initAction = () => {
        console.log('data :>> ', data.mint_date);

        setSecondaryBuyDays(moment(data.mint_date as number * 1000).format("YYYY-MM-DD"));
        setSecondaryBuyHours(moment(data.mint_date as number * 1000).format("HH:MM"));
    }

    const handleSubmit = async () => {

        if (!title || !contract) {
            return console.log("plz input all value");
        }

        if (secondaryBuy && Math.floor(new Date(secondaryBuy).getTime() / 1000) < Math.floor(new Date().getTime() / 1000)) {
            toast.error("Invalid secondary buy date")
        }

        const mintTimeTemp = Math.floor(new Date(secondaryBuy).getTime() / 1000)

        const data: any = { allocation, mintHoldDays, secondaryBuyDays, secondaryBuyHours, secondaryBuyAmount, priceVoid, mintTimeTemp, title, amount };

        await editAllocation(data);

        setEditAllocationModalOpen(false);
    }

    useEffect(() => {
        // Initialize the date to current datetime if not already set
        if (!secondaryBuyDays) {
            setSecondaryBuyDays(new Date().toISOString().slice(0, 10)); // ISO format for datetime-local
        }

        if (!secondaryBuyHours) {
            setSecondaryBuyHours(new Date().toISOString().slice(11, 16));
        }

        setSecondaryBuy(secondaryBuyDays + " " + secondaryBuyHours);

    }, [secondaryBuyDays, secondaryBuyHours]);

    useEffect(() => {
        initAction()
    }, [])

    return (
        <div className="flex flex-col w-[450px] rounded-md p-6 max-h-[calc(100vh-50px)] overflow-scroll gap-6 border border-cgrey-200 bg-cgrey-100">
            <div className="flex justify-between gap-4">
                <p className="text-base text-cwhite font-semibold">Edit Allocation</p>
                <div onClick={() => setEditAllocationModalOpen(false)} className="cursor-pointer">
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
                    {/* <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Secondary buy hold days</p>
                        <input type="number" min="0" onChange={(e) => setSecondaryBuyHoldDays(e.target.valueAsNumber)} placeholder="Choose Secondary buy hold" value={secondaryBuyHoldDays} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Secondary buy hold hours</p>
                        <input type="number" min="0" onChange={(e) => setSecondaryBuyHoldHours(e.target.valueAsNumber)} placeholder="Choose Secondary buy hold" value={secondaryBuyHoldHours} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div> */}
                    <input type="date" onChange={(e) => setSecondaryBuyDays(e.target.value)} value={secondaryBuyDays} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cwhite px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" suppressContentEditableWarning={true}
                        aria-label="Secondary mint Date" />
                    <input type="time" onChange={(e) => setSecondaryBuyHours(e.target.value)} value={secondaryBuyHours} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cwhite px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md"
                        aria-label="Secondary mint Time" />
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
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Mint Date</p>
                        {/* <input type="datetime-local" onChange={(e) => setSecondaryBuyDays(e.target.valueAsDate as Date)} placeholder="Choose Amount" value={secondaryBuyDays} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" /> */}
                    </div>
                </div>
            </div>
            <button aria-label="submit" className="bg-cwhite p-3 rounded-md border cursor-pointer text-cgrey-100 hover:bg-cgrey-100 hover:text-cwhite border-[#EEEEEE] text-sm leading-4 text-center font-medium" onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default EditAllocationModal;