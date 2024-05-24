import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");
            const { serverID } = await req.body;

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/test/get-permitted-users?serverID=${serverID}`,
            }

            const response = await axios.request(config);
            console.log("get permitted users =======> ",response.data);

            return res.json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.json({ message: "Failed to create user" });
        }
    }
}