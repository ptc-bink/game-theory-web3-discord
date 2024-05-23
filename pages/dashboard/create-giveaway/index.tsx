"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';

import Dropdown from "@/pages/components/forms/Dropdown";
import RoleDropdown from "@/pages/components/forms/RoleDropdown";
import PreviewCard from "@/pages/components/PreviewCard";
import ArrowLeft from "@/public/avatar/arrow-left.svg"
import Preview from "@/public/avatar/eye.svg"

import {
    chainList,
    giveawayTypeList,
    winningRoleList,
    restrictedRolesList,
    requiredRolesList
} from "@/pages/utils/_data";
import { GetAdminof, GetSeverRoles } from "@/pages/hooks/hook";
import { IServerList, IServerRole } from "@/pages/utils/_type";
import { getServerList } from "@/pages/hooks/action";

const CreateGiveaway: React.FC = () => {

    const styles: StylesConfig<DataOption, true> = {
        multiValue: (styles) => ({ ...styles, backgroundColor: '#202125', borderRadius: "10px", fontSize: "15px", padding: "1px 5px 1px 2px", gap: "0px" }),
        multiValueLabel: (styles) => ({ ...styles, color: "#939393" }),
        multiValueRemove: (styles) => ({ ...styles, color: "#939393", ":hover": { color: "#141518" } }),
        control: (styles) => ({ ...styles, backgroundColor: "#141518", border: "1px", borderColor: "#292A2E", borderRadius: "8px", gap: "4px", padding: "10px 0px 10px 0px" }),
        container: (styles) => ({ ...styles, fontSize: "14px" }),
        group: (styles) => ({ ...styles, paddingLeft: "10px" }),
        clearIndicator: (styles) => ({ ...styles, padding: "0px 0px 0px 0px" }),
        indicatorSeparator: (styles) => ({ ...styles, backgroundColor: "transparent" }),
        dropdownIndicator: (styles) => ({ ...styles, padding: "0px 15px 0px 0px" }),
        indicatorsContainer: (styles) => ({ ...styles, alignItems: "start", paddingTop: "5px" }),
        menu: (styles) => ({ ...styles, backgroundColor: "#141518" }),
        menuList: (styles) => ({ ...styles, color: "#FFFFFF", "::part": { ":hover": { color: "black", backgroundColor: "" } }, }),
    };

    const orderOptions = (values: DataOption[]): DataOption[] => { return [...values] };

    const [serverList, setServerList] = useState<IServerList[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [expiresDate, setExpiresDate] = useState<any>("");
    const [chain, setChain] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [type, setType] = useState<string>("");
    const [winningRole, setWinningRole] = useState<string>("");
    const [restrictedRoles, setRestrictedRoles] = useState<any>();
    const [requiredAllRoles, setReqiuredAllRoles] = useState<boolean>(false);
    const [requiredRoles, setReqiuredRoles] = useState<IServerRole>();
    const [price, setPrice] = useState<number>(0.00001);
    const [links, setLinks] = useState<string>("");
    const [requirements, setRequirements] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");
    const [serverRoles, setServerRoles] = useState<IServerRole[]>([]);
    const [showCreditCard, setShowCreditCard] = useState<boolean>(false);

    useEffect(() => {
        const initAction = async () => {
            const serverList = await getServerList();
            setServerList(serverList);
        }

        initAction();
    }, [])

    useEffect(() => {
        const serverValueAction = async () => {
            // const res = await GetSeverRoles(serverValue);
            const res = [
                {
                    "id": "1219682506475831446",
                    "name": "@everyone",
                    "color": "#000000",
                    "position": 0
                },
                {
                    "id": "1219686078135402661",
                    "name": "GiveAway",
                    "color": "#000000",
                    "position": 2
                },
                {
                    "id": "1219686759231782932",
                    "name": "member",
                    "color": "#9b59b6",
                    "position": 4
                },
                {
                    "id": "1219687461798809763",
                    "name": "admin",
                    "color": "#ad1457",
                    "position": 3
                },
                {
                    "id": "1219723324880457748",
                    "name": "Test",
                    "color": "#32ab42",
                    "position": 1
                }
            ]

            setServerRoles(res);
        }

        serverValueAction();
    }, [serverValue])


    // const handleRestrictedRoles = (
    //     newValue: OnChangeValue<DataOption, true>,
    // ) => {
    //     setRestrictedRoles(orderOptions(newValue as DataOption[]));
    // };

    // const handleRequiredRoles = (
    //     newValue: OnChangeValue<DataOption, true>,
    // ) => {
    //     setReqiuredRoles(orderOptions(newValue as DataOption[]));
    // };

    const handleSubmit = () => {
        console.log("handle submit");

    }

    const handleCreditCard = () => {
        setShowCreditCard(!showCreditCard);
    }

    return (
        <div className="p-8 grid md:grid-cols-2 grid-rows-2 gap-8 bg-cdark-100">
            <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-center justify-between">
                    <div className="flex gap-6 items-center">
                        <div className="bg-cdark-200 border cursor-pointer hover:bg-cdark-100 border-cgrey-200 p-3 rounded-lg">
                            <Image
                                src={ArrowLeft}
                                width="24"
                                height="24"
                                alt="arrow left"
                            />
                        </div>
                        <p className="text-[#FFFFFF] text-2xl font-semibold">Create Giveaway</p>
                    </div>
                    <div onClick={handleCreditCard} className="md:hidden block">
                        <Image
                            src={Preview}
                            width="24"
                            height="24"
                            alt="preview"
                        />
                    </div>
                </div>
                <div>
                    <Dropdown
                        dropdownList={serverList}
                        placeholder="Select"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServerValue}
                    />
                </div>
                <div className="flex flex-col gap-3 text-[#FFFFFF]">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Title*</p>
                        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Description*</p>
                        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} value={description} className="text-[#FFFFFF] text-start text-sm h-[65px] outline-none font-medium placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    {/* Expires */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Expires*</p>
                        {/* <div className="grid grid-cols-2 gap-3 w-full"> */}
                        <input type="datetime-local" onChange={(e) => setExpiresDate(e.target.value)} value={expiresDate} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#FFFFFF] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                        {/* <input type="time" placeholder="" onChange={(e) => setExpiresHour(e.target.value)} value={expiresHour} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#FFFFFF] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" /> */}
                        {/* </div> */}
                    </div>
                    {/* Chain & Quantity */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Chain*</p>
                            <Dropdown
                                dropdownList={chainList}
                                placeholder="Ethereum"
                                className="hover:bg-cdark-200 bg-cdark-100"
                                callback={setChain}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Quantity*</p>
                            <input type="number" placeholder="0" onChange={(e) => setQuantity(e.target.valueAsNumber)} value={quantity} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                        </div>
                    </div>
                    {/* Type & Winning role */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Type*</p>
                            <Dropdown
                                dropdownList={giveawayTypeList}
                                placeholder="Raffle"
                                className="hover:bg-cdark-200 bg-cdark-100"
                                callback={setType}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Winning Role*</p>
                            <RoleDropdown
                                dropdownList={serverRoles}
                                placeholder="Select winning role"
                                className="hover:bg-cdark-200"
                                callback={setWinningRole}
                            />
                        </div>
                    </div>
                    {/* Restricted Roles & Required Roles */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Restricted Roles*</p>
                            {/* <div>
                                <Select
                                    value={restrictedRoles}
                                    isMulti
                                    styles={styles}
                                    name="colors"
                                    className="bg-[#141518]"
                                    classNamePrefix=""
                                    onChange={handleRestrictedRoles}
                                    options={restrictedRolesList}
                                />
                            </div> */}
                            <RoleDropdown
                                dropdownList={serverRoles}
                                placeholder="Select winning role"
                                className="hover:bg-cdark-200"
                                callback={setRestrictedRoles}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Required Roles*</p>
                            {/* <div>
                                <Select
                                    value={requiredRoles}
                                    isMulti
                                    styles={styles}
                                    name="colors"
                                    className="bg-[#141518]"
                                    classNamePrefix=""
                                    onChange={handleRequiredRoles}
                                    options={requiredRolesList}
                                />
                            </div> */}
                            <RoleDropdown
                                dropdownList={serverRoles}
                                placeholder="Select winning role"
                                className="hover:bg-cdark-200"
                                callback={setReqiuredRoles}
                            />
                        </div>
                    </div>
                    {/* Required all roles */}
                    <div className="flex gap-2 hover:cursor-pointer w-fit" onClick={(e) => setReqiuredAllRoles(!requiredAllRoles)} >
                        <input type="checkbox" checked={requiredAllRoles} className="rounded-[4px]" />
                        <p className="text-sm font-normal">Required all roles</p>
                    </div>
                    {/* Price */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-[#FFFFFF]">Price*</p>
                        <input type="number" step="0.00001" placeholder="0.00001" min="0.00001" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                    </div>
                    {/* Links & Requirements */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Links</p>
                            <input type="url" placeholder="" value={links} onChange={(e) => setLinks(e.target.value)} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-[#FFFFFF]">Requirements</p>
                            <input type="text" placeholder="" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="text-[#FFFFFF] text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-[#939393] px-3 py-[10px] border border-cgrey-200 bg-[#141518] rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    <div onClick={handleSubmit} className="flex justify-center px-8 w-fit py-3 border border-[#EEEEEE] hover:bg-cdark-200 hover:text-[#FFFFFF] hover:cursor-pointer hover:border-cgrey-200 rounded-lg bg-[#FFFFFF] text-sm leading-4 font-medium">submit</div>
                </div>
            </div>
            {showCreditCard &&
                <div className="">
                    <PreviewCard
                        title={title}
                        description={description}
                        expiry={expiresDate}
                        winningRole={winningRole}
                        chain={chain}
                        quantity={quantity}
                        restricted={restrictedRoles}
                        requirements={requirements}
                        price={price}
                    />
                </div>
            }
            <div className="hidden md:block">
                <PreviewCard
                    title={title}
                    description={description}
                    expiry={expiresDate}
                    winningRole={winningRole}
                    chain={chain}
                    quantity={quantity}
                    restricted={restrictedRoles}
                    requirements={requirements}
                    price={price}
                />
            </div>
        </div >
    );
}

export default CreateGiveaway;

interface DataOption {
    value: string;
    label: string;
}

interface serverRole {
    id: string
    color: string
    name: string
}