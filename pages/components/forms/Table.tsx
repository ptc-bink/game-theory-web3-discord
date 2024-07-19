'use client'

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import Edit from "@/public/avatar/edit.svg"
import { PiWavesThin } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

import { IAllocation, IRemoveEntrants } from "@/utils/_type";
import toast from "react-hot-toast";
import AppContext from "@/providers/AppContext";
import EditAllocationModal from "./EditAllocation";
import moment from "moment";

const Table: React.FC<ITable> = ({ allocations, allocationForVesting }) => {

    const { setAllocationEdited, setEditAllocationModalOpen, editAllocationModalOpen } = useContext(AppContext);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [editAllocationID, setEditAllocationID] = useState<number>(-1);

    // Maintain the state of individual checkboxes
    const [checkedState, setCheckedState] = useState<boolean[]>([]);

    useEffect(() => {
        // Initialize checkedState based on jsonObjectList length
        //firstly sort these in decending order as per their number in the array
        allocations?.sort((a, b) => b.id - a.id)
        setCheckedState(new Array(allocations?.length).fill(false));
    }, []);

    const handleEditBtn = async (index: number) => {
        console.log('allocationForVesting :>> ', allocationForVesting);
        // toast.success(index.toString())
        console.log('allocations[editAllocationID]?.id :>> ', allocations[editAllocationID]?.id);
        console.log('index :>> ', index);

        setEditAllocationModalOpen(true);
        setEditAllocationID(index);
        setAllocationEdited(true);
    }

    const handleVestingBtn = async (index: number) => {
        toast.success("coming soon!")
    }

    const btnGroup = (index: number) => {
        return (
            <div key={index} className="flex my-1 gap-2 justify-end">
                {
                    allocationForVesting.includes(allocations[index]?.id) &&
                    <button aria-label="edit" title="Generate/Refresh Vesting Report" className="hover:bg-cdark-100 rounded-lg border border-cgrey-200 outline-none px-[10px] py-3 text-cwhite" onClick={() => handleVestingBtn(index)}>
                        <PiWavesThin className="w-4 h-4 text-cwhite" />
                    </button>
                }
                <button aria-label="edit" title="Edit Allocation/Vestign Details" className="hover:bg-cdark-100 rounded-lg border border-cgrey-200 outline-none px-[10px] py-3" onClick={() => handleEditBtn(index)}>
                    <Image
                        src={Edit}
                        width={16}
                        height={16}
                        alt="edit"
                    />
                </button>
            </div>
        )
    }

    const tableBody = (index: number, item: IAllocation) => {
        return (
            <tr key={index} className="items-center border-b border-cgrey-200 cursor-pointer hover:bg-cgrey-100 text-sm leading-[18px] font-normal text-cwhite">
                <td className="text-center justify-center">
                    {index + 1}
                </td>
                {/* <td className="text-left" >{item.title.length > 10 ? item.title.slice(0, 3) + "..." + item.title.slice(-3) : item.title}</td> */}
                <td className="text-left break-all">{item.title}</td>
                <td className="text-center">{item.allocation}</td>
                <td className="text-center" >{item.role ? item.role : "-"}</td>
                <td className="text-center flex items-center justify-center" >{item.contract ?<TiTick className=" text-[#00FF00]" /> : <IoClose className="text-[#FF0000]" /> }</td>
                {/* <td className="text-center" >{item.mint_date ? new Date(item.mint_date * 1000).toLocaleDateString() + "  " + new Date(item.mint_date * 1000).toLocaleTimeString() : "-"}</td> */}
                <td className="text-center" >{item.mint_date ? moment(item.mint_date as number * 1000).format("YYYY/MM/DD") + "  " + moment(item.mint_date as number * 1000).format("HH:MM") : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.mint_hold_days + " days" : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.secondary_buy_hold_days === 0 ? "-" : item.vesting.secondary_buy_hold_days + "d" : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.secondary_buy_hours + "h" : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.secondary_buy_amount : "-"}</td>
                <td className="text-center">{item.vesting ? item.vesting.price_void : "-"}</td>
                <td className="w-fit">{btnGroup(index)}</td>
            </tr>
        )
    }

    return (
        <div className="flex w-full">
            <div className="lg:block hidden w-full">
                <table className="sticky z-10 top-0 w-full text-sm font-normal text-cgrey-900">
                    <tr className="border-b border-cgrey-200 p-4">
                        <th className="py-4 text-center w-[40px]">No</th>
                        <th className="py-4 text-left">Title</th>
                        <th className="py-4 max-w-[160px]">Allocation Quantity</th>
                        <th className="py-4 max-w-[160px]">Role ID</th>
                        <th className="py-4 max-w-[160px]">Contract Set</th>
                        <th className="py-4 max-w-[220px]">Mint Date</th>
                        <th className="py-4 max-w-[160px]">Mint Hold days</th>
                        <th className="py-4 max-w-[60px]">Secondary Buy (Hold Days)</th>
                        <th className="py-4 max-w-[60px]">Secondary Buy (Hours to Buy)</th>
                        <th className="py-4 max-w-[60px]">Amount</th>
                        <th className="py-4 max-w-[60px]">Price void</th>
                        <th className="py-4 max-w-[60px] text-center">Action</th>
                    </tr>
                    {Array.isArray(allocations) && allocations?.map((item, index) => (
                        tableBody(index, item)
                    ))}
                </table>
            </div>
            <div className="block lg:hidden w-full">
                <div className="flex flex-col gap-4">
                    {Array.isArray(allocations) && allocations?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-4  border border-cgrey-100 p-5">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Title</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.title}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Allocation Quantity</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.allocation}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Role</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.role ? item.role : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Contract Set</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.contract ? "Yes" : "No"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Mint Date</p>
                                    {/* <p className="text-sm leading-[18px] font-normal text-cwhite">{item.mint_date ? new Date(item.mint_date * 1000).toLocaleDateString() + "  " + new Date(item.mint_date * 1000).toLocaleTimeString() : "Not Set"}</p> */}
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.mint_date ? moment(item.mint_date as number * 1000).format("YYYY/MM/DD") + "  " + moment(item.mint_date as number * 1000).format("HH:MM") : "Not Set"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Mint hold days</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.mint_hold_days + " days" : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Secondary Buy (Hold Days)</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? (item.vesting.secondary_buy_hold_days === 0 ? "" : item.vesting.secondary_buy_hold_days + "d : "): "Not Set"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Secondary Buy (Hours to buy)</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.secondary_buy_hours + "h" : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Secondary Buy Amount</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.secondary_buy_amount : "-"}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="text-sm leading-[18px] font-normal text-cgrey-900">Price void</p>
                                    <p className="text-sm leading-[18px] font-normal text-cwhite">{item.vesting ? item.vesting.price_void : "-"}</p>
                                </div>
                            </div>
                            <div key={index} className="flex my-1 gap-2 justify-center">
                                <div className="flex gap-2 items-center border rounded-lg justify-center w-full cursor-pointer px-[10px] py-3 border-cgrey-200" onClick={() => handleEditBtn(index)}>
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
                            </div>
                            {allocationForVesting.includes(item.id) &&
                            <div key={index} className="flex my-1 gap-2 justify-center">
                                <div className="flex gap-2 items-center border rounded-lg justify-center w-full cursor-pointer px-[10px] py-3 border-cgrey-200" onClick={() => handleVestingBtn(index)}>
                                    <p className="text-sm font-normal text-cwhite">Create/Refresh Vesting Report</p>
                                    <PiWavesThin className="w-4 h-4 text-cwhite" />
                                </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
            {editAllocationID !== -1 && editAllocationModalOpen &&
                <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                    <EditAllocationModal
                        id={allocations[editAllocationID]?.id}
                        title={allocations[editAllocationID]?.title}
                        allocation={allocations[editAllocationID]?.allocation}
                        for_server={allocations[editAllocationID]?.for_server}
                        role={allocations[editAllocationID]?.role}
                        contract={allocations[editAllocationID]?.contract}
                        mint_date={allocations[editAllocationID]?.mint_date}
                        vesting={allocations[editAllocationID]?.vesting}
                    />
                </div>
            }
        </div>
    )
}

export default Table;

interface ITable {
    allocations: IAllocation[];
    allocationForVesting: any;
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
