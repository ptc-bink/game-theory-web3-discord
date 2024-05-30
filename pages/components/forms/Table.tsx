'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import Edit from "@/public/avatar/edit.svg"
import Copy from "@/public/avatar/copy.svg"
import Trash from "@/public/avatar/trash.svg"

import { IAllocation, IRemoveEntrants } from "@/utils/_type";
import toast from "react-hot-toast";
import AppContext from "@/providers/AppContext";

const Table: React.FC<ITable> = ({ allocations }) => {

    const { setAllocationDeleted, setAllocationEdited } = useContext(AppContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);

    // Maintain the state of individual checkboxes
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    useEffect(() => {
        // Initialize checkedState based on jsonObjectList length
        setCheckedState(new Array(allocations?.length).fill(false));
    }, []);

    const handleEditBtn = async () => {
        toast.error("coming soon")

        setAllocationEdited(true);
    }

    const handleCopyBtn = async () => {
        toast.success("Copied success")
    }

    const handleDelBtn = async () => {
        toast.success("Deleted Success")

        setAllocationDeleted(true);
    }

    const btnGroup = (index: number) => {
        return (
            <div key={index} className="flex my-1 gap-2 justify-center">
                <button aria-label="edit" className="rounded-lg border border-cgrey-200 outline-none px-[10px] py-3">
                    <Image
                        src={Edit}
                        width={16}
                        height={16}
                        alt="edit"
                    />
                </button>
                <button className="rounded-lg border border-cgrey-200 outline-none px-[10px] py-3" onClick={handleCopyBtn}>
                    <Image
                        src={Copy}
                        width={16}
                        height={16}
                        alt="copy"
                    />
                </button>
                <button aria-label="trash" className="rounded-lg border border-cgrey-200 outline-none px-[10px] py-3" onClick={handleDelBtn}>
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
            <tr key={index} className="items-center border-b border-cgrey-200 cursor-pointer hover:bg-cgrey-100 text-sm leading-[18px] font-normal text-cwhite">
                <td className="text-center justify-center">
                    <p>{index + 1}</p>
                </td>
                <td className="text-center" >{item.title}</td>
                <td className="text-center" >{item.allocation}</td>
                <td className="text-center" >{item.role}</td>
                <td className="text-center" >{item.mint_date / (60 * 60 * 24)}</td>
                <td className="text-center">{item.vesting ? item.vesting.mint_hold_days : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.secondary_buy_hold_days + " days " + item.vesting.secondary_buy_hours + " hours" : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.secondary_buy_amount : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.price_void : "-"}</td>
                <td className="left-3">{btnGroup(index)}</td>
            </tr>
        )
    }

    return (
        <div className="flex w-full">
            <div className="lg:block hidden w-full">
                <table className="w-full text-sm font-normal text-cgrey-900">
                    <tr className="border-b border-cgrey-200 p-4">
                        <th>No</th>
                        <th>Title</th>
                        <th>Allocation</th>
                        <th>Role</th>
                        <th>Mint Date</th>
                        <th>Hold days</th>
                        <th>Secondary Buy Hold</th>
                        <th>Amount</th>
                        <th>Price void</th>
                        <th className="text-center">Action</th>
                    </tr>
                    {allocations?.map((item, index) => (
                        tableBody(index, item)
                    ))}
                </table>
            </div>
            <div className="block lg:hidden w-full">
                <div className="flex flex-col gap-4">
                    {allocations.map((item, index) => (
                        <div className="flex flex-col gap-4  border border-cgrey-100 p-5">
                            {/* <div className="grid gap-4">
                                <p className="text-base font-semibold text-cwhite">{item.id}</p>
                                <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(!isChecked)} className="rounded-[4px]" />
                            </div> */}
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Title</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.title}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Allocation</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.allocation}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Role</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.role}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Mint Date</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.mint_date / (60 * 60 * 24)}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Mint hold days</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.mint_hold_days : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Secondary Buy Hold</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.secondary_buy_hold_days + " days " + item.vesting.secondary_buy_hours + " hours" : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Amount</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.secondary_buy_amount : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Price void</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.price_void : "-"}</p>
                                </div>
                            </div>
                            <div key={index} className="flex my-1 gap-2 justify-center">
                                <div className="flex gap-2 items-center border rounded-lg justify-center w-full cursor-pointer px-[10px] py-3 border-cgrey-200" onClick={() => handleEditBtn()}>
                                    <p className="text-sm font-normal text-cwhite">Edit</p>
                                    <button aria-label="edit" className="outline-none">
                                        <Image
                                            src={Edit}
                                            width={16}
                                            height={16}
                                            alt="edit"
                                        />
                                    </button>
                                </div>
                                <button className="rounded-lg border border-cgrey-200 outline-none px-[10px] cursor-pointer py-3" onClick={handleCopyBtn}>
                                    <Image
                                        src={Copy}
                                        width={16}
                                        height={16}
                                        alt="copy"
                                    />
                                </button>
                                <button aria-label="trash" className="rounded-lg border border-cgrey-200 outline-none px-[10px] cursor-pointer py-3" onClick={handleDelBtn}>
                                    <Image
                                        src={Trash}
                                        width={16}
                                        height={16}
                                        alt="trash"
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
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
