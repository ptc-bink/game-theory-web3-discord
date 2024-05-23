
import React, { useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/avatar/arrow-down.svg"
import ArrowUp from "@/public/avatar/arrow-up.svg"

import { IRoleDropdownProps } from "@/pages/utils/_type";

const RoleDropdown: React.FC<IRoleDropdownProps> = ({ dropdownList, placeholder, className, callback }) => {

    const [RoledropdownOpen, setRoleDropdownOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string>(placeholder);

    const handleRoleDropdown = () => {
        setRoleDropdownOpen(!RoledropdownOpen);
    }

    const handleSetValue = (id: string, name: string) => {
        console.log(dropdownList);

        callback(id);
        setValue(name);
        setRoleDropdownOpen(false);
    }

    return (
        <div className="w-full relative">
            <div className={`flex items-center w-full cursor-pointer border border-cgrey-200 px-4 py-[10px] rounded-lg justify-between ${className}`} onClick={handleRoleDropdown}>
                <p className="text-sm font-normal text-[#FFFFFF]">{value}</p>
                {RoledropdownOpen ? <Image
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
            {RoledropdownOpen && <div className="absolute w-full cursor-pointer text-[#FFFFFF] flex flex-col mt-2 rounded-lg border border-cgrey-200 z-10">
                {dropdownList.map((item, index) => (
                    <div
                        key={index}
                        className={`items-center w-full px-4 py-[10px] border-cgrey-200 rounded-md border  justify-between text-sm font-normal text-[#FFFFFF] bg-[${item.color}] ${className} `}
                        onClick={() => handleSetValue(item.id, item.name)}>
                        {item.name}
                    </div>
                ))}
            </div>
            }
            {RoledropdownOpen && (<div className="fixed top-0 left-0 w-screen h-screen bg-[transparent]" onClick={() => setRoleDropdownOpen(false)}></div>)}
        </div>
    )
}

export default RoleDropdown;