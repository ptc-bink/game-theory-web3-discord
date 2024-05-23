import { NextApiRequest, NextApiResponse } from "next";

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
            const { userID } = await req.body;

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/userinfo?userID=${userID}`,
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