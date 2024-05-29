import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { removeUserID, serverID, marketID } = req.body;

            let config = {
                method: "POST",
                url: `${process.env.baseURL_back}/test/removeentry/:${marketID}/:${serverID}/:${removeUserID}`,
                headers: { "Content-Type": "application/json" },
            }

            const res = await axios.request(config);

            return res.status(200).json(res.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}