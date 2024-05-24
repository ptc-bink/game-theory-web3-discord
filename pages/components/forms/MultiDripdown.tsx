
import React, { useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"

import { IMultiDropdownProps, IServerRole } from "@/pages/utils/_type";

const MultiDropdown: React.FC<IMultiDropdownProps> = ({ dropdownList, placeholder, className, callback }) => {

    const [MultiDropdownOpen, setMultiDropdownOpen] = useState<boolean>(false);
    const [valueList, setValueList] = useState<IServerRole[]>([]);
    const [IDList, setIDList] = useState<string[]>([]);

    const handleMultiDropdown = () => {
        setMultiDropdownOpen(!MultiDropdownOpen);
    }

    const handleSetValue = (id: string, name: string) => {
        console.log(dropdownList);

        callback(valueList);
        setValueList(valueList);
    }

    return (
        <div className="w-full relative">
            <div className={`flex items-center w-full cursor-pointer border border-cgrey-200 px-4 py-[10px] rounded-lg justify-between ${className}`} onClick={handleMultiDropdown}>
                {valueList ? <div className="gap gap-1">
                    {valueList.map((item, index) => (
                        <div className={`text-xs font-medium bg-[${item.color}] p-1 rounded`}>{item.name}</div>
                    ))}
                </div> : <p
                    className="text-sm font-normal text-[#939393]">
                    {placeholder}
                </p>}
                {MultiDropdownOpen ? <Image
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
            {MultiDropdownOpen && <div className="absolute w-full cursor-pointer text-[#FFFFFF] flex flex-col mt-1 rounded-lg z-10">
                {dropdownList.map((item, index) => (
                    <div
                        key={index}
                        className={`items-center w-full px-4 py-[10px] border-cgrey-200 rounded-md border bg-cgrey-100 justify-between text-sm font-normal text-[#FFFFFF] text-[${item.color}] ${className} `}
                        onClick={() => handleSetValue(item.id, item.name)}>
                        {item.name}
                    </div>
                ))}
            </div>
            }
            {MultiDropdownOpen && (<div className="fixed top-0 left-0 w-screen h-screen bg-[transparent]" onClick={() => setMultiDropdownOpen(false)}></div>)}
        </div>
    )
}

export default MultiDropdown;