"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import JsonView from "react18-json-view";
import toast from "react-hot-toast";
import 'react18-json-view/src/style.css'

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import UserAdd from "@/public/avatar/user-add.svg"

import PermittedUsersModal from "@/pages/components/PermittedUsersModal";
import SearchBtn from "@/pages/components/forms/SearchBtn";
import Dropdown from "@/pages/components/forms/Dropdown";
import AppContext from "@/providers/AppContext";

import { getPermittedusers, getServers } from "@/hook";
import { IDropdownListProps, IPermittedUser, IServer } from "@/utils/_type";

const VESTING: React.FC<IVESTING> = () => {

    const { permittedUserModalOpen, setPermittedUserModalOpen } = useContext(AppContext);
    const [permittedUsers, setPermittedUsers] = useState<IPermittedUser[]>([]);
    const [filterPermittedUsers, setFilterPermittedUsers] = useState<IPermittedUser[]>([]);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [winningRole, setWinningRole] = useState<string>("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");

    const initAction = async () => {
        const tempServerList: IServer[] = await getServers();

        if (tempServerList) {
            if (tempServerList.length > 0) {
                const tempServerDropdownList: IDropdownListProps[] = tempServerList.map((item, index) => {
                    return { name: item.guild.name, id: item.guild.id }
                })

                setServerDropdownList(tempServerDropdownList);

                const tempPermittedUsers: IPermittedUser[] = await getPermittedusers(tempServerList[0].guildID);

                if (tempPermittedUsers && tempPermittedUsers.length > 0) {
                    setPermittedUsers(tempPermittedUsers);
                    setFilterPermittedUsers(tempPermittedUsers);
                } else {
                    toast.error("No permitted user to show")
                }
            }
        }
    }

    const serverAction = async () => {

    }

    const filterAction = async () => {
        if (searchValue !== undefined) {
            if (permittedUsers.length > 0) {
                const tempPermittedUsers: IPermittedUser[] = permittedUsers.filter(permittedUser =>
                    permittedUser.added_by.toLowerCase().includes(searchValue?.toLowerCase()) ||
                    permittedUser.id.toLowerCase().includes(searchValue?.toLowerCase())
                )
                setFilterPermittedUsers(tempPermittedUsers);
            }
        }

        if (serverValue !== "") {
            const tempPermittedUsers: IPermittedUser[] = filterPermittedUsers.filter(filterPermittedUser =>
                filterPermittedUser.added_by.toLowerCase().includes(serverValue)
            )

            setFilterPermittedUsers(tempPermittedUsers);
        }
    }

    const handlePermiitedBtn = async () => {
        if (serverValue == "") {
            return toast.error("Please select server")
        }

        setPermittedUserModalOpen(true)
    }

    useEffect(() => {

        filterAction();

    }, [searchValue, serverValue])

    useEffect(() => {

        initAction();

    }, [])

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex flex-col gap-4">
                <div className="md:block hidden">
                    <div className="flex gap-6 items-center">
                        <div className="bg-cdark-200 border cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
                            <Image
                                src={ArrowLeft}
                                width="24"
                                height="24"
                                alt="arrow left"
                            />
                        </div>
                        <p className="text-cwhite text-2xl font-semibold">Vesting Reports</p>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col gap-4">
                    <Dropdown
                        dropdownList={serverDropdownList}
                        placeholder="Select server"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServerValue}
                    />
                    <div className="flex w-full text-sm font-normal">
                        <div className="flex flex-grow">
                            <SearchBtn
                                placeholder="Search servers"
                                endContent="Refresh"
                                callback={setSearchValue}
                            />
                        </div>
                        <div onClick={handlePermiitedBtn} className="ml-2 cursor-pointer hover:bg-cgrey-900 flex gap-2 justify-between w-fit items-center rounded-lg outline-none bg-cwhite border border-[#EEEEEE] px-[10px] py-3">
                            <Image
                                src={UserAdd}
                                width="16"
                                height="16"
                                alt="user avatar"
                            />
                            <p className="text-cdark-100 text-sm leading-5 font-medium sm:block hidden">Permitted Users</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-2xl border border-cgrey-200 bg-cdark-50 px-2 py-3 text-cwhite text-base font-normal overflow-scroll h-[calc(100vh-280px)]">
                <JsonView className="text-cwhite" src={filterPermittedUsers} theme="winter-is-coming" collapsed={false} />
            </div>
            {permittedUserModalOpen && <PermittedUsersModal />}
        </div>
    );
}

export default VESTING;

interface IVESTING { }