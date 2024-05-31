import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets } = await req.body();

            let config = {
                method: "PUT",
                url: `${process.env.baseURL_back}/administration`,
                headers: {
                    'Cookie': 'connect.sid=s%3APfpnc3B1jI-Q68c0nD58HxtzYOOE8tXK.4rvRPdivIqIXaRfaNQM6AlRwS8J6Kb9dnV5BzeNGw9I'
                },
                data: qs.stringify({
                    id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets
                }),
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else if (req.method == "GET") {
        try {
            const axios = require("axios");

            let config = {
                method: "GET",
                url: `${process.env.baseURL_back}/administration`,
                headers: {
                    'Cookie': 'connect.sid=s%3APfpnc3B1jI-Q68c0nD58HxtzYOOE8tXK.4rvRPdivIqIXaRfaNQM6AlRwS8J6Kb9dnV5BzeNGw9I'
                }
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}