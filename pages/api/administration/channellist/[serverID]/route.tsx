import { useParams } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const axios = require("axios");
        const serverID = params.serverID

        let config = {
            method: "get",
            url: `${process.env.baseURL_back}/test/administration-channellist/?serverID=${serverID}`,
        }

        const response = await axios.request(config);
        console.log(response.data);

        return Response.json(response.data);
    } catch (error) {
        console.error("Error creating user: ", error);
        return Response.json({ message: "Failed to create user" }, { status: 409 });
    }
}