"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";

import ServerCard from "../components/ServerCard";
import Dropdown from "../components/forms/Dropdown"
import SearchBtn from "../components/forms/SearchBtn";
import AddServerModal from "../components/forms/AddServerModal";

import Add from "@/public/avatar/add.svg"
import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Driver from "@/public/avatar/driver.svg"

import AppContext from "../providers/AppContext";
import { approvedDropdownList } from "../utils/_data";
import { IAdminProps, IApprovedServer, IServer, IDropdownListProps } from "../utils/_type";
import { getAdministrationTrustedServers, getGeneralChannelList, getMarketChannelList, getServers } from "../hooks/hook";
import { useRouter } from "next/router";
import BackBtn from "../components/BackBtn";

const Admin: React.FC<IAdminProps> = () => {

    const { addServerModalOpen, isAdmin, serverList, setAddServerModalOpen, setMarketChannelList, setGeneralChannelList } = useContext(AppContext);
    const [searchInput, setSearchInput] = useState<string>("");
    const [server, setServer] = useState<string>("");
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [approvedServerList, setApprovedServerList] = useState<IApprovedServer[]>([]);

    const router = useRouter();

    const initAction = async () => {
        if (serverList.length > 0) {
            const trustedServers: any = await getAdministrationTrustedServers(serverList[0].guildID);

            setApprovedServerList(trustedServers);

            const serverDropdownList: IDropdownListProps[] = serverList.map((item, index) => {
                return { name: item.guild.name, id: item.guild.id }
            })

            if (serverDropdownList.length > 0) {
                setServerDropdownList(serverDropdownList);
            }
        }

        const tempMarketChannelList: any[] = await getMarketChannelList();
        const tempGeneralChannelList: any[] = await getGeneralChannelList();

        if (tempMarketChannelList.length > 0) {
            setMarketChannelList(tempGeneralChannelList);
        }

        if (tempGeneralChannelList.length > 0) {
            setGeneralChannelList(tempGeneralChannelList);
        }

        if (tempMarketChannelList.length > 0) {
            const marketChannelList = tempMarketChannelList.map((item, index) => (
                { name: item.name, id: item.id }
            ))
        }

        if (tempGeneralChannelList.length > 0) {
            const generalChannelList = tempGeneralChannelList.map((item, index) => (
                { name: item.name, id: item.id }
            ))
        }
    }

    useEffect(() => {
        if (!isAdmin) {
            router.back();
            console.log("you should be admin");

        }
        initAction();
    }, [])

    return (
        <div className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <div className="flex gap-6 items-center">
                    <BackBtn />
                    <p className="text-[#FFFFFF] text-2xl font-semibold">Admin</p>
                </div>
                <div className="items-center w-full grid grid-cols-2 gap-4 pt-4 text-sm realtive">
                    <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="select"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServer}
                    />
                    <div className="flex w-full text-sm font-normal">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search servers"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        <button onClick={() => setAddServerModalOpen(true)} className="ml-2 flex justify-between w-fit items-center rounded-lg outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-[10px] py-3">
                            <Image
                                src={Add}
                                width="16"
                                height="16"
                                alt="add button"
                            />
                            <p className="text-cdark-100">Add Server</p>
                        </button>
                    </div>
                    {addServerModalOpen && (
                        <div className="flex fixed top-0 left-0 w-screen h-screen bg-[#141518]/30 backdrop-blur-sm justify-center items-center">
                            <AddServerModal />
                        </div>
                    )}
                </div>
            </div>
            {approvedServerList.length !== 0 ? <div className="grid grid-cols-3 gap-4">
                {approvedServerList?.map((item, index) => (
                    <ServerCard
                        key={index}
                        server={item.server}
                        createdBy={item.createdBy}
                        paymentExpires={item.paymentExpires}
                        marketChannel={item.marketChannel}
                        generalChannel={item.generalChannel}
                    />
                ))}
            </div> : <div className="flex flex-col gap-4 px-3 py-4 min-h-[calc(100vh-280px)] justify-center items-center">
                <Image
                    src={Driver}
                    width="32"
                    height="32"
                    alt="no server to show"
                />
                <div className="flex flex-col w-full text-center justify-center gap-2">
                    <p className="text-2xl font-medium text-[#FFFFFF]">No Server To Show</p>
                    <p className="text-base leading-[18px] font-normal text-[#939393]">Your trusted server will show here</p>
                </div>
            </div>
            }
            {addServerModalOpen && (
                <div className="flex fixed top-0 left-0 w-screen h-screen bg-[#141518]/30 backdrop-blur-sm justify-center items-center">
                    <AddServerModal />
                </div>
            )}

        </div>
    );
}

export default Admin;