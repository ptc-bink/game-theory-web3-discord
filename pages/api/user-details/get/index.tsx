import { IServer } from "@/utils/_type";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const { serverID, userID } = req.body;

            if (serverID == undefined || userID == undefined) {
                return res.status(500).json({ message: "Please input all value" });
            }

            let config = {
                method: "GET",
                url: `${process.env.baseURL_back}/test/get-user-details?serverID=${serverID}&userID=${userID}`,
            }

            const response = await axios.request(config);
            console.log("response=========================");
            console.log(response);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}