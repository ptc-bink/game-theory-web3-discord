import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");
            const giveawayID = await req.body();

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/harvest`,
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({ giveawayID })
            }

            const response = await axios.request(config);
            console.log(response);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}
