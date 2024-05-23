"use client";

import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import ProfileModal from "./forms/ProfileModal";
import AppContext from "../providers/AppContext";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import { firUppercase } from "../utils/utils";
import { useRouter } from "next/router";

const Navbar = () => {

    const path = usePathname();
    const { data: session } = useSession();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
    const [userImage, setUserImage] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [temp, setTemp] = useState<string>("dashboard");
    const { profileModalOpen, serverID, userID, setProfileModalOpen } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
        if (session) {
            setUserImage(session?.user?.image || "");
            setUsername(session?.user?.name || "");
        } else {
            router.push('/')
        }
    }, [session])

    const handleProfileModalOpen = () => {
        setProfileModalOpen(true);
    }

    useEffect(() => {
        if (path) {
            // setTemp("temp")
            setTemp(firUppercase(path?.split("/")[1]));
        }
    }, [path])

    return (
        <div className="flex justify-between items-center px-8 py-4 w-full bg-cgrey-100">
            <div className="md:block hidden">
                <div className="flex">
                    <Logo />
                    <div className="flex items-center">
                        <p className="pl-4 text-2xl leading-8 font-semibold text-[#FFFFFF] text-center items-center">
                            Bot GIB
                        </p>
                    </div>
                </div>
            </div>
            <div className="md:hidden block text-2xl leading-8 font-semibold text-[#FFFFFF]">
                {temp}
            </div>
            <div className="flex justify-center items-center relative" >
                <div className="flex justify-center items-center hover:cursor-pointer" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                    <img src={userImage} alt="user avatar" className="rounded-full border-[1.5px] border-cgrey-200" width={40} height={40} />
                    <p className="px-3 hover:underline text-[#FFFFFF] text-base font-semibold md:block hidden">{firUppercase(username)}</p>
                </div>
                {profileDropdownOpen && (
                    <div className="flex flex-col right-0 absolute border border-[#292A2E] rounded-lg bg-[#1D1E22] top-[50px] w-[150px] items-end">
                        <div className="px-3 py-[6px] w-full hover:cursor-pointer hover:bg-[#141518] text-[#FFFFFF] border border-[#292A2E] text-base leading-6 font-" onClick={() => signOut()}>Log out</div>
                        <div className="px-3 py-[6px] w-full hover:cursor-pointer hover:bg-[#141518] text-[#FFFFFF] border border-[#292A2E] text-base leading-6 font-" onClick={handleProfileModalOpen}>User Details</div>
                    </div>
                )}
            </div>
            {profileModalOpen && (
                <div className="flex fixed top-0 left-0 w-screen h-screen bg-[#141518]/30 backdrop-blur-sm justify-center items-center">
                    <ProfileModal />
                </div>
            )}
        </div>
    );
};

export default Navbar;
