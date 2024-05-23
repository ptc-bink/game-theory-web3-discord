import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"

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
            const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
            } = await req.body();

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/test/create-giveaway`,
                headers: { "Content-Type": "application/json" },
                data: qs.stringify({
                    serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles

                }),
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