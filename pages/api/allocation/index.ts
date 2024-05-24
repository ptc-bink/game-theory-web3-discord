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
            const { serverID, id } = req.query

            console.log("get allocation ===>", serverID, ":", id);

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/allocations?serverId=${serverID}`,
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