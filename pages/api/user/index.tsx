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

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/user`,
            }

            const response = await axios.request(config);
            console.log(response.data);

            return Response.json(response.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return Response.json({ message: "Failed to create user" }, { status: 409 });
        }
    }
}