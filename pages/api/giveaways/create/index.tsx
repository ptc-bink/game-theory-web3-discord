import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs"
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method == "POST") {
        try {

            const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
            } = req.body.data;

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/create-giveaway`,
                data: qs.stringify({
                    serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
                }),
            }

            console.log("-=====================================config", config);


            const response = await axios.request(config);

            console.log("==========================================>", response);


            return res.status(200).json(response.data);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    }
}