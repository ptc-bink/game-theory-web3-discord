import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
    // message:string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method == "PUT") {
        try {
            const axios = require("axios");

            let config = {
                method: "put",
                url: `${process.env.baseURL_back}/administration-trusted-servers`,
                headers: {
                    'Cookie': 'connect.sid=s%3APfpnc3B1jI-Q68c0nD58HxtzYOOE8tXK.4rvRPdivIqIXaRfaNQM6AlRwS8J6Kb9dnV5BzeNGw9I'
                }
            }

            const response = await axios.request(config);
            console.log(response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else if (req.method == "GET") {
        try {
            const axios = require("axios");
            const { serverID } = req.query;

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/administration-trusted-servers?serverId=${serverID}`,
                headers: {
                    'Cookie': 'connect.sid=s%3APfpnc3B1jI-Q68c0nD58HxtzYOOE8tXK.4rvRPdivIqIXaRfaNQM6AlRwS8J6Kb9dnV5BzeNGw9I'
                }
            }

            const response = await axios.request(config);

            console.log("get trusted server ====>", response.data);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}