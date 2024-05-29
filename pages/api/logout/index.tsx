import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/logout`,
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    }
}