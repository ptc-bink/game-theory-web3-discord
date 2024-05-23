import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");
            const giveawayID = await req.body();

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/harvest`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({ giveawayID })
            }

            const response = await axios.request(config);
            console.log(response);

            return res.json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.json({ message: "Failed to create user" });
        }
    }
}
