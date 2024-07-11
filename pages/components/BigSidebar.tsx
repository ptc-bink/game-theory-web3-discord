"use client";

import { useContext, useEffect, useState, useRef } from "react";
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
            permittedIn: false
        },
        {
            label: "Projects",
            link: "/projects",
            image: <Projects
                fill={selectedItem}
            />,
            userIn: false,
            permittedIn: false
        },
        {
            label: "Allocations",
            link: "/allocations",
            image: <Allocation
                fill={selectedItem}
            />,
            userIn: false,
            permittedIn: false
        },
        {
            label: "Admin",
            link: "/admin",
            image: <Admin
                fill={selectedItem}
            />,
            userIn: false,
            permittedIn: false
        },
        {
            label: "Vesting",
            link: "/vesting",
            image: <Allocation
                fill={selectedItem}
            />,
            userIn: false,
            permittedIn: true
        },
        {
            label: "Bot",
            link: "/bot",
            image: <Bot
                fill={selectedItem}
            />,
            userIn: true,
            permittedIn: true
        },
    ]

    const [sideBar, setSideBar] = useState<any[]>(adminSideBar.filter(item => item.userIn === true));
    const initActionCalled = useRef(false);

    const initAction = async () => {
        if (initActionCalled.current) return; // Prevents initAction from running more than once
        initActionCalled.current = true;

        const res = await getUserGlobalPermission();
        console.log("get bigsidebar global permission data =====> ", res.data);

        if (res.status === 200) {
            if (res.data.isMember.length > 0 && res.data.isSuperAdmin.length === 0 && res.data.isAdmin.length === 0) {

                if (res.data.canViewVesting.length > 0) {
                    toast.success("user is member with vesting rights");
                    return setSideBar(adminSideBar.filter(item => item.permittedIn === true || item.userIn === true))
                } else {
                    toast.success("user is standard member");
                    return setSideBar(adminSideBar.filter(item => item.userIn === true))
                }

            } else if (res.data.isSuperAdmin.length > 0 || res.data.isAdmin.length > 0) {
                toast.success("User is superadmin or admin");

                return setSideBar(adminSideBar);
            } else if (res.data.canViewVesting.length > 0) {
                toast.success("User can view vesting ONLY");

                if (res.data.canViewVesting.length > 0) {
                    toast.success("user is member with vesting rights");
                    return setSideBar(adminSideBar.filter(item => item.permittedIn === true || item.userIn === true))
                } else {
                    toast.success("user is standard member");
                    return setSideBar(adminSideBar.filter(item => item.userIn === true))
                }
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

}

export default BigSidebar