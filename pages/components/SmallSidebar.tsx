"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"

import Dashboard from "@/public/avatar/dashboard"
import Projects from "@/public/avatar/projects"
import Allocation from "@/public/avatar/allocation"
import Admin from "@/public/avatar/admin"
import Bot from "@/public/avatar/bot";
import { usePathname } from "next/navigation";

interface SideDataProps {
    label: string,
    link: string,
    image: any,
    isActive: boolean
}

const SmallSidebar = () => {

    const pathname = usePathname();

    const [fill, setFill] = useState<string>("");
    const [sideData, setSideData] = useState<SideDataProps[]>([
        {
            label: "Dashboard",
            link: "/dashboard",
            image: <Dashboard
                fill={fill}
            />,
            isActive: false,
        },
        {
            label: "Projects",
            link: "/projects",
            image: <Projects
                fill={fill}
            />,
            isActive: false
        },
        {
            label: "Allocations",
            link: "/allocations",
            image: <Allocation
                fill={fill}
            />,
            isActive: false
        },
        {
            label: "Admin",
            link: "/admin",
            image: <Admin
                fill={fill}
            />,
            isActive: false
        },
        {
            label: "Bot",
            link: "/bot",
            image: <Bot
                fill={fill}
            />,
            isActive: false
        },
    ])

    useEffect(() => {
        if (pathname !== "/") {
            const updatedSideData = sideData.map(item => {
                const isActive = pathname.includes(item.link);
                return {
                    ...item,
                    isActive,
                };
            });
            setSideData(updatedSideData);

            if (updatedSideData.some(item => item.isActive)) {
                setFill("[#FFFFFF]");
            }
        }
    }, [pathname]);

    return (
        <div className="grid grid-cols-5 bg-cgrey-100">
            {sideData.map((side: any, index: number) => (
                <Link key={index} href={side.link}>
                    <div className={`flex flex-col p-6 items-center justify-center cursor-pointer  hover:bg-cdark-100 ${side.isActive ? "border-t border-t-[#FFFFFF] bg-cdark-100" : ""}`}>
                        {side.image}
                        <p className={`pt-2 text-base font-semibold ${side.isActive ? "text-[#FFFFFF]" : "text-[#939393]"}`}>{side.label}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SmallSidebar;
