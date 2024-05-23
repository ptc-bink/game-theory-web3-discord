"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

import ArrowLeft from "@/public/avatar/arrow-left.svg"
import { getHarvestWinners } from "@/pages/hooks/action";
// import { jsonFileDownload } from "@/pages/hooks/download";

const HarvestWinners: React.FC<IHarvestWinners> = () => {

    const [harvest, setHarvest] = useState<any>();
    const [formattedData, setFormattedData] = useState<string>("");

    // Helper function to convert array of objects to CSV
    const convertArrayToCSV = (array: any[]): string => {
        const header = Object.keys(array[0]).join(",") + "\n";
        const rows = array.map((obj) => Object.values(obj).join(",")).join("\n");
        return header + rows;
    };

    // Helper function to download file
    const downloadFile = (content: string, fileName: string, contentType: string) => {
        const a = document.createElement("a");
        const file = new Blob([content], { type: contentType });
        a.href = URL.createObjectURL(file);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const initAction = async () => {
        const temp = await getHarvestWinners("");
        setHarvest(temp);
    };

    useEffect(() => {
        initAction();
    }, [])

    const handleCsvBtn = async () => {
        const csvContent = convertArrayToCSV(harvest);

        downloadFile(csvContent, "harvest_winners.csv", "text/csv");
    }

    const handleJsonBtn = () => {
        const jsonContent = JSON.stringify(harvest);

        setFormattedData(jsonContent);
        downloadFile(jsonContent, "harvest_winners.json", "application/json");
    }

    const handleHumanReadableBtn = () => {
        const humanReadableContent = harvest?.map((item: any) => `{ID: ${item.id}, Username: ${item.username}, Wallet: ${item.wallet}}\n`).join("\n");

        setFormattedData(humanReadableContent);
    };

    return (
        <div className="flex flex-col p-8 gap-4">
            <div className="flex justify-between">
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
                        <p className="text-[#FFFFFF] text-2xl font-semibold">Harvest Winners</p>
                    </div>
                </div>
                <div className="flex gap-2 text-[#FFFFFF]">
                    <button className="outline-none bg-[#5865F2] border border-[#5865F2] px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleCsvBtn}>CSV</button>
                    <button className="outline-none bg-[#5865F2] border border-[#5865F2] px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleJsonBtn}>JSON</button>
                    <button className="outline-none bg-[#5865F2] border border-[#5865F2] px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleHumanReadableBtn}>Human Readable</button>
                </div>
            </div>
            <div className="overflow-scroll rounded-2xl border border-cgrey-200 bg-[#141518] text-[#FFFFFF] py-3 pr-2 pl-4 text-base font-normal h-[calc(100vh-220px)]">
                {formattedData}

            </div>
        </div>
    );
}

export default HarvestWinners;

interface IHarvestWinners { }