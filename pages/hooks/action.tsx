"use client"

import React, { useEffect, useContext } from "react";

import AppContext from "../providers/AppContext";
import { IAdminof, IDashboard, IGiveaway, IBiddersGiveaway, IServerList, IDashboardres } from "../utils/_type"
import {
    test,
    User,
    Logout,
    GetHarvest,
    GetAdminof,
    UserInfo,
    GetGiveaways,
    GetServers,
    CreateGiveaway,
    ActiveServers,
    Administration,
    RemoveEntry,
    GetSeverRoles,
    AdministrationChannellist,
    PutAdministrationTrustedServers,
    GetAdministrationTrustedServers,
} from "./hook"

export const getDashboardInfo = async () => {

    // const serverIDList: string[] = [];
    // const serverList: string[] = [];

    const adminof: IAdminof = await GetAdminof();

    let serverList: IServerList = { name: "", id: "" };
    let biddersGiveawayList: IBiddersGiveaway[] = [];
    let giveawayList: IGiveaway[] = [];

    // console.log("adminof =====>", adminof);
    // console.log("serverIDLIST[0]============");

    if (adminof) {

        serverList = { id: adminof.id, name: adminof.name }

        // console.log("serverList ===>", adminof);

        if (serverList) {
            giveawayList = await GetGiveaways(serverList.id);


            // console.log("giveawayList ====>", giveawayList);

            if (giveawayList.length) {
                biddersGiveawayList = giveawayList.map(item => {
                    return { bidders: item.bidders, giveaway: item.messageID }
                })
            }

            // console.log("adminof =====>", giveawayList);
        }
    }

    const res: IDashboardres = {
        serverList: serverList,
        biddersGiveawayList: biddersGiveawayList,
        initGiveawayList: giveawayList
    }

    return res
}

export const getHarvestWinners = async (giveawayID: string) => {
    const harvest = await GetHarvest(giveawayID);

    return harvest;
}

export const getApprovedServers = async () => {

    const adminTrustedServers = await GetAdministrationTrustedServers();
    // const adminTrustedServers = {
    //     "1187912294773039136": {
    //         "name": "Game Theory",
    //         "admin": "435999864644435970",
    //         "redisKey": "gameTheory",
    //         "paymentExpires": "32504682506",
    //         "Market_Channel_ID": "1194710643928989877",
    //         "General_Channel_ID": "1194488184134967296",
    //         "Submit_Wallet_ID": "1194332119091126355",
    //         "Database": "thfetumy_gametheory",
    //         "Vesting_Channel_ID": "1206541360228864040",
    //         "Reminder_Channel_ID": "1234457579334144040",
    //         "Winners_Channel_ID": "1234457626461474908",
    //         "Supported_Wallets": [
    //             "ETH_HOT",
    //             "ETH_COLD",
    //             "BTC_HOT",
    //             "SOL_HOT"
    //         ]
    //     },
    //     "1117765706289778748": {
    //         "redisKey": "mainBotTestServer",
    //         "name": "Main Bot test Server",
    //         "paymentExpires": "1738154433",
    //         "General_Channel_ID": "1117765706725990461",
    //         "Market_Channel_ID": "1198486635231322203",
    //         "admin": "289758763668340736",
    //         "Database": "thfetumy_mainbottestserver",
    //         "Member_Role_ID": "1212390400589955142",
    //         "Reminder_Channel_ID": "1234463441474027550",
    //         "Winners_Channel_ID": "1234463563947704350",
    //         "Supported_Wallets": [
    //             "ETH_HOT"
    //         ]
    //     },
    //     "1191620690772754452": {
    //         "name": "INKonBTC",
    //         "admin": "218540188387901440",
    //         "redisKey": "ink",
    //         "Database": "thfetumy_ink",
    //         "paymentExpires": "32504682506",
    //         "Market_Channel_ID": "1205255830065389639",
    //         "General_Channel_ID": "1191620691804565588",
    //         "Submit_Wallet_ID": "1205255897119727666",
    //         "Supported_Wallets": [
    //             "ETH_HOT",
    //             "ETH_COLD",
    //             "BTC_HOT",
    //             "SOL_HOT"
    //         ]
    //     },
    //     "1034857855062384670": {
    //         "name": "Today",
    //         "admin": "548466932786135092",
    //         "redisKey": "Today",
    //         "paymentExpires": "32504682506",
    //         "Market_Channel_ID": "1215856392204976158",
    //         "General_Channel_ID": "1205256787033587753",
    //         "Submit_Wallet_ID": "1215856422185730148",
    //         "Database": "thfetumy_Today",
    //         "Vesting_Channel_ID": "00000",
    //         "Member_Role_ID": "1035199656705146890",
    //         "Supported_Wallets": [
    //             "ETH_HOT"
    //         ]
    //     },
    //     "1219682506475831446": {
    //         "name": "Staging",
    //         "admin": "289758763668340736",
    //         "redisKey": "Staging",
    //         "paymentExpires": "32504682506",
    //         "Market_Channel_ID": "1219682611501207643",
    //         "General_Channel_ID": "1219682507021222000",
    //         "Submit_Wallet_ID": "1219682758243127296",
    //         "Database": "thfetumy_Staging",
    //         "Vesting_Channel_ID": "00000",
    //         "Member_Role_ID": "1219686759231782932",
    //         "Supported_Wallets": [
    //             "ETH_HOT"
    //         ]
    //     }
    // };

    const channel = Object.entries(adminTrustedServers);
    const userIdList = Object.keys(adminTrustedServers);

    const userInfoList = userIdList?.map((userID: any, index: number) => {
        return UserInfo(userID);
    })

    console.log("userInfoList ===>", userInfoList);

    return channel;
}

export const adminCheck = async () => {
    const res = await Administration();

    return res;
}

export const getServerList = async () => {
    const adminof: IAdminof = await GetAdminof();

    let serverList: IServerList[] = [
        { name: "server.name", id: "0000000000000000000" },
        { name: "server.name", id: "0000000000000000000" },
        { name: "server.name", id: "0000000000000000000" },
    ];

    // if (adminof) {
    // serverList = { id: adminof.id, name: adminof.name }
    // }


    return serverList;
}