'use client'

import React, { useContext, useState } from "react";
import Image from "next/image";

import Add from "@/public/avatar/add.svg"
import Cancel from "@/public/avatar/close-circle.svg"

import Dropdown from "./forms/Dropdown";
import SearchBtn from "./forms/SearchBtn";
import Modal from "./forms/AddServerModal";
import AppContext from "../providers/AppContext";

const PageForm: React.FC<PageFormProps> = ({ dropdownList, placeholder, endContent, endContentImg, addBtnContent }) => {

    const { addServerModalOpen, setAddServerModalOpen } = useContext(AppContext);

    return (
        <div className="items-center w-full grid grid-cols-2 gap-4 pt-4 text-sm realtive">
            {/* <Dropdown
                dropdownList={dropdownList}
                placeholder="select"
                callback={ad}
                className="hover:bg-cdark-100 bg-cdark-200"
            /> */}
            <div className="flex w-full text-sm font-normal">
                <SearchBtn
                    placeholder={placeholder}
                    endContent={endContent}
                    endContentImg={endContentImg}
                />
                <button onClick={() => setAddServerModalOpen(true)} className="ml-2 flex justify-between w-fit items-center rounded-lg outline-none bg-[#FFFFFF] border border-[#EEEEEE] px-[10px] py-3">
                    <Image
                        src={Add}
                        width="16"
                        height="16"
                        alt="add button"
                    />
                    <p className="text-cdark-100">{addBtnContent}</p>
                </button>
            </div>
            {addServerModalOpen && (
                <div className="flex fixed top-0 left-0 w-screen h-screen bg-[#141518]/30 backdrop-blur-sm justify-center items-center">
                    <Modal />
                </div>
            )}
        </div>
    )
}

export default PageForm;

interface PageFormProps {
    dropdownList: string[]
    placeholder: string
    endContent: string
    endContentImg: any
    addBtnContent: string
}