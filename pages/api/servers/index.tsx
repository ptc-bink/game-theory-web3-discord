import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {
            const axios = require("axios");

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/servers`,
                headers: {
                    'Cookie': 'connect.sid=s%3APfpnc3B1jI-Q68c0nD58HxtzYOOE8tXK.4rvRPdivIqIXaRfaNQM6AlRwS8J6Kb9dnV5BzeNGw9I'
                }
            }

            const response = await axios.request(config);

            return res.json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}