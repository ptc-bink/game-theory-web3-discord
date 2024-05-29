import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { data } = await req.body;

            console.log("here : add server");

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/test/create-giveaway`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({
                    data
                }),
            }

            const res = await axios.request(config);
            console.log(res.data);

            return res.status(200).json(res.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}