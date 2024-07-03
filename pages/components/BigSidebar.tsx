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
import { getUserGlobalPermission, getUserPermission } from "@/hook";
import toast from "react-hot-toast";

interface SideDataProps {
    label: string,
    link: string,
    image: any,
    isActive: boolean
}

const BigSidebar = () => {

    const { userID } = useContext(AppContext);
    const [selectedItem, setSelectedItem] = useState<string>("");
    const path = usePathname();

    const adminSideBar = [
        {
            label: "Dashboard",
            link: "/dashboard",
            image: <Dashboard
                fill={selectedItem}
            />,
            userIn: true,
        },
        {
            label: "Projects",
            link: "/projects",
            image: <Projects
                fill={selectedItem}
            />,
            userIn: true
        },
        {
            label: "Allocations",
            link: "/allocations",
            image: <Allocation
                fill={selectedItem}
            />,
            userIn: true
        },
        {
            label: "Admin",
            link: "/admin",
            image: <Admin
                fill={selectedItem}
            />,
            userIn: false
        },
        {
            label: "Vesting",
            link: "/vesting",
            image: <Allocation
                fill={selectedItem}
            />,
            userIn: true
        },
        {
            label: "Bot",
            link: "/bot",
            image: <Bot
                fill={selectedItem}
            />,
            userIn: true
        },
    ]

    const [sideBar, setSideBar] = useState<any[]>(adminSideBar);

    const initAction = async () => {
        const res = await getUserGlobalPermission();

        if (res.status === 200) {
            console.log("user-get-global-permissions =====>", res.data);
            console.log("user-get-global-permissions =====>", res.data.isMember);
            console.log("userID=====>", userID);
            

            
            if (res.data.isMember.includes(userID)) {
                console.log("user is member");
                return setSideBar(adminSideBar.filter(item => item.userIn === true))
            }            else if (res.data.isSuperAdmin.includes(userID) || res.data.isAdmin.includes(userID)) {
                console.log("user is superadmin or admin");
                
                return setSideBar(adminSideBar);
            } else {
                toast.error("User has no permission.")
                return setSideBar([]);
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    return (
        <div className="flex flex-col">
            {sideBar.map((side: any, index: number) => (
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