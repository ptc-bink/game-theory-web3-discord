"use client"

import { useContext, useState } from 'react';
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';

import AppContext from '../../providers/AppContext';
import SmallSidebar from './SmallSidebar';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import { getUser } from '@/hook';
import { IUserInfo } from '@/utils/_type';

import Arrowleft from "@/public/avatar/arrow-up.svg"

const Layout = ({ children }: { children: ReactNode }) => {

    const { setUserImage, setUsername, setUserID, isLoading } = useContext(AppContext);
    const router = useRouter();
    const path = usePathname()

    const initAction = async () => {

        const tempUser: any = await getUser();

        if (tempUser.status === 401) {
            if (path !== "/") {
                toast.error(tempUser.data);
            }
            return router.push("/")
        } else if (tempUser.status === 200) {
            setUserID(tempUser.data.id);
            setUserImage(tempUser.data.avatar);
            setUsername(tempUser.data.username);
        }
    }

    useEffect(() => {
        initAction()
    }, [])

    return (
        <div>
            <div className="bg-cgrey-100 min-h-screen">
                <div className="sticky top-0 z-50">
                    <Navbar />
                </div>
                <div className="flex overflow-scroll">
                    <div className="md:block hidden bg-[#1D1E22] ">
                        <BigSidebar />
                    </div>
                    <div className="w-full bg-cdark-100">
                        {children}
                    </div>
                </div>
                <div className="md:hidden block sticky max-h-[calc(100vh-81px)] bottom-0">
                    <SmallSidebar />
                </div>
                <div className='fixed bottom-10 right-[10px] w-fit z-50'>
                    <div onClick={() => window.scroll({ top: 0, behavior: 'smooth' })} className="bg-cdark-200 border hover:cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
                        <Image
                            src={Arrowleft}
                            width="24"
                            height="24"
                            alt="arrow left"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;


