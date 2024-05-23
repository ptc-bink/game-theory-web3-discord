import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

type ResponseData = {
    // message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets } = await req.body();

            let config = {
                method: "PUT",
                url: `${process.env.baseURL_back}/test/administration`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({
                    id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets
                }),
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.json({ message: "Failed to create user" });
        }
    } else if (req.method == "GET") {
        try {
            const axios = require("axios");

            let config = {
                method: "GET",
                url: `${process.env.baseURL_back}/test/administration`,
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.json({ message: "Failed to create user" });
        }
    }
}