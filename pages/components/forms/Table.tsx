'use client'

import React, { useState } from "react";
import Image from "next/image";

import Edit from "@/public/avatar/edit.svg"
import Copy from "@/public/avatar/copy.svg"
import Trash from "@/public/avatar/trash.svg"

import { jsonObjectList } from "@/pages/utils/_data";

const Table: React.FC<ITable> = ({ }) => {

    const [isChecked, setIsChecked] = useState<boolean>(false);

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

    const tableBody = (
        index: number,
        item: ITableBodyList
    ) => {
        return (
            <tr key={index} className="items-center border-b border-[#292A2E] text-xs leading-[18px] font-normal text-[#FFFFFF]">
                <td className="text-center justify-center">
                    <div className="flex py-3 gap-2">
                        <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(!isChecked)} className="rounded-[4px]" />
                        <p>{item.id}</p>
                    </div>
                </td>
                <td className="text-center" >{item.allocation}</td>
                <td className="text-center">{item.mintHoldDays}</td>
                <td className="text-center">{item.secondaryBuyHoldDays}</td>
                <td className="text-center">{item.secondaryBuyHours}</td>
                <td className="text-center">{item.secondaryBuyAmount}</td>
                <td className="text-center">{item.priceVoid}</td>
                <td className="text-center">{item.isVoid}</td>
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
                {jsonObjectList.map((item, index) => (
                    tableBody(index, item)
                ))}
            </table>
        </div>
    )
}

export default Table;

interface ITable {
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
