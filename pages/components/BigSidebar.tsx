"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"

import Dashboard from "../../public/avatar/dashboard"
import Projects from "../../public/avatar/projects"
import Allocation from "../../public/avatar/allocation"
import Admin from "../../public/avatar/admin"
import Bot from "../../public/avatar/bot";
import { usePathname } from "next/navigation";
import AppContext from "../../providers/AppContext";

interface SideDataProps {
    label: string,
    link: string,
    image: any,
    isActive: boolean
}

const BigSidebar = () => {

    const [sideData, setSideData] = useState<SideDataProps[]>([])
    const { isAdmin } = useContext(AppContext);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const path = usePathname();

    const adminSideBar = [
        {
            label: "Dashboard",
            link: "/dashboard",
            image: <Dashboard
                fill={selectedItem}
            />,
            isActive: false,
        },
        {
            label: "Projects",
            link: "/projects",
            image: <Projects
                fill={selectedItem}
            />,
            isActive: false
        },
        {
            label: "Allocations",
            link: "/allocations",
            image: <Allocation
                fill={selectedItem}
            />,
            isActive: false
        },
        {
            label: "Admin",
            link: "/admin",
            image: <Admin
                fill={selectedItem}
            />,
            isActive: false
        },
        {
            label: "Vesting",
            link: "/vesting",
            image: <Allocation
                fill={selectedItem}
            />,
            isActive: false
        },
        {
            label: "Bot",
            link: "/bot",
            image: <Bot
                fill={selectedItem}
            />,
            isActive: false
        },
    ]

    return (
        <div className="flex flex-col">
            {adminSideBar.map((side: any, index: number) => (
                <Link key={index} href={side.link}>
                    <div className={`flex flex-col p-6 items-center justify-center cursor-pointer  hover:bg-cdark-100 ${path.includes(side.link) ? "border-r border-r-cwhite bg-cdark-100" : ""}`} onClick={() => { setSelectedItem(side.label) }}>
                        {side.image}
                        <p className={`pt-2 text-base font-semibold ${path.includes(side.link) ? "text-cwhite" : "text-cgrey-900"}`}>{side.label}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default BigSidebar;