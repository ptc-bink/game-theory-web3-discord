"use client"

import React, { useContext, useEffect, useState } from "react";

import BackBtn from "@/pages/components/BackBtn";
import { getHarvestWinners, getServers } from "@/hook";
import JsonView from "react18-json-view";
import toast from "react-hot-toast";
import AppContext from "@/providers/AppContext";
import { useRouter } from "next/router";

// import { jsonFileDownload } from "@/download";

const HarvestWinners: React.FC<IHarvestWinners> = () => {

    const { selectedGiveawayID, serverID } = useContext(AppContext);
    const [harvest, setHarvest] = useState<any>();
    const [formattedData, setFormattedData] = useState<string>("");
    const router = useRouter();

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
        if (!serverID || !selectedGiveawayID) {
            toast.error("Invalid IDs")
            return router.back();
        }

        const tempHarvestWinners: any = await getHarvestWinners(serverID, selectedGiveawayID);

        console.log('tempHarvestWinners.data :>> ', tempHarvestWinners.data);
        if (tempHarvestWinners.status == 200) {
            setHarvest(tempHarvestWinners.data);
        } else {
            toast.error("No harvest winners to show")
        }
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
                        <BackBtn />
                        <p className="text-cwhite text-2xl font-semibold">Harvest Winners</p>
                    </div>
                </div>
                <div className="flex gap-2 text-cwhite">
                    <button aria-label="csv" className="outline-none bg-cblue-500 border border-cblue-500 px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleCsvBtn}>CSV</button>
                    <button aria-label="json" className="outline-none bg-cblue-500 border border-cblue-500 px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleJsonBtn}>JSON</button>
                    <button aria-label="human" className="outline-none bg-cblue-500 border border-cblue-500 px-4 py-3 w-fit text-sm leading-4 font-medium rounded-md" onClick={handleHumanReadableBtn}>Human Readable</button>
                </div>
            </div>
            <div className="rounded-2xl border border-cgrey-200 bg-cdark-50 px-2 py-3 text-cwhite text-base font-normal overflow-scroll h-[calc(100vh-280px)]">
                <JsonView className="text-cwhite" src={formattedData} theme="winter-is-coming" collapsed={false} />
            </div>
        </div>
    );
}

export default HarvestWinners;

interface IHarvestWinners { }