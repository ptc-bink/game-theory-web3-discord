import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";

import Add from "@/public/avatar/add.svg"

import GiveawayCard from "@/pages/components/GiveawayCard";
import Dropdown from "@/pages/components/forms/Dropdown";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import AppContext from "@/providers/AppContext";

import { IGiveaway, IServer, IDropdownListProps } from "@/utils/_type";
import { getGiveaways, getServers, getUserGlobalPermission } from "@/hook";
import { baseURL_back } from "@/utils/_config";

const Dashboard: React.FC<IDashboard> = () => {

    const { isAdmin, giveawayCreated, giveawayEdited, isRemoveEntry, setIsRemoveEntry, setGiveawayEdited, setGiveawayCreated, setServerID } = useContext(AppContext);
    const [middleGiveaways, setMiddleGiveaways] = useState<IGiveaway[]>([]);
    const [userGlobalPermissons, setUserGlobalPermissons] = useState<any>([])
    const [visibleServers, setVisibleServers] = useState<string[]>([]);
    const [giveaways, setGiveaways] = useState<IGiveaway[]>([]);
    const [filterData, setFilterData] = useState<IGiveaway[]>([]);
    const [serverValue, setServerValue] = useState<string>("");
    const [searchInput, setSearchInput] = useState<string>("");
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([])
    const topRef = useRef<HTMLDivElement>(null);

    const mainAction = async (serverID: string) => {
        let tempGiveaways: IGiveaway[] = [];

        const res: any = await getGiveaways(serverID);

        console.log("giveaways ====> ", giveaways);

        if (res.data !== undefined) {
            if (res.data.length > 0) {
                for (const giveaway of res.data) {
                    giveaway.serverData = serverID;
                    tempGiveaways = tempGiveaways.concat(giveaway);
                }
            } else {
                console.log(`No giveaway of this server : ${serverID}`);
            }
        } else {
            return toast.error("Sever error");
        }

        tempGiveaways.sort((a, b) => a.expiry - b.expiry);
        tempGiveaways.reverse();

        setGiveaways(tempGiveaways);
        setMiddleGiveaways(tempGiveaways);
        setFilterData(tempGiveaways);
    }

    const initPermissions = async () => {   
        const userPermission = await getUserGlobalPermission();
        if (userPermission.status === 200) {
            setUserGlobalPermissons(userPermission.data);
            const adminOf = userPermission.data.isAdmin;
            const superAdminOf = userPermission.data.isSuperAdmin;
            const memberOf = userPermission.data.isMember;

            //we now need to concat all the servers the user is admin/superadmin/member of Removing any duplicates
            const allServers = [...adminOf, ...superAdminOf, ...memberOf];
            const uniqueServers = Array.from(new Set(allServers));
            console.log("uniqueServers ====> ", uniqueServers)
            setVisibleServers(uniqueServers);
            return uniqueServers;
        } else {
            toast.error("Error Getting globalPermissons")
        }
        console.log(`==========USER PERMISSIONS SET ===========`)
    }

    const initAction = async () => {
        const tempServer: any = await getServers();
        const uniqueServers = await initPermissions();
        if (tempServer.status == 200) {
            if (Array.isArray(tempServer.data)) {
                if (tempServer.data.length > 0) {

                    const tempServerDropdownList: IDropdownListProps[] = tempServer.data
                        .filter((item: IServer) => uniqueServers.includes(item.guild.id))
                        .map((item: IServer, index: number) => {
                            return { name: item.guild.name, id: item.guild.id };
                        });
                    console.log("visibleServers ====> ", uniqueServers)
                    console.log("tempServerDropdownList ====> ", tempServerDropdownList)
                    setServerDropdownList(tempServerDropdownList);
                } else {
                    toast.error("No server to show")
                }
            } else {
                toast.error("Try again later")
            }
        }
        console.log(`==========SERVERS SET ===========`)
    }

    const filterAction = async () => {
        let tempFilterData: IGiveaway[] = [];

        if (searchInput !== "" && middleGiveaways.length > 0) {
            tempFilterData = middleGiveaways.filter(giveaway =>
                giveaway.title?.toLowerCase().includes(searchInput?.toLowerCase()) ||
                giveaway.messageID?.toLowerCase().includes(searchInput?.toLowerCase()) ||
                giveaway.chain?.toLowerCase().includes(searchInput?.toLowerCase()) ||
                giveaway.type?.toLowerCase().includes(searchInput?.toLowerCase())
            )

            setFilterData(tempFilterData);
        }
    }

    useEffect(() => {

             initPermissions();

             initAction();


    }, []);

    useEffect(() => {

        filterAction();

    }, [searchInput])

    useEffect(() => {
        if (isRemoveEntry) {
            console.log("isRemoveEntry ===============>", isRemoveEntry);
            mainAction(serverValue);
            setIsRemoveEntry(false);
        }
    }, [isRemoveEntry])

    useEffect(() => {

        setServerID(serverValue);

        if (serverValue) {
            mainAction(serverValue);
        } else {
            setFilterData([]);
            toast.success("Please select server")
        }
    }, [serverValue])

    useEffect(() => {
        if (giveawayCreated || giveawayEdited) {
            
            const Setup = async () => {
                await initPermissions();
                await initAction();
            };
    
            Setup();
            setGiveawayCreated(false);
            setGiveawayEdited(false);
        }
    }, [giveawayCreated, giveawayEdited])

    return (
        <div ref={topRef} className="flex flex-col gap-4 p-8 bg-cdark-100">
            <div className="flex flex-col">
                <p className="text-cwhite text-2xl font-semibold md:block hidden">Dashboard</p>
                <div className="items-center w-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-2 gap-4 pt-4 text-sm">
                    <div>
                        <Dropdown
                            dropdownList={serverDropdownList}
                            placeholder="Select Server"
                            className="hover:bg-cdark-100 bg-cdark-200"
                            callback={setServerValue}
                        />
                    </div>
                    <div className="flex w-full text-sm font-normal gap-2">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search giveaway"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        {isAdmin && <Link href="/dashboard/create-giveaway" className="flex justify-between bg-cwhite w-fit items-center rounded-lg outline-none border border-[#EEEEEE] px-[10px] py-3">
                            <Image
                                src={Add}
                                width="16"
                                height="16"
                                alt="add button"
                            />
                            <p className="text-cdark-100 text-sm leading-5 font-medium lg:block hidden">Create Giveaway</p>
                        </Link>}
                    </div>
                </div>
            </div>
            {
                filterData.length > 0 ?
                    <div className="flex flex-col gap-4">
                        {filterData?.map((item, index) => (
                            < GiveawayCard
                                key={index}
                                serverData={item.serverData}
                                giveawayName={item.title}
                                giveawayID={item.messageID}
                                chain={item.chain}
                                avatar={item?.creator?.avatar}
                                title={item.title}
                                entrants={item.entrants}
                                quantity={item.quantity}
                                enterDate={item.chain}
                                timeRemaining={item.expiry}
                                harvested={item.harvested}
                                bidders={item.bidders}
                                winners={item.winners}
                            />
                        ))}
                    </div> :
                    <div className="flex flex-col gap-4 px-3 py-4 min-h-[calc(100vh-280px)] justify-center items-center">
                        <div className="text-cwhite text-2xl leading-8 font-medium text-center w-full">No Giveaway to Show</div>
                    </div>
            }
        </div>
    );
}

export default Dashboard;

interface IDashboard { };