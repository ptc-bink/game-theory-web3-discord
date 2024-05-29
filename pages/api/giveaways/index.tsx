import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {
            const axios = require("axios");

            const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
            } = req.body.data;

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/test/create-giveaway`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({
                    serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
                }),
            }

            console.log("config ========================>", config);

            const response = await axios.request(config);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    } else if (req.method == "GET") {
        try {
            const axios = require("axios");

            let config = {
                method: "get",
                url: `${process.env.baseURL_back}/test/giveaways`,
            }

            console.log("=============================================================here get giveaways");

            const response = await axios.request(config);

            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}