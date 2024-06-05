"use client"

import { useContext, useState } from 'react';
import { ReactNode, useEffect } from 'react';
import { useRouter } from "next/router";

import AppContext from '../../providers/AppContext';
import SmallSidebar from './SmallSidebar';
import BigSidebar from './BigSidebar';
import Navbar from './Navbar';
import { adminCheck, getUser } from '@/hook';
import { IUserInfo } from '@/utils/_type';

const Layout = ({ children }: { children: ReactNode }) => {

    const { setUserImage, setUsername, setUserID, setIsAdmin, isLoading } = useContext(AppContext);
    const router = useRouter();

    const initAction = async () => {
        const user: IUserInfo = await getUser();
        // const isAdmin = await adminCheck();

        console.log("user ===>", user);


        setUserID(user.id);
        setUserImage(user.avatar);
        setUsername(user.username);
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


