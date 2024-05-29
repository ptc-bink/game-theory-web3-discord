import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");
            const { serverID } = req.query;

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/administration-channellist?serverID=${serverID}`,
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.status(500).json({ error: error });
        }
    }
}