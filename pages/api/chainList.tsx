import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");

            const { serverId } = req.query;

            console.log("serverId", serverId);

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/supported-chains?serverId=${serverId}`,
            }

            const response = await axios.request(config);

            return res.status(200).json(response.data);

        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}