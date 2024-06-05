import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { config_cookie } from "@/utils/_config";
import { headers } from "next/headers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            console.log("=======================here : get server list");


            // let config = {
            //     method: "get",
            //     url: `${process.env.baseURL_back}/auth/user/adminOf`,
            //     headers: {
            //         Credential: "include"
            //         // Cookie: config_cookie
            //     }
            // }

            const response = await axios.request({
                method: "get",
                url: `${process.env.baseURL_back}/auth/user/adminOf`,
                // headers: {
                //     Cookie: config_cookie
                // }
                withCredentials: true
            });

            console.log("=========================get servers =>", response.data);


            return res.json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}