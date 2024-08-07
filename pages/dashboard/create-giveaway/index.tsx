"use client"

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Select, SelectItem, Chip } from "@nextui-org/react";

import Dropdown from "@/pages/components/forms/Dropdown";
import MultiDropdown from "@/pages/components/forms/MultiDripdown";
import PreviewCard from "@/pages/components/PreviewCard";
import Preview from "@/public/avatar/eye.svg"

import AppContext from "@/providers/AppContext";
import BackBtn from "@/pages/components/BackBtn";
import { getChainList, getGiveaways, getServerRoles, getServers, handleCreateGiveaway } from "@/hook";
import { IDropdownListProps, IGiveaway, IServer, IServerRole } from "@/utils/_type";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { debug } from "console";
import { isObject } from "react18-json-view/dist/utils";

const CreateGiveaway: React.FC = () => {

    const { setShowCreditCard, setGiveawayCreated, showCreditCard, serverID } = useContext(AppContext);
    const [serverList, setServerList] = useState<IServer[]>([])
    const [serverRoles, setServerRoles] = useState<IServerRole[]>([]);
    const [restrictedRoles, setRestrictedRoles] = useState<IServerRole[]>([]);
    const [tempRestrictedRoles, setTempRestrictedRoles] = useState<IServerRole[]>([]);
    const [tempRequiredRoles, setTempRequiredRoles] = useState<IServerRole[]>([]);
    const [requiredRoles, setReqiuredRoles] = useState<IServerRole[]>([]);
    const [winningRole, setWinningRole] = useState<IServerRole>();
    const [giveawayDropdownList, setGiveawayDropdownList] = useState<IDropdownListProps[]>([]);
    const [serverDropdownList, setServerDropdownList] = useState<IDropdownListProps[]>([]);
    const [chainDropdownList, setChainDropdownList] = useState<IDropdownListProps[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [chainList, setChainList] = useState<string[]>([]);
    const [expiresDate, setExpiresDate] = useState<any>();
    const [expiresHour, setExpiresHour] = useState<any>();
    const [expires, setExpires] = useState<any>();
    const [chain, setChain] = useState<string>("");
    const [initServerValue, setInitServerValue] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [type, setType] = useState<string>("");
    const [requiredAllRoles, setReqiuredAllRoles] = useState<boolean>(false);
    const [price, setPrice] = useState<number>();
    const [links, setLinks] = useState<string>("");
    const [requirements, setRequirements] = useState<string>("");
    const [serverValue, setServerValue] = useState<string>("");
    const [canHavePrice, setCanHavePrice] = useState<boolean>(false);
    const router = useRouter();

    const mainAction = async (serverID: string) => {
        const tempChainList: any = await getChainList(serverID);

        if (tempChainList.status == 200) {
            if (tempChainList.data.length > 0) {
                const tempChainDropdownList: IDropdownListProps[] = tempChainList.data?.map((item: string, index: number) => ({
                    name: item,
                    id: item,
                }))
                setChainDropdownList(tempChainDropdownList);
            } else {
                toast.error("No chain list to show")
            }
        }

        const tempServerRoles: any = await getServerRoles(serverID);

        if (tempServerRoles.status == 200) {
            if (tempServerRoles.data.length > 0) {
                setServerRoles(tempServerRoles.data);
                setTempRequiredRoles(tempServerRoles.data);
                setTempRestrictedRoles(tempServerRoles.data)
            } else {
                toast.error("No server role to show")
            }
        }

        const res: any = await getGiveaways(serverID);

        if (res.status == 200) {
            if (res.data.length > 0) {
                const tempGiveawayDropdownList: IDropdownListProps[] = res.data.map((item: IGiveaway, index: number) => ({
                    name: item.type,
                    id: item.messageID,
                }))
                console.log("tempGiveawayDropdownList ----> ", tempGiveawayDropdownList);

                setGiveawayDropdownList(tempGiveawayDropdownList);
            } else {
                toast.error("No giveaway to show")
            }
        }
    }

    const initAction = async () => {
        const tempServer: any = await getServers();

        if (tempServer.status == 200) {
            if (Array.isArray(tempServer.data)) {
                if (tempServer.data.length > 0) {

                    setServerList(tempServer.data);

                    await mainAction(tempServer.data[0].guildID)

                    const serverDropdownList: IDropdownListProps[] = tempServer.data?.map((item: IServer, index: number) => {
                        return { name: item.guild.name, id: item.guild.id }
                    })
                    setServerDropdownList(serverDropdownList);

                    if (serverID) {
                        setInitServerValue(serverDropdownList.filter(item => item.id === serverID)[0].name);
                    }

                } else {
                    toast.error("No server to show");
                }
            }
        } else {
            toast.error("Try again")
        }

        if (serverID) {
            setServerValue(serverID);
        }
        setPrice(0.00);
        setCanHavePrice(false);
        setType("raffle-free");
    }

    const handleRequiredRolesChange = (object: any) => {
        const seleted: string[] = object.target.value.split(",");
        const tempRequiredRoles = serverRoles.filter(item => seleted.includes(item.id));

        setReqiuredRoles(tempRequiredRoles)
    }

    const handleRestrictedRolesChange = (object: any) => {
        const seleted: string[] = object.target.value.split(",");
        const tempRestrictedRoles = serverRoles.filter(item => seleted.includes(item.id));

        setRestrictedRoles(tempRestrictedRoles);
    }

    const handleSubmit = async () => {

        console.log("expires ======>", expires);
        console.log('Math.floor(new Date(expires).getTime() / 1000) :>> ', Math.floor(new Date(expires).getTime() / 1000));
        console.log('Math.floor(new Date(expires).getTime() / 1000) :>> ', typeof (Math.floor(new Date(expires).getTime() / 1000)));
        console.log("title ===>", title);
        console.log("description =====>", description);
        console.log("chain ====>", chain);
        console.log("quantity ===>", quantity);
        console.log("expiresDate ===>", Math.floor(new Date(expiresDate).getTime() / 1000));

        if (!expires || !title || !description || !chain || !quantity) {
            return toast.error("Please input all values");
        }

        if (Math.floor(new Date(expires).getTime() / 1000) < Math.floor(new Date().getTime() / 1000)) {
            return toast.error("Invalid expiry times")
        }

        const data = {
            serverID: serverValue,
            expires: Math.floor(new Date(expires).getTime() / 1000),
            title: title,
            description: description,
            chain: chain,
            type: type,
            quantity: quantity,
            price: price,
            requiredRoles: requiredRoles.map(item => item.id),
            restrictedRoles: restrictedRoles.map(item => item.id),
            winningRole: winningRole,
            requiredAllRoles: requiredAllRoles
        }

        const res = await handleCreateGiveaway(data);

        if (res.status === 200) {
            setGiveawayCreated(true);
            toast.success("Created successfully!");
            router.back();
        } else {
            toast.error("Create giveaway Failed");
        }
    }

    const handleCreditCard = () => {
        setShowCreditCard(!showCreditCard);

    }

    const handleTypeChange = (value: any) => {
        console.log("value ===>", value)
        setType(value);
        if (value === "raffle-free") {
            setPrice(0.00);
            setCanHavePrice(false);
        } else {
            setCanHavePrice(true);
        }

    }

    function handleKeyDown(e: any) {
        if (e.ctrlKey && (e.key === 'b' || e.key === 'i' || e.key === 'u')) {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const wrapper = () => {
                switch (e.key) {
                    case 'b':
                        return '**';
                    case 'i':
                        return '*';
                    case 'u':
                        return '__';
                    default:
                        return '';
                }
            };

            if (start === end) { // No text is selected
                const before = textarea.value.substring(0, start);
                const after = textarea.value.substring(end, textarea.value.length);

                // Update the value with the markdown syntax inserted
                const newValue = `${before}${wrapper()}${wrapper()}${after}`;
                setDescription(newValue); // Assuming setDescription updates the textarea value

                // Use a timeout to ensure the state update has been applied
                setTimeout(() => {
                    // Directly set the cursor position to be inside the markdown syntax
                    textarea.selectionStart = start + wrapper().length;
                    textarea.selectionEnd = start + wrapper().length;
                    textarea.focus(); // Re-focus on the textarea
                }, 0);
            } else {
                // Handle the case where text is selected
                const selectedText = textarea.value.substring(start, end);
                const newValue = `${textarea.value.substring(0, start)}${wrapper()}${selectedText}${wrapper()}${textarea.value.substring(end)}`;
                setDescription(newValue);

                setTimeout(() => {
                    const newCursorPos = start + wrapper().length + selectedText.length + wrapper().length;
                    textarea.selectionStart = newCursorPos;
                    textarea.selectionEnd = newCursorPos;
                    textarea.focus();
                }, 0);
            }
        }
    }

    useEffect(() => {
        initAction();
    }, [])

    useEffect(() => {
        // Initialize the date to current datetime if not already set
        if (!expiresDate) {
            setExpiresDate(new Date().toISOString().slice(0, 10)); // ISO format for datetime-local
        }

        if (!expiresHour) {
            setExpiresHour(new Date().toISOString().slice(11, 16));
        }

        console.log("expiresDate ==>", expiresDate);
        console.log("expiresHour ==>", expiresHour);

        setExpires(expiresDate + "  " + expiresHour)
    }, [expiresDate, expiresHour]);

    useEffect(() => {
        if (serverValue) {
            mainAction(serverValue)
        } else {
            toast.success("Select server");
            setChainDropdownList([]);
            setServerRoles([]);
            setTempRequiredRoles([]);
            setTempRestrictedRoles([]);
            setGiveawayDropdownList([]);
        }
    }, [serverValue])



    const typeDropdownList: IDropdownListProps[] = [
        { name: "raffle-free", id: "raffle-free" },
        { name: "shop", id: "shop" },
        { name: "not used", id: "nan" },
    ]


    useEffect(() => {
        const tRequiredRoles = serverRoles.filter(item => !restrictedRoles.includes(item));
        const tRestrictedRoles = serverRoles.filter(item => !requiredRoles.includes(item));

        setTempRequiredRoles(tRequiredRoles);
        setTempRestrictedRoles(tRestrictedRoles);
    }, [restrictedRoles, requiredRoles])

    return (
        <div className="p-8 grid md:grid-cols-2 grid-cols-1 gap-8 bg-cdark-100 relative">
            <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-center justify-between">
                    <div className="flex gap-6 items-center">
                        <BackBtn />
                        <p className="text-cwhite text-2xl font-semibold md:block hidden">Create Giveaway</p>
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
                        dropdownList={serverDropdownList}
                        placeholder="Select server"
                        className="hover:bg-cdark-100 bg-cdark-200"
                        callback={setServerValue}
                        initValue={initServerValue}
                    />
                </div>
                <div className="flex flex-col gap-3 text-cwhite">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Title*</p>
                        <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} value={title} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                    </div>
                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Description*</p>
                        <textarea
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                            className="text-cwhite text-start text-sm h-[65px] outline-none font-medium placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md"
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    {/* Expires */}
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-normal text-cwhite">Expires*</p>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <input type="date" onChange={(e) => setExpiresDate(e.target.value)} value={expiresDate} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cwhite px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" suppressContentEditableWarning={true} />
                            <input type="time" onChange={(e) => setExpiresHour(e.target.value)} value={expiresHour} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cwhite px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                        </div>
                    </div>
                    {/* Chain & Quantity */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Chain*</p>
                            <Dropdown
                                dropdownList={chainDropdownList}
                                placeholder="Select chain"
                                className="hover:bg-cdark-200 bg-cdark-100"
                                callback={setChain}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Quantity*</p>
                            <input type="number" placeholder="0" onChange={(e) => setQuantity(e.target.valueAsNumber)} value={quantity} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                        </div>
                    </div>
                    {/* Type & Winning role */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Type*</p>
                            <Dropdown
                                dropdownList={typeDropdownList}
                                placeholder="Select type"
                                className="hover:bg-cdark-200 bg-cdark-100"
                                callback={handleTypeChange}
                                initValue={type ? type : "raffle-free"}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Winning Role*</p>
                            <MultiDropdown
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
                            <p className="text-sm font-normal text-cwhite">Restricted Roles*</p>
                            <Select
                                placeholder="Select ..."
                                selectionMode="multiple"
                                className="rounded-lg"
                                classNames={{
                                    trigger: "bg-cdark-100 px-0 border-cgrey-200 border rounded-lg",
                                    innerWrapper: "px-4 py-3",
                                }}
                                listboxProps={{
                                    itemClasses: {
                                        base: [
                                            "rounded-none"
                                        ],
                                    }
                                }}
                                popoverProps={{
                                    classNames: {
                                        base: " rounded-none",
                                        content: "p-0 border border-cgrey-200 text-cwhite bg-cgrey-100 rounded-lg ",
                                    },
                                }}
                                size="lg"
                                selectorIcon={<></>}
                                isMultiline={true}
                                radius="sm"
                                onChange={handleRestrictedRolesChange}
                                renderValue={(items) => {
                                    return (
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item) => (
                                                <Chip key={item.key}>{"@" + item.textValue}</Chip>
                                            ))}
                                        </div>
                                    );
                                }}
                            >
                                {tempRestrictedRoles.map((item) => (
                                    <SelectItem key={item.id} value={item.id} className=" border rounded border-cgrey-100" style={{ backgroundColor: `${item.color}` }}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Required Roles*</p>
                            <Select
                                placeholder="Select ..."
                                selectionMode="multiple"
                                className="rounded-lg "
                                classNames={{
                                    trigger: "bg-cdark-100 px-0 border-cgrey-200 border rounded-lg",
                                    innerWrapper: "px-4 py-3"
                                }}
                                listboxProps={{
                                    itemClasses: {
                                        base: [
                                            "rounded-none"
                                        ],
                                    }
                                }}
                                onChange={handleRequiredRolesChange}
                                popoverProps={{
                                    classNames: {
                                        base: " rounded-none",
                                        content: "p-0 border border-cgrey-200 text-cwhite bg-cgrey-100 rounded-lg ",
                                    },
                                }}
                                size="lg"
                                selectorIcon={<></>}
                                isMultiline={true}
                                radius="sm"
                                renderValue={(items) => {
                                    return (
                                        <div className="flex flex-wrap  gap-2">
                                            {items.map((item) => (
                                                <Chip key={item.key}>{"@" + item.textValue}</Chip>
                                            ))}
                                        </div>
                                    );
                                }}
                            >
                                {/* {serverRoles.map((item) => ( */}
                                {tempRequiredRoles.map((item) => (
                                    <SelectItem key={item.id} value={item.id} className="border rounded border-cgrey-100" style={{ backgroundColor: `${item.color}` }}>
                                        {item.name}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    {/* Required all roles */}
                    <div className="flex gap-2 hover:cursor-pointer w-fit" >
                        <input type="checkbox" onChange={() => setReqiuredAllRoles(!requiredAllRoles)} className="rounded-[4px]" />
                        <p className="text-sm font-normal">Required all roles</p>
                    </div>
                    {/* Price */}
                    {canHavePrice ? (
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Price*</p>
                            <input
                                type="number"

                                placeholder="0.00001"
                                min="0.00001"
                                value={price}
                                onChange={(e) => setPrice(e.target.valueAsNumber)}
                                className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md"
                            />
                        </div>
                    ) : (
                        <></>
                    )}
                    {/* Links & Requirements */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Links*</p>
                            <input type="url" placeholder="" value={links} onChange={(e) => setLinks(e.target.value)} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Requirements*</p>
                            <input type="text" placeholder="" value={requirements} onChange={(e) => setRequirements(e.target.value)} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
                        </div>
                    </div>
                </div>
                <div className="flex w-full justify-end">
                    <div onClick={handleSubmit} className="flex justify-center px-8 w-fit py-3 border border-[#EEEEEE] hover:bg-cdark-200 hover:text-cwhite hover:cursor-pointer hover:border-cgrey-200 rounded-lg bg-cwhite text-cgrey-200 text-sm leading-4 font-medium">submit</div>
                </div>
            </div>
            {showCreditCard &&
                <div className="md:hidden block z-[60] max-h-[calc(100vh-280px)]">
                    <div className="flex fixed overflow-scroll top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                        <PreviewCard
                            title={title}
                            description={description}
                            expiry={expires}
                            winningRole={winningRole}
                            chain={chain}
                            type={type}
                            requiredAllRoles={requiredAllRoles}
                            quantity={quantity}
                            required={requiredRoles}
                            restricted={restrictedRoles}
                            requirements={requirements}
                            links={links}
                            price={price}
                        />
                    </div>
                </div>
            }
            <div className="hidden md:block">
                <PreviewCard
                    title={title}
                    description={description}
                    expiry={expires}
                    winningRole={winningRole}
                    chain={chain}
                    type={type}
                    requiredAllRoles={requiredAllRoles}
                    links={links}
                    quantity={quantity}
                    restricted={restrictedRoles}
                    required={requiredRoles}
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