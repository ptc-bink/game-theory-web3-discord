import { IServer } from "@/pages/utils/_type";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { serverID, userID } = await req.body();

            let config = {
                method: "GET",
                url: `${process.env.baseURL_back}/test/get-user-details?serverID=${serverID}&userID=${userID}}`,
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}