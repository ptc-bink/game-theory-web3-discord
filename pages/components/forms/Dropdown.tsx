
import React, { useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"

import { IDropdownProps } from "@/pages/utils/_type";

const Dropdown: React.FC<IDropdownProps> = ({ dropdownList, placeholder, className, callback }) => {

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

    return (
        <div className="w-full relative">
            <div className={`flex items-center w-full cursor-pointer border border-cgrey-200 px-4 py-[10px] rounded-lg justify-between ${className}`} onClick={handleDropdown}>
                <p className="text-sm font-normal text-[#FFFFFF]">{value}</p>
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
            {dropdownOpen && <div className="absolute w-full cursor-pointer text-[#FFFFFF] flex flex-col mt-2 rounded-lg border border-cgrey-200 z-10">
                {dropdownList.map((item, index) => (
                    <div key={index} className={`items-center w-full px-4 py-[10px]  justify-between text-sm font-normal text-[#FFFFFF] ${className}`} onClick={() => handleSetValue(item.id, item.name)}>{item.name}</div>
                ))}
                {/* <div className={`items-center w-full px-4 py-[10px]  justify-between text-sm font-normal text-[#FFFFFF] ${className}`} onClick={() => handleSetValue(dropdownList.id)}>{dropdownList?.name}</div> */}
            </div>
            }
            {dropdownOpen && (<div className="fixed top-0 left-0 w-screen h-screen bg-[transparent]" onClick={() => setDropdownOpen(false)}></div>)}
        </div>
    )
}

export default Dropdown;