import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const { serverID } = await req.body;

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/get-permitted-users?serverID=${serverID}`,
            }

            const response = await axios.request(config);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}