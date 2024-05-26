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

            console.log("here : general-channel");

            // let config = {
            //     method: "get",
            //     url: `${process.env.baseURL_back}/test/auth/user/adminof`,
            // }

            // const response = await axios.request(config);

            // return res.json(response.data);
        } catch (error) {
            console.error("Error get general-channel-list: ", error);
            return res.json({ message: "Failed to  get general channel list" });
        }
    }
}