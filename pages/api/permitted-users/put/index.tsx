import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const { data, serverID, userID } = await req.body;

            let config = {
                method: "put",
                url: `${process.env.baseURL_back}/update-permitted-users`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({ data, serverID, userID })
            }

            const response = await axios.request(config);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}