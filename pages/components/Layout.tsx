"use client"

import { useContext, useState } from 'react';

import BigSidebar from './BigSidebar';
import SmallSidebar from './SmallSidebar';
import Navbar from './Navbar';
import { ReactNode, useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from "next/router";

import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import { escape } from 'querystring';
import AppContext from '../providers/AppContext';
import { adminCheck } from '../hooks/action';

const Layout = ({ children }: { children: ReactNode }) => {

    const { setUserImage, setUsername, setIsAdmin } = useContext(AppContext);
    const router = useRouter();
    const path = usePathname();

    const [session, setSession] = useState<Session>();

    const initAction = async () => {
        const session = await getSession();
        const tempIsAdmin = await adminCheck();

        if (session) {
            setSession(session);
            setUsername(session.user.name);
            setUserImage(session.user.image)
        }

        setIsAdmin(tempIsAdmin);
    }

    const sessionAction = async () => {
        if (session) {
            router.push(`/dashboard`);
        } else
            router.push('/');
    }

    const pathAction = async () => {

    }

    useEffect(() => {
        initAction()
    }, [])

    useEffect(() => {
        sessionAction()
    }, [session])

    useEffect(() => {
        pathAction()
    }, [path])

    return (
        <div className="bg-cgrey-100 min-h-screen relative">
            {session && <div className="sticky top-0 z-50">
                <Navbar />
            </div>}
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
    );
};

export default Layout;


