import toast from "react-hot-toast";
import qs from "qs"

import { ICreateGiveaway, IAdministrationTrustedServers, IAddserverInfo, IEditserverInfo } from "./utils/_type";
import { baseURL_back } from "./utils/_config";
import axios from "axios";


export const test = async () => {
    try {
        const response = await fetch(`${baseURL_back}/administration`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("test response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
};

export const getHarvestWinners = async () => {
    try {

        const response = await fetch(`${baseURL_back}/harvest`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get harvest winners response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
}

export const getUserDetails = async (userID: string, serverID: string) => {
    try {

        const response = await fetch(`${baseURL_back}/get-user-details?serverID=${serverID}&userID=${userID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get user details response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
}

export const getPermittedusers = async (serverID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/get-permitted-users?serverID=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get permitted users response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
}

// export const putPermittedusers = async ({ data, serverID, userID }: {{ data:any, serverID:string, userID:string }}) => {
//     try {

//         const response = await fetch(`${baseURL_back}/update-permitted-users`, {
//             method: 'PUT',
//             credentials: 'include', // Include credentials to get the cookies
//             headers: { "Content-Type": "application/json" },
//             body: qs.stringify({ data, serverID, userID })
//         });

//         console.log("get servers response ======================>", response);

//         //print cookies and full repsonce
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json(); // Parse the response body as JSON

//         return data

//     } catch (error) {

//         throw error;

//     }
// }

export const getGiveaways = async (serverId: string) => {
    try {

        // const response = await fetch(`${baseURL_back}/giveaways?serverId=${serverId}`, {
        const response = await fetch(`${baseURL_back}/giveaways?serverId=${serverId}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get giveaways response ======================>", await response);

        //print cookies and full repsonce
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
}

export const handleCreateGiveaway = async (data: ICreateGiveaway) => {
    try {

        const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
        } = data;

        const response = await fetch(`${baseURL_back}/create-giveaway`, {
            method: 'post',
            credentials: 'include', // Include credentials to get the cookies
            body: qs.stringify({
                serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
            }),
        });

        console.log("get servers response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json(); // Parse the response body as JSON

        return res

    } catch (error) {

        throw error;

    }
}

export const handleEditGiveAway = async (data: ICreateGiveaway) => {

    const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles } = data;

    if (!serverID || !Expiry || !title || !description || !chain || !type || !quantity || !price) {
        return toast.error("Plz input all values");
    }

    return "Coming soon"
    // try {
    //     const res = await fetch(`/api/giveaways/`, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({
    //             data
    //         }),
    //     });

    //     if (!res.ok) {
    //         throw new Error(res.statusText);
    //     }
    //     const result = await res.json();

    //     return result

    // } catch (error: any) {
    //     toast.error("Failed your request")
    // }
}

export const logout = async () => {
    try {

        const response = await fetch(`${baseURL_back}/logout`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get servers response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }
}

export const getServers = async () => {

    try {

        console.log("here : get servers");

        const response = await fetch(`http://iamabackendserverhello.com/servers`, {
            // const response = await fetch(`${baseURL_back}/servers`, {
            // const response = await fetch(`${baseURL_back}/auth/user/adminOf`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get servers response ======================>", response);

        //print cookies and full repsonce
        if (!response.ok) {
            throw ('Network response was not ok');
        }

        const data = await response.json(); // Parse the response body as JSON

        return data

    } catch (error) {

        throw error;

    }

}

export const enterGiveaway = async (serverID: string, giveAwayID: string, userID: string) => {
    try {
        const res = await fetch(`/api/enter-giveaway`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                serverID,
                giveAwayID,
                userID
            })
        })

        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getAllocation = async (serverID: string, id?: string) => {
    try {
        const res = await fetch(`/api/allocation?serverID=${serverID}`);

        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const result = await res.json();

        return result
    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getVestingReports = async () => {
    try {
        const res = await fetch(`api/vesting-reports`)

        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const addAllocation = async (data: any) => {
    try {
        const res = await fetch(`/api/allocation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            })
        })

        if (!res.ok) {
            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getUser = async () => {

    try {
        const response = await fetch(`${baseURL_back}/user`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get user response", response);


        if (!response.ok) {
            throw 'Not invalid request'
        }

        const data = await response.json(); // Parse the response body as JSON

        return data;
    } catch (error) {
        throw ("Network response error")
    }

    // try {
    //     const res = await fetch(`api/user`);

    //     console.log("=======================================", res);

    //     if (!res.ok) {

    //         throw new Error(res.statusText);
    //     }
    //     const result = await res.json();

    //     return result
    // } catch (error) {
    //     console.error('Error fetching user data:', error)
    // }
}

export const getAdministrationTrustedServers = async (serverID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/administration-trusted-servers?serverId=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        if (!response.ok) {
            throw 'Not invalid request'
        }

        const data = await response.json(); // Parse the response body as JSON

        return data;
    } catch (error) {
        throw ("Network response error")
    }

}

export const PutAdministrationTrustedServers = async (data: IAdministrationTrustedServers) => {
    try {

        // const {id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets} = data

        const response = await fetch(`${baseURL_back}/administration`, {
            method: 'PUT',
            credentials: 'include', // Include credentials to get the cookies
            // body: qs.stringify({
            //     id, redisKey, name, paymentExpires, General_Channel_ID, Market_Channel_ID, Submit_Wallet_ID, Database, Vesting_Channel_ID, Reminder_Channel_ID, Winners_Channel_ID, Supported_Wallets
            // }),
        });

        if (!response.ok) {
            throw 'Not invalid request'
        }

        const res = await response.json(); // Parse the response body as JSON

        return res;
    } catch (error) {
        throw ("Network response error")
    }
    try {
        const res = await fetch(`/api/administration/trusted-servers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            }),
        });
        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getActiveServers = async () => {
    try {
        const res = await fetch(`/api/active-servers`);

        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const administrationChannellist = async (serverID: string) => {
    try {
        const res = await fetch(`/api/administration/channellist?serverID=${serverID}`);

        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getChainList = async (serverID: string) => {
    try {
        const res = await fetch(`/api/chainList?serverId=${serverID}`)

        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else {
            return "undefined";
        }
    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const getServerRoles = async (serverID: string) => {
    try {
        const res = await fetch(`/api/serverRoles/${serverID}`);

        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const adminCheck = async () => {
    try {
        const response = await fetch(`${baseURL_back}/api/administration`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log(await response.json());

        if (!response.ok) {
            throw 'Not invalid request'
        }

        const data = await response.json(); // Parse the response body as JSON

        return data;
    } catch (error) {
        throw ("Network response error")
    }

}

export const removeEntry = async ({ marketID, serverID, removeUserID }: { marketID: string, serverID: string, removeUserID: string }) => {
    try {
        const res = await fetch(`/api/entrants/remove`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                marketID,
                serverID,
                removeUserID
            }),
        });

        const result = await res.json();

        toast.success("removed success")
    } catch (error: any) {
        console.log(error);
        toast.error("Failed your request")
    }
}

export const addServer = async (data: IAddserverInfo) => {
    try {
        const res = await fetch(`api/servers/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            }),
        })

        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

export const editServer = async (data: IEditserverInfo) => {
    try {
        const res = await fetch(`api/servers/edit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            }),
        })

        if (!res.ok) {

            throw new Error(res.statusText);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error("Failed your request")
    }
}

