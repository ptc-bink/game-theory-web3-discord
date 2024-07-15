"use client"

import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/router";

import ServerCard from "../components/ServerCard";
import Dropdown from "../components/forms/Dropdown"
import SearchBtn from "../components/forms/SearchBtn";
import AddServerModal from "../components/forms/AddServerModal";

import Add from "@/public/avatar/add.svg"
import Driver from "@/public/avatar/driver.svg"

import AppContext from "@/providers/AppContext";
import { IAdminProps, IServer, IDropdownListProps, IAdministrationTrustedServers, IChannel } from "@/utils/_type";
import { addServer, administrationChannellist, getAdministrationTrustedServers, getServers } from "@/hook";
import BackBtn from "../components/BackBtn";


const Admin: React.FC<IAdminProps> = () => {

    const { addServerModalOpen, isAdmin, setServerID, setAddServerModalOpen, } = useContext(AppContext);
    const [searchInput, setSearchInput] = useState<string>("");
    const [server, setServer] = useState<string>("");
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [approvedServerList, setApprovedServerList] = useState<IAdministrationTrustedServers[]>([]);
    const [filterApprovedServerList, setFilterApprovedServerList] = useState<IAdministrationTrustedServers[]>([]);
    const router = useRouter();

    const handleAddBtn = async () => {
        if (server == "") {
            return toast.error("Please select server")
        }

        setServerID(server);
        setAddServerModalOpen(true);
    }

    const mainAction = async (serverID: string) => {




    }

    const initAction = async () => {

        
        
            

        const tempData: any = await getAdministrationTrustedServers();
        let tempTrustedServers: IAdministrationTrustedServers[] = [];
        console.log("tempData (main) ====> ", tempData)
        if (tempData.status == 200) {
            tempTrustedServers = Object.keys(tempData.data).map((key) => {
                return {
                    id: key,
                    serverID: key,
                    data: tempData.data[key],
                    channelList: []
                }
            })
        }
        tempTrustedServers.forEach(async server => {
            if (server.data.owner) {
                const res: any = await administrationChannellist(server.id);
                let tempChannelList: IChannel[] = [];
        
                if (res.status == 200) {
                    if (res.data.length > 0) {
                        tempChannelList = res.data;
                    }
                }else{
                    toast.error(`No channel to show for ${server.data.name} server`);
                }
                server.channelList = tempChannelList;
            }else{
                toast.error(`No owner to show for ${server.data.name} server`);
            }
            
        });


        console.log("tempTrustedServers ====> ", tempTrustedServers);

        setApprovedServerList(tempTrustedServers);
        setFilterApprovedServerList(tempTrustedServers);

        const tempServerList: any = await getServers();
        console.log("tempServerList ====> ", tempServerList)
        if (tempServerList.status === 200) {
            if (tempServerList.data.length > 0) {

                const tempServerDropdownList: IDropdownListProps[] = tempServerList.data
                    .filter((item: IServer) => !tempTrustedServers.some(server => server.serverID === item.guild.id))
                    .map((item: IServer, index: number) => {
                        return { name: item.guild.name, id: item.guild.id };
                    });

                setServerDropdownList(tempServerDropdownList);
                toast.success(`You have ${tempServerDropdownList.length} server(s) waiting to be added to the trusted server list`)
            } else {
                toast.error("No server to show");
            }
        
        
        }


    }

    const filterAction = () => {

        if (searchInput !== undefined && approvedServerList.length > 0) {
            {
                const tempFilterApprovedServerList = approvedServerList.filter(item =>
                    item.data.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                    item.data.admin.id.toLowerCase().includes(searchInput.toLowerCase())
                )

                setFilterApprovedServerList(tempFilterApprovedServerList);
            }
        }
    };

    useEffect(() => {
        filterAction();

    }, [searchInput])

    useEffect(() => {
        if (server) {
            mainAction(server);
        } else {
            setApprovedServerList([]);
            setFilterApprovedServerList([])
            toast.success("Please select server")
        }
    }, [server])

    useEffect(() => {
        if (!isAdmin) {
            toast.error("You should be admin");
            router.back();
        }
        initAction();
    }, [])

    return (
        <div className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <div className="hidden md:block">
                    <div className=" flex gap-6 items-center">
                        <BackBtn />
                        <p className="text-cwhite text-2xl font-semibold">Approved Servers</p>
                    </div>
                </div>
                <div className="items-center w-full grid lg:grid-cols-2 grid-cols-1 gap-4 pt-4 text-sm realtive">
                    <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="Select server"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServer}
                    // initValue={}
                    />
                    <div className="flex w-full text-sm font-normal gap-2">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search servers"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        <div aria-label="add server" onClick={handleAddBtn} className=" flex justify-between w-fit items-center rounded-lg hover:bg-cgrey-900 hover:border-cdark-100 hover:cursor-pointer outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-2">
                            <Image
                                src={Add}
                                width="16"
                                height="16"
                                alt="add button"
                            />
                            <p className="text-cdark-100 text-sm leading-5 font-medium sm:block hidden">Add Server</p>
                        </div>
                    </div>
                    {addServerModalOpen && (
                        <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                            <AddServerModal />
                        </div>
                    )}
                    {addServerModalOpen && (
                        <div className="fixed top-0 z-[50] left-0 h-screen w-screen bg-[transparent]" onClick={() => setAddServerModalOpen(false)}></div>
                    )}
                </div>
            </div>
            {filterApprovedServerList.length > 0 ? <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
                {filterApprovedServerList.map((item: IAdministrationTrustedServers, index: number) => (
                    <ServerCard
                        key={index}
                        index={index + 1}
                        id={item.id}
                        rediskey={item.data.redisKey}
                        name={item.data.name}
                        createdBy={item.data.owner?.displayName}
                        serverImg={item.data.serverImage}
                        adminImg={item.data.owner?.displayAvatarURL}
                        paymentExpires={item.data.paymentExpires}
                        marketChannel={item.data.Market_Channel_ID}
                        submitWallet={item.data.Submit_Wallet_ID}
                        vestingChannel={item.data.Vesting_Channel_ID}
                        reminderChannel={item.data.Reminder_Channel_ID}
                        winnersChannel={item.data.Winners_Channel_ID}
                        generalChannel={item.data.General_Channel_ID}
                        channelList={item.channelList}
                    />
                ))}
            </div> : <div className="flex flex-col gap-4 px-3 py-4 min-h-[calc(100vh-280px)] justify-center items-center">
                <Image
                    src={Driver}
                    width="32"
                    height="32"
                    alt="no server to show"
                />
                <div className="z-[60] flex flex-col w-full text-center justify-center gap-2">
                    <p className="text-2xl font-medium text-cwhite">No Server To Show</p>
                    <p className="text-base leading-[18px] font-normal text-cgrey-900">Your trusted server will show here</p>
                </div>
            </div>
            }
            {addServerModalOpen && (
                <div className="z-[60] flex fixed top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                    <AddServerModal />
                </div>
            )}

        </div>
    );
}

export default Admin;