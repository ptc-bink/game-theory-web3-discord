import { NextApiRequest, NextApiResponse } from "next";
import { useParams } from "next/navigation";
import { NextRequest } from "next/server";

type ResponseData = {
    message: string
}

export async function GET(request: NextRequest, { params }: { params: { serverID: string } }) {
    try {
        const axios = require("axios");
        const serverID = params.serverID

        let config = {
            method: "get",
            url: `${process.env.baseURL_back}/test/allocations?serverID=${serverID}`,
        }

        const response = await axios.request(config);
        console.log(response.data);

        return Response.json(response.data);
    } catch (error) {
        console.error("Error creating user: ", error);
        return Response.json({ message: "Failed to create user" }, { status: 409 });
    }
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse<ResponseData>
// ) {
//     if (req.method == "GET") {
//         try {
//             const axios = require("axios");
//             let { slug } = req.query

//             console.log("slug =====>", typeof(slug), slug);


            
//             let config = {
//                 method: "get",
//                 url: `${process.env.baseURL_back}/test/allocations?serverId=`,
//             }

//             // console.log("config ==============>", config);
            

//             // const response = await axios.request(config);

//             // console.log("get alloction",response.data);


//             // return res.json(response.data);
//         } catch (error) {
//             console.error("Error creating user: ", error);
//             return res.json({ message: "Failed to create user" });
//         }
//     }
// }