'use client'

import React, { useState, useEffect } from "react";
import Image from "next/image";

import Edit from "@/public/avatar/edit.svg"
import Copy from "@/public/avatar/copy.svg"
import Trash from "@/public/avatar/trash.svg"

// import { jsonObjectList } from "@/pages/utils/_data";
import { IAllocation } from "@/pages/utils/_type";

const Table: React.FC<ITable> = ({ allocations }) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

    // Maintain the state of individual checkboxes
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    useEffect(() => {
        // Initialize checkedState based on jsonObjectList length
        setCheckedState(new Array(allocations.length).fill(false));
    }, []);

    const handleCheckboxChange = (index: number) => {
        const updatedCheckedState = checkedState.map((item, idx) => idx === index ? !item : item);
        setCheckedState(updatedCheckedState);
    };

    const btnGroup = (index: number) => {
        return (
            <div key={index} className="flex my-1 gap-2 justify-center">
                <button className="rounded-lg border border-[#292A2E] outline-none px-[10px] py-3">
                    <Image
                        src={Edit}
                        width={16}
                        height={16}
                        alt="edit"
                    />
                </button>
                <button className="rounded-lg border border-[#292A2E] outline-none px-[10px] py-3">
                    <Image
                        src={Copy}
                        width={16}
                        height={16}
                        alt="copy"
                    />
                </button>
                <button className="rounded-lg border border-[#292A2E] outline-none px-[10px] py-3">
                    <Image
                        src={Trash}
                        width={16}
                        height={16}
                        alt="trash"
                    />
                </button>
            </div>
        )
    }

    const tableBody = (index: number, item: IAllocation) => {
        return (
            <tr key={index} className="items-center border-b border-[#292A2E] text-xs leading-[18px] font-normal text-[#FFFFFF]">
                <td className="text-center justify-center">
                    <div className="flex py-3 gap-2">
                        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(!isChecked)} className="rounded-[4px]" />
                        <p>{item.id}</p>
                    </div>
                </td>
                <td className="text-center" >{item.allocation}</td>
                <td className="text-center">{item.vesting.mint_hold_days}</td>
                <td className="text-center">{item.vesting.secondary_buy_hold_days}</td>
                <td className="text-center">{item.vesting.secondary_buy_hours}</td>
                <td className="text-center">{item.vesting.secondary_buy_amount}</td>
                <td className="text-center">{item.vesting.price_void}</td>
                <td className="text-center">{item.vesting.is_void}</td>
                <td className="">{btnGroup(index)}</td>
            </tr>
        )
    }

    return (
        <div className="flex flex-grow w-full">
            <table className="w-full">
                <tr className="py-3 text-xs border-b border-[#292A2E] leading-[18px] font-normal text-[#939393]">
                    <th className="flex gap-2 pl-0">
                        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(!isChecked)} className="rounded-[4px]" />
                        <p>Id</p>
                    </th>
                    <th>Allocation</th>
                    <th>Mint hold days</th>
                    <th>Secondary buy hold days</th>
                    <th>Secondary buy hold hours</th>
                    <th>Secondary buy amount</th>
                    <th>Price void</th>
                    <th>Is void</th>
                    <th className="text-center">Action</th>
                </tr>
                {allocations.length && allocations?.map((item, index) => (
                    tableBody(index, item)
                ))}
            </table>
        </div>
    )
}

export default Table;

interface ITable {
    allocations: IAllocation[];
}

interface ITableBodyList {
    id: string,
    allocation: number,
    mintHoldDays: number,
    secondaryBuyHoldDays: number,
    secondaryBuyHours: number,
    secondaryBuyAmount: number,
    priceVoid: number,
    isVoid: number
}
