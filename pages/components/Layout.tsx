"use client"

import { useContext, useState } from 'react';
import { getSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";
import { Session } from 'next-auth';
import toast from 'react-hot-toast';

import AppContext from '../../providers/AppContext';
import SmallSidebar from './SmallSidebar';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import { adminCheck } from '@/hook';

const Layout = ({ children }: { children: ReactNode }) => {

    const { setUserImage, setUsername, setUserID, setIsAdmin, isLoading } = useContext(AppContext);
    const router = useRouter();

    const [session, setSession] = useState<Session>();

    const initAction = async () => {

        setSession(session || undefined);
        setUsername(session?.user?.name || "");
        setUserImage(session?.user?.image || "");
        setUserID(session?.id || "");
    }

    useEffect(() => {
        initAction()
    }, [])

    return (
        <div>
            <div className="bg-cgrey-100 min-h-screen relative">
                <div className="sticky top-0 z-50">
                    <Navbar />
                </div>
                <div className="flex">
                    <div className="md:block hidden bg-[#1D1E22]">
                        <BigSidebar />
                    </div>
                    <div className="w-full bg-cdark-100 min-h-[calc(100vh-88px)]">
                        {children}
                    </div>
                </div>
                <div className="md:hidden block sticky bottom-0">
                    <SmallSidebar />
                </div>
            </div>
        </div>
    );
};

export default Layout;


