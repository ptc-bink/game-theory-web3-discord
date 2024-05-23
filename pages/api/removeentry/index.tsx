import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const axios = require("axios");
        const { serverID, marketID, removeUserID } = await request.json();

        let config = {
            method: "post",
            url: `${process.env.baseURL_back}/test/removeentry/:${serverID}/:${marketID}/:${removeUserID}`,
        }

        const response = await axios.request(config);
        console.log(response.data);

        return Response.json(response.data);
    } catch (error) {
        console.error("Error creating user: ", error);
        return Response.json({ message: "Failed to create user" }, { status: 409 });
    }
}

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
            const { serverID, marketID, removeUserID } = await req.body;

            let config = {
                method: "post",
                url: `${process.env.baseURL_back}/test/removeentry/:${serverID}/:${marketID}/:${removeUserID}`,
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