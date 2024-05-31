import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");

            const { serverId } = req.body

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/giveaways?serverId=${serverId}`,
            }

            const response = await axios.request(config);

            console.log("=====================================================", response);


            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}