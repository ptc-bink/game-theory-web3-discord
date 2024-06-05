import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs"
import { config_cookie } from "@/utils/_config";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // get allocation
    if (req.method === 'GET') {
        try {
            const { serverID } = req.query;

            if (!serverID) {
                return res.status(400).json({ error: 'serverID is required' });
            }

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/allocations?serverID=${serverID}`,
                headers: {
                    Cookie: config_cookie
                }
            }

            const response = await axios.request(config);

            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: error });
        }
    }
    // add allocation
    else if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { data } = req.body;

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/allocation`,
                headers: {
                    Cookie: config_cookie
                },
                data: qs.stringify({
                    data
                }),
            }

            const response = await axios.request(config);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}