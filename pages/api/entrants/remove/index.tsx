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
            const { removeUserID, serverID, marketID } = await req.body();

            console.log("here : remove entrants data =====>", removeUserID, serverID, marketID);

            let config = {
                method: "POST",
                url: `${process.env.baseURL_back}//test/removeentry/:${marketID}/:${serverID}/:${removeUserID}`,
                headers: { "Content-Type": "application/json" },
            }

            const res = await axios.request(config);
            console.log("remove entrants res.data =====>", res.data);

            return res.json(res.data);
        } catch (error) {
            console.error("Error creating user: ", error);
            return res.json({ message: "Failed to create user" });
        }
    }
}