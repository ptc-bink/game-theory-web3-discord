"use client"

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import Driver from "@/public/avatar/driver.svg"
import Add from "@/public/avatar/add.svg"

import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "../components/forms/Dropdown";
import Table from "@/pages/components/forms/Table";
import { getAllocation, getAllocationForVesting, getServers, getUserGlobalPermission } from "@/hook";
import { IAllocation, IDropdownListProps, IServer } from "@/utils/_type";
import AppContext from "@/providers/AppContext";
import BackBtn from "../components/BackBtn";
import toast from "react-hot-toast";
import AddAllocationModal from "../components/forms/AddAllocation";

const Allocation: React.FC<IAllocationProps> = () => {

    const {allocationCreated, isAdminOfSelectedServer_app,addAllocationModalOpen, allocationEdited, userGlobalPermission,setAllocationCreated, setAllocationEdited, setAddAllocationModalOpen, setUserGlobalPermission } = useContext(AppContext)
    const [searchInput, setSearchInput] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");
    const [userGlobalPermissons, setUserGlobalPermissons] = useState<any>([])
    const [visibleServers, setVisibleServers] = useState<string[]>([]);
    const [allocations, setAllocations] = useState<IAllocation[]>([]);
    const [filterAllocations, setFilterAllocations] = useState<IAllocation[]>([]);
    const [filterMiddleAllocations, setFilterMiddleAllocations] = useState<IAllocation[]>([]);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [isAdminOfSelectedServer, setIsAdminOfSelectedServer] = useState<boolean>(false);
    const [allocationForVesting, setAllocationForVesting] = useState<any>();

    async function checkUserPermissionsToServer(serverID: string) {
        const adminOf = userGlobalPermissons.isAdmin;
        const superAdminOf = userGlobalPermissons.isSuperAdmin;

        if (adminOf.includes(serverID) || superAdminOf.includes(serverID)) {
            setIsAdminOfSelectedServer(true);
        } else {
            setIsAdminOfSelectedServer(false);
        }
    }
    
    const mainAction = async (serverID: string) => {
        checkUserPermissionsToServer(serverID);

        const tempAllocationForVesting = await getAllocationForVesting(serverID);

        if (tempAllocationForVesting.status === 200) {
            setAllocationForVesting(tempAllocationForVesting.data);
        } else {
            toast.error("No allocation ready for vesting");
        }

        let tempAllocations: IAllocation[] = [];
        checkUserPermissionsToServer(serverID);
        const res: any = await getAllocation(serverID);

        if (res.status === 200 && Array.isArray(res.data) && res.data.length > 0) {
            tempAllocations = res.data;
        }

        setAllocations(tempAllocations);
        setFilterAllocations(tempAllocations);
        setFilterMiddleAllocations(tempAllocations)
    }

    const initPermissions = async () => {
        if (!userGlobalPermission) {
            let tempUserGlobalPermission = await getUserGlobalPermission()
            setUserGlobalPermissons(tempUserGlobalPermission.data);
            console.log("tempUserGlobalPermission ===> ", tempUserGlobalPermission.data)
            const adminOf = tempUserGlobalPermission.data.isAdmin;
            const superAdminOf = tempUserGlobalPermission.data.isSuperAdmin;


            //stop changing this please it needs to combine arrays. 
            const allServers = [...adminOf, ...superAdminOf];
            const uniqueServers = Array.from(new Set(allServers));

            setVisibleServers(uniqueServers);
            console.log("uniqueServers ===> ", uniqueServers)

            return uniqueServers;
        } else {
            const adminOf = userGlobalPermission?.isAdmin;
            const superAdminOf = userGlobalPermission?.isSuperAdmin;


            const allServers = [...adminOf, ...superAdminOf];
            const uniqueServers = Array.from(new Set(allServers));

            setVisibleServers(uniqueServers);
            console.log("uniqueServers ===> ", uniqueServers)


            return uniqueServers;
        }

    }



    const initAction = async () => {

        const tempServer: any = await getServers();
        const tempUserGlobalPermission = await getUserGlobalPermission();

        setUserGlobalPermissons(tempUserGlobalPermission.data);
        setUserGlobalPermission(tempUserGlobalPermission.data);

        console.log("tempServer.data ===> ", tempServer.data);

        const uniqueServers = await initPermissions();
        if (tempServer.status == 200) {
            if (Array.isArray(tempServer.data)) {
                if (tempServer.data.length > 0) {
                    const tempServerDropdownList: IDropdownListProps[] = tempServer.data
                        .filter((item: IServer) => uniqueServers?.includes(item.guild.id))
                        .map((item: IServer, index: number) => {
                            return { name: item.guild.name, id: item.guild.id };
                        });

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




    const searchFilterAction = async () => {
        let tempAllocations: IAllocation[] = [];

        if (searchInput !== "") {
            if (allocations.length > 0) {
                tempAllocations = allocations.filter(allocation =>
                    allocation.title?.toLowerCase().includes(searchInput.toLowerCase()) ||
                    allocation.id?.toString().includes(searchInput.toLowerCase()) ||
                    allocation.role?.toString().includes(searchInput.toLowerCase())
                )
                setFilterMiddleAllocations(tempAllocations);
            }
        } else {
            tempAllocations = allocations;
        }

        setFilterAllocations(tempAllocations);
    }

    const handleAddBtn = async () => {
        setAddAllocationModalOpen(true);
    }

    useEffect(() => {
        initAction();
    }, [])
    useEffect(() => {
        if (allocationCreated) {
            mainAction(serverValue)
            setAllocationCreated(false);
        }
    }, [allocationCreated])

    useEffect(() => {
        if (serverValue) {
            mainAction(serverValue);
        } else {
            setAllocations([]);
            setFilterAllocations([]);
            setFilterMiddleAllocations([])
            toast.success("Please select server")
        }
    }, [serverValue])

    useEffect(() => {
        searchFilterAction();
    }, [searchInput])

    useEffect(() => {
        if (allocationEdited) {
            mainAction(serverValue)
            setAllocationEdited(false);
        }
    }, [allocationEdited])

    return (
        <div className="flex flex-col p-8 gap-4 h-full">
            <div className="flex flex-col">
                <div className="md:block hidden">
                    <div className="flex gap-6 items-center">
                        <BackBtn />
                        <p className="text-cwhite text-2xl font-semibold">Allocations</p>
                    </div>
                </div>
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
                                placeholder="Search Allocation"
                                endContent="Refresh"
                                callback={setSearchInput}
                            />
                        </div>
                        {isAdminOfSelectedServer ?
                            <div aria-label="add allocation" onClick={handleAddBtn} className=" flex justify-between w-fit items-center rounded-lg hover:bg-cgrey-900 hover:border-cdark-100 hover:cursor-pointer outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-2">
                                <Image
                                    src={Add}
                                    width="16"
                                    height="16"
                                    alt="add button"
                                />
                                <p className="text-cdark-100 text-sm leading-5 font-medium sm:block hidden">Add Allocation</p>
                            </div>
                            : <> </>
                        }
                    </div>
                </div>
            </div>
            {filterAllocations.length > 0 ? <div className="flex justify-center">
                <Table allocations={filterAllocations} />
            </div> : <div className="h-full flex justify-center items-center">
                <div className="flex flex-col w-fit gap-4 px-3 py-4 justify-center items-center">
                    <Image
                        src={Driver}
                        width="32"
                        height="32"
                        alt="no server to show"
                    />
                    <div className="flex flex-col w-full text-center justify-center gap-2">
                        <p className="text-2xl text-center font-medium text-cwhite">No Allocations To Show</p>
                    </div>
                </div>
            </div>
            }
            {addAllocationModalOpen &&
                <div className="flex fixed z-[60] top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                    <AddAllocationModal serverID={serverValue} />
                </div>
            }
        </div>
    );
}

export default Allocation;

interface IAllocationProps { }