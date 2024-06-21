"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"
import Cancel from "@/public/avatar/close-circle.svg"

import { IDropdownProps } from "@/utils/_type";

const Dropdown: React.FC<IDropdownProps> = ({ dropdownList, initValue, placeholder, className, callback }) => {

    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(placeholder);

    const handleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSetValue = (id: string, name: string) => {
        callback(id);
        setValue(name);
        setDropdownOpen(false);
    }

    const handleCancelBtn = () => {
        callback("");
        setValue(placeholder);
    }

    useEffect(() => {
        setValue(placeholder);
    }, [dropdownList])

    return (
        <div className="w-full relative">
            <div className={`flex items-center w-full cursor-pointer border border-cgrey-200 px-4 py-[10px] rounded-lg justify-between ${className}`} onClick={handleDropdown}>
                <p className="text-sm font-normal overflow-hidden text-cwhite">{(initValue && value === placeholder) ? initValue : value}</p>
                <div className="flex justify-between gap-2 items-center">
                    {value !== placeholder &&
                        <div className="cursor-pointer " onClick={handleCancelBtn}>
                            <Image
                                src={Cancel}
                                width="16"
                                height="16"
                                alt="th cancel"
                            />
                        </div>
                    }
                    {dropdownOpen ? <Image
                        src={ArrowUp}

                        width="16"
                        height="16"
                        alt="Arrow down"
                    /> : <Image
                        src={ArrowDown}
                        width="16"
                        height="16"
                        alt="Arrow down"
                    />}
                </div>
            </div>
            {dropdownOpen && <div className="absolute w-full cursor-pointer text-cwhite flex flex-col mt-1 rounded-lg z-20 max-h-[200px] overflow-scroll">
                {dropdownList?.map((item, index) => (
                    <div key={index} className={`items-center w-full px-4 py-[10px] bg-cgrey-100 justify-between border rounded border-cgrey-200 text-sm font-normal text-cwhite ${className}`} onClick={() => handleSetValue(item.id, item.name)}>{item.name}</div>
                ))}
                {/* <div className={`items-center w-full px-4 py-[10px]  justify-between text-sm font-normal text-cwhite ${className}`} onClick={() => handleSetValue(dropdownList.id)}>{dropdownList?.name}</div> */}
            </div>
            }
            {dropdownOpen && (<div className="fixed top-0 left-0 w-screen h-screen bg-[transparent]" onClick={() => setDropdownOpen(false)}></div>)}
        </div>
    )
}

export default Dropdown;