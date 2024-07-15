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
import { getChainList, getGiveaways, getServerRoles, getServers, handleEditGiveaway } from "@/hook";
import { IDropdownListProps, IGiveaway, IServer, IServerRole } from "@/utils/_type";
import { useRouter } from "next/router";

import toast from "react-hot-toast";

const EditGiveaway: React.FC = () => {

    const { setShowCreditCard, setGiveawayCreated, isAdminOfSelectedServer_app, showCreditCard, serverID, selectedGiveawayID, isAdmin } = useContext(AppContext);
    const [serverRoles, setServerRoles] = useState<IServerRole[]>([]);
    const [restrictedRoles, setRestrictedRoles] = useState<IServerRole[]>([]);
    const [initRestrictedRoles, setInitRestrictedRoles] = useState<any>();
    const [tempRestrictedRoles, setTempRestrictedRoles] = useState<IServerRole[]>([]);
    const [tempRequiredRoles, setTempRequiredRoles] = useState<IServerRole[]>([]);
    const [requiredRoles, setReqiuredRoles] = useState<IServerRole[]>([]);
    const [initRequiredRoles, setInitRequiredRoles] = useState<any>();
    const [winningRole, setWinningRole] = useState<IServerRole>();
    const [editableGiveaway, setEditableGiveaway] = useState<IGiveaway>();
    const [serverValue, setServerValue] = useState<string>("");
    const [chainDropdownList, setChainDropdownList] = useState<IDropdownListProps[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [expiresDate, setExpiresDate] = useState<any>();
    const [expiresHour, setExpiresHour] = useState<any>();
    const [expires, setExpires] = useState<any>();
    const [chain, setChain] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [type, setType] = useState<string>("");
    const [requiredAllRoles, setReqiuredAllRoles] = useState<boolean>(false);
    const [price, setPrice] = useState<number>();
    const [links, setLinks] = useState<string>("");
    const [requirements, setRequirements] = useState<string>("");
    const [canHavePrice, setCanHavePrice] = useState<boolean>(false);
    const router = useRouter();

    const initAction = async () => {
        console.log("isAdmin (EDIT GIVEAWAY) ====> ", isAdminOfSelectedServer_app)
        if (!isAdminOfSelectedServer_app) {
            return router.push("/dashboard");
        }
        const tempServer: any = await getServers();

        // Get server list
        if (tempServer.status == 200) {
            if (Array.isArray(tempServer.data)) {
                if (tempServer.data.length > 0) {
                    const tempServerValue = tempServer.data.find((item: IServer) => {
                        if (item.guildID === serverID) {
                            return item
                        }
                    })

                    console.log("tempServerValue ====> ", tempServerValue);

                    if (tempServerValue) {
                        setServerValue(tempServerValue.guild.name)
                    }
                } else {
                    toast.error("No server value");
                    return router.push("/dashboard")
                }
            }
        }

        if (serverID == "") {
            toast.error("No server error");
            return router.push("/dashboard")
        }

        const tempChainList: any = await getChainList(serverID);

        console.log("tempChainList ====>", tempChainList.data);

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

        // Get server roles
        const tempServerRoles: any = await getServerRoles(serverID);
        if (tempServerRoles.status == 200) {
            if (tempServerRoles.data.length > 0) {
                setServerRoles(tempServerRoles.data);
                setTempRequiredRoles(tempServerRoles.data);
                setTempRestrictedRoles(tempServerRoles.data);
            } else {
                toast.error(`No server role to show - ${tempServerRoles.data.message}`)
                //return the user to dashboard
                return router.push("/dashboard")
            }
        } else {
            toast.error(`No server role to show - ${tempServerRoles.data.message}`)
            //return the user to dashboard
            return router.push("/dashboard")
        }

        // Get giveaway list
        const res: any = await getGiveaways(serverID);

        if (res.status == 200) {
            if (res.data.length > 0) {
                const tempEditableGiveaway: IGiveaway = res.data.find((item: IGiveaway) => {
                    if (item.messageID === selectedGiveawayID) {
                        return item
                    }
                })
                if (tempEditableGiveaway) {
                    setEditableGiveaway(tempEditableGiveaway);
                    setTitle(tempEditableGiveaway.title);
                    setDescription(tempEditableGiveaway.description);
                    setChain(tempEditableGiveaway.chain);
                    setQuantity(tempEditableGiveaway.quantity);
                    setPrice(tempEditableGiveaway.price);
                    setReqiuredAllRoles(tempEditableGiveaway.requireAllRoles);
                    console.log("tempEditableGiveaway.required ====> ", tempEditableGiveaway.required);
                    console.log("serverRoles ====> ", tempServerRoles.data);

                    const tempRequiredRoles = tempServerRoles.data?.filter((item: IServerRole) => {
                        return tempEditableGiveaway.required.includes(item.id)
                    })

                    const tempRestrictedRoles = tempServerRoles.data.filter((item: IServerRole) => {
                        return tempEditableGiveaway.restriction.includes(item.id)
                    })

                    const tempWinningRole = tempServerRoles.data.find((item: IServerRole) => {
                        return tempEditableGiveaway.winningRole === item.id
                    })

                    console.log('tempRequiredRoles, tempRestrictedRoles, tempWinningRole ====> ', tempRequiredRoles, tempRestrictedRoles, tempWinningRole);

                    setReqiuredRoles(tempRequiredRoles);
                    setInitRequiredRoles(tempRequiredRoles);
                    setRestrictedRoles(tempRestrictedRoles);
                    setWinningRole(tempWinningRole);

                    console.log("tempEditableGiveaway ====>", tempEditableGiveaway.required);

                    setInitRequiredRoles(new Set(tempEditableGiveaway.required));
                    setInitRestrictedRoles(new Set(tempEditableGiveaway.restriction));

                }

            } else {
                toast.error("No giveaway to show")
            }
        }

        if (tempServerRoles.status == 200) {
            if (tempServerRoles.data.length > 0) {
                setServerRoles(tempServerRoles.data);
                setTempRequiredRoles(tempServerRoles.data);
                setTempRestrictedRoles(tempServerRoles.data);
            } else {
                toast.error("No server role to show")
            }
        }
    }

    const handleRequiredRolesChange = (object: any) => {
        const seleted: string[] = object.target.value.split(",");
        const tempRequiredRoles = serverRoles.filter(item => seleted.includes(item.id));

        console.log("seleted ====>", seleted);


        setInitRequiredRoles(new Set(seleted));
        setReqiuredRoles(tempRequiredRoles)
    }

    const handleRestrictedRolesChange = (object: any) => {
        const seleted: string[] = object.target.value.split(",");
        const tempRestrictedRoles = serverRoles.filter(item => seleted.includes(item.id));

        setInitRestrictedRoles(new Set(seleted));
        setRestrictedRoles(tempRestrictedRoles);
    }

    function handleKeyDown(e: any) {
        if (e.ctrlKey && (e.key === 'b' || e.key === 'i')) {
            e.preventDefault();

            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;
            const selectedText = e.target.value.slice(start, end);
            const wrapper = e.key === 'b' ? '**' : '*';

            const newValue = e.target.value.slice(0, start) + wrapper + selectedText + wrapper + e.target.value.slice(end);

            setDescription(newValue);
        }
    }

    const handleSubmit = async () => {

        if (!title || !description || !expires || !chain || !quantity || !type) {
            return toast.error("Please input all values");
        }

        const data = {
            serverID: serverID,
            // serverID: "1219682506475831446",
            giveawayID: selectedGiveawayID,
            // giveawayID: "1243148624808906802",
            expires: Math.floor(new Date(expiresDate).getTime() / 1000),
            title: title,
            description: description,
            chain: chain,
            type: editableGiveaway?.type as string,
            quantity: quantity,
            price: price ? price : 0,
            requiredRoles: requiredRoles.map(item => item.id),
            restrictedRoles: restrictedRoles.map(item => item.id),
            winningRole: winningRole?.id,
            requiredAllRoles: requiredAllRoles,
            image: editableGiveaway?.creator.avatar,
            links: links,
            requirements: requirements
        }

        const res = await handleEditGiveaway(data);

        if (res) {
            setGiveawayCreated(true);
            toast.success("Updated successfully!")
            router.back();
        }
    }

    const handleCreditCard = () => {
        setShowCreditCard(!showCreditCard);
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

        setExpires(expiresDate + " " + expiresHour);

        if (editableGiveaway?.type === "raffle-free")
            setCanHavePrice(false);
        else
            setCanHavePrice(true);

    }, [expiresDate, expiresHour]);

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
                        <p className="text-cwhite text-2xl font-semibold md:block hidden">Edit Giveaway</p>
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
                <div className="text-cwhite">
                    {serverValue} / {editableGiveaway?.title}
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
                            onKeyDown={handleKeyDown}
                            className="text-cwhite text-start text-sm h-[75px] outline-none font-medium placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
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
                                initValue={editableGiveaway?.chain}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Quantity*</p>
                            <input type="number" placeholder="0" onChange={(e) => setQuantity(e.target.valueAsNumber)} value={quantity} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border border-cgrey-200 bg-cdark-50 rounded-md" />
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
                                selectedKeys={initRestrictedRoles}
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
                                popoverProps={{
                                    classNames: {
                                        base: " rounded-none",
                                        content: "p-0 border border-cgrey-200 text-cwhite bg-cgrey-100 rounded-lg ",
                                    },
                                }}
                                size="lg"
                                selectorIcon={<></>}
                                selectedKeys={initRequiredRoles}
                                onChange={handleRequiredRolesChange}
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
                    {/* Type & Winning role */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Type*</p>
                            <p className="text-cwhite">{serverValue}</p>
                        </div> */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite">Winning Role*</p>
                            <MultiDropdown
                                dropdownList={serverRoles}
                                placeholder="Select winning role"
                                className="hover:bg-cdark-200"
                                callback={setWinningRole}
                                initValue={winningRole?.name}
                            />
                        </div>
                        {/* Price */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-cwhite ">Price*</p>
                            {canHavePrice && <input type="number" step="0.00001" placeholder="0.00001" min="0.00001" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border grey-200grey-200 bg-cdark-50 rounded-md" />}
                            {!canHavePrice && <input type="number" disabled step="0.00001" placeholder="0.00001" min="0.00001" value={price} className="text-cwhite text-sm font-medium outline-none placeholder:text-sm placeholder:font-medium placeholder:text-cgrey-900 px-3 py-[10px] border grey-200grey-200 bg-cdark-50 rounded-md dissabled" />}
                        </div>
                    </div>
                    {/* Required all roles */}
                    <div className="flex gap-2 hover:cursor-pointer w-fit" >
                        <input type="checkbox" onChange={() => setReqiuredAllRoles(!requiredAllRoles)} className="rounded-[4px]" />
                        <p className="text-sm font-normal">Required all roles</p>
                    </div>

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
                    <div onClick={handleSubmit} className="flex justify-center px-8 w-fit py-3 border border-[#EEEEEE] hover:bg-cdark-200 hover:text-cwhite hover:cursor-pointer hover:border-cgrey-200 rounded-lg bg-cwhite text-cdark-100 text-sm leading-4 font-medium">submit</div>
                </div>
            </div>
            {
                showCreditCard &&
                <div className="md:hidden block z-[60] max-h-[calc(100vh-280px)]">
                    <div className="flex fixed overflow-scroll top-0 left-0 w-screen h-screen bg-cdark-50/30 backdrop-blur-sm justify-center items-center">
                        <PreviewCard
                            title={title}
                            description={description}
                            expiry={expires}
                            winningRole={winningRole}
                            chain={chain}
                            type={editableGiveaway?.type as string}
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
                    type={editableGiveaway?.type as string}
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

export default EditGiveaway;