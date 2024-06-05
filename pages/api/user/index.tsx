import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "GET") {
        try {

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/user`,
                withCredentials: true,
            }

            // const response = await axios.request(config);
            const response = await axios.request(config);

            console.log("========================================================>", response);


            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}