import toast from "react-hot-toast";
import qs from "qs"

import { ICreateGiveaway, IAdministrationTrustedServers, IAddserverInfo, IEditserverInfo, ISetVestingParams, IUpdateGiveaway, ISetAllocation, IProfileEdit } from "./utils/_type";
import { baseURL_back } from "./utils/_config";

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

        const data = await response.json(); // Parse the response body as JSON

        console.log("get harvest winners response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No harvest winners to show"
        };
    }
}

export const getUserDetails = async (serverID: string) => {
    try {
        // const response = await fetch(`${baseURL_back}/get-user-details?serverID=${serverID}&userID=${userID}`, {
        const response = await fetch(`${baseURL_back}/user-profile?serverID=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get user details response", response);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        console.log(error);

        return {
            status: 401, data: "No user Info to show"
        };
    }
}

export const editUserProfile = async (serverID: string, data: IProfileEdit) => {
    try {
        console.log("serverID ====>", serverID);
        console.log("data ====>", data);

        const response = await fetch(`${baseURL_back}/user-profile-edit&serverID=${serverID}`, {
            method: 'PUT',
            credentials: 'include', // Include credentials to get the cookies
            body: JSON.stringify(data)
        });

        const res = await response.json(); // Parse the response body as JSON

        console.log("eidt user profile response", res);

        if (response.status === 200) {
            return { status: 200, data: res };
        }

        return { status: 401, data: res };
    } catch (error) {
        return {
            status: 401, data: "No giveaway to show"
        };
    }
}

export const getVestingReportsList = async (serverID: string) => {
    try {
        // const response = await fetch(`${baseURL_back}/permitted-vesting-reports?serverID=${serverID}`, {
        const response = await fetch(`${baseURL_back}/get-vesting-reports?serverID=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get vesting report list response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No permitted user to show"
        };
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
        const response = await fetch(`${baseURL_back}/giveaways?serverId=${serverId}`, {
            // const response = await fetch(`${baseURL_back}/giveaways?serverId=1250486002112532584`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get giveaway response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No giveaway to show"
        };
    }
}

export const handleCreateGiveaway = async (data: ICreateGiveaway) => {
    try {

        const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
        } = data;

        const response = await fetch(`${baseURL_back}/create-giveaway`, {
            method: 'post',
            credentials: 'include', // Include credentials to get the cookies
            body: JSON.stringify({
                serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles
            }),
        });

        console.log("get servers response ======================>", response);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No giveaway to show"
        };
    }
}

export const handleEditGiveaway = async (data: IUpdateGiveaway) => {
    try {
        const res = await fetch(`${baseURL_back}/update-giveaway/`, {
            method: "POST",
            credentials: 'include', // Include credentials to get the cookies
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
        const response = await fetch(`${baseURL_back}/servers`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No server to show"
        };
    }
}

export const getUserServers = async () => {
    try {
        const response = await fetch(`${baseURL_back}/user-servers`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get user server response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No server to show"
        };
    }
}

export const enterGiveaway = async (serverID: string, giveAwayID: string, userID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/enter-giveaway?serverId=${serverID}&giveawayId=${giveAwayID}&userID=${userID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        console.log("get user response", response);


        if (!response.ok) {
            throw 'Not invalid request'
        }

        const data = await response.json(); // Parse the response body as JSON
        console.log("enter giveaway data ====>", data);

        return data;

    } catch (error) {

        throw ("Network response error")

    }
}

export const getAllocation = async (serverID: string, id?: string) => {
    try {
        console.log("serverID ===>", serverID);

        const response = await fetch(`${baseURL_back}/allocations?serverID=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get allocation response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No allocation to show"
        };
    }
}

export const setAllocation = async (data: ISetAllocation) => {
    try {
        const response = await fetch(`${baseURL_back}/set-allocation`, {
            method: "PUT",
            credentials: 'include',
            body: JSON.stringify(data)
        })

        const res = await response.json();

        if (response.status === 200) {
            return { status: 200, data: data }
        }

        return { status: 401, data: "Error setting allocation" }
    } catch (error) {
        return { status: 401, data: "Error setting allocation" }
    }
}

export const generateVestingReports = async (serverId: string, allocationNumber: number, userIds?: string[]) => {
    try {
        const response = await fetch(`${baseURL_back}/generate-vesting-report`, {
            method: 'put',
            credentials: 'include', // Include credentials to get the cookies
            body: JSON.stringify({
                serverId: serverId,
                allocationNumber: allocationNumber,
                userIds: userIds
            })
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get server response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No vesting-report to show"
        };
    }
}



export const getAllocationReadyForVesting = async (serverId: string) => {
    try {
        const response = await fetch(`${baseURL_back}/get-allocations-ready-for-vesting?serverId=${serverId}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get allocations ready for vesting response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No allocations ready for vesting to show"
        };
    }
}

export const getVestingReportData = async (serverId: string, allocationNumber: string) => {
    try {
        const response = await fetch(`${baseURL_back}/test/get-vesting-report`, {
            // const response = await fetch(`${baseURL_back}/get-vesting-report?serverId=${serverId}&allocationNumber=${allocationNumber}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get vesting-reports response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No vesting-report to show"
        };
    }
}

export const setVestingParams = async (data: ISetVestingParams) => {
    try {
        const response = await fetch(`${baseURL_back}/set-vesting-parameters`, {
            method: 'PUT',
            credentials: 'include', // Include credentials to get the cookies
            body: qs.stringify(data)
        });

        const res = await response.json(); // Parse the response body as JSON

        console.log("get vesting-reports response", res);

        if (response.status === 200) {
            return { status: 200, data: res };
        }

        return { status: 401, data: res };
    } catch (error) {
        return {
            status: 401, data: "No vesting-report to show"
        };
    }
}

export const addAllocation = async (data: any) => {
    try {
        const response = await fetch(`${baseURL_back}/allocation`, {
            method: 'post',
            credentials: 'include', // Include credentials to get the cookies
            body: JSON.stringify({
                data
            }),
        });

        const res = await response.json(); // Parse the response body as JSON

        console.log("get server response", res);

        if (response.status === 200) {
            return { status: 200, data: res };
        }

        return { status: 401, data: res };
    } catch (error) {
        return {
            status: 401, data: "No vesting-report to show"
        };
    }
}

export const getUserPermission = async () => {
    try {
        const response = await fetch(`${baseURL_back}/user/user-permissions`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get user permission response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "User not authenticated"
        };
    }
}

export const getUser = async () => {
    try {
        const response = await fetch(`${baseURL_back}/user`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get user response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "User not authenticated"
        };
    }
}

export const getAllocationpermittedusers = async (serverID: string, vestingReportID: number) => {
    try {
        const response = await fetch(`${baseURL_back}/allocation-permitted-users?serverID=${serverID}&vestingReportID=${vestingReportID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get allocation permitted users response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No trusted server to show"
        };
    }
}


export const getAdministrationTrustedServers = async (serverID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/administration-trusted-servers?serverId=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get administration-servers response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No trusted server to show"
        };
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

        const data = await response.json(); // Parse the response body as JSON

        console.log("put administration trusted servers", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No trusted server to show"
        };
    }
}

export const getActiveServers = async () => {
    try {
        const response = await fetch(`${baseURL_back}/active-servers`, {
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
}

export const administrationChannellist = async (serverID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/administration-channellist?serverID=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get administration channel list response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No administration-list to show"
        };
    }
}

export const getUserGlobalPermission = async () => {
    try {
        const response = await fetch(`${baseURL_back}/user-get-global-permissions`, {
            method: "GET",
            credentials: "include", // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get user get global permissions", data);

        if (response.status === 200) {
            return {
                status: 200,
                data: data
            }
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No chain-list to show"
        };
    }
}

export const getChainList = async (serverID: string) => {
    try {

        console.log("get chainlist serverid ===> ", serverID);

        const response = await fetch(`${baseURL_back}/supported-chains?serverId=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get chainlist response ====================>", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No chain-list to show"
        };
    }
}

export const getServerRoles = async (serverID: string) => {
    try {
        const response = await fetch(`${baseURL_back}/serverRoles?serverId=${serverID}`, {
            method: 'GET',
            credentials: 'include', // Include credentials to get the cookies
        });

        const data = await response.json(); // Parse the response body as JSON

        console.log("get server response", data);

        if (response.status === 200) {
            return { status: 200, data: data };
        }

        return { status: 401, data: data };
    } catch (error) {
        return {
            status: 401, data: "No server-roles to show"
        };
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
        const response = await fetch(`${baseURL_back}/removeentry/:${marketID}/:${serverID}/:${removeUserID}`, {
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

export const addServer = async (data: IAddserverInfo) => {
    try {
        const response = await fetch(`${baseURL_back}/create-giveaway`, {
            method: 'POST',
            credentials: 'include', // Include credentials to get the cookies
            body: JSON.stringify({ data }),
        });

        console.log(await response.json());

        if (!response.ok) {
            throw 'Not invalid request'
        }

        const res = await response.json(); // Parse the response body as JSON

        return res;
    } catch (error) {

        throw ("Network response error")

    }
}

export const editServer = async (data: IEditserverInfo) => {
    try {
        return console.log("data =====>", data);

        // const response = await fetch(`${baseURL_back}/create-giveaway`, {
        //     method: 'POST',
        //     credentials: 'include', // Include credentials to get the cookies
        //     body: JSON.stringify({ data }),
        // });

        // console.log(await response.json());

        // if (!response.ok) {
        //     throw 'Not invalid request'
        // }

        // const res = await response.json(); // Parse the response body as JSON

        // return res;
    } catch (error) {

        throw ("Network response error")

    }
}
