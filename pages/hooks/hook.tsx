import toast from "react-hot-toast";

import { ICreateGiveaway, IAdministrationTrustedServers, IAddserverInfo, IEditserverInfo } from "../utils/_type";


export const test = async () => {
    try {
        const res = await fetch(`/api/administration`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
};

export const User = async () => {
    try {
        const res = await fetch(`/api/user`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getHarvestWinners = async () => {
    try {
        const res = await fetch(`/api/harvest`)

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getUserDetails = async (userID: string, serverID: string) => {
    try {
        const res = await fetch(`/api/user-details/get`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID, serverID
            })
        });

        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else {
            return "undefined";
        }
    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getAdminof = async () => {
    try {
        const res = await fetch(`/api/adminof`);

        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else {
            return "undefined";
        }
    } catch (error: any) {
        toast.error(error.message)
    }
}

export const UserInfo = async () => {
    try {
        const res = await fetch("/api/userinfo");

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getPermittedusers = async (serverID: string) => {
    try {
        const res = await fetch(`/api/permitted-users/get`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                serverID
            }),
        })

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result.data;

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const putPermittedusers = async (data: any) => {
    try {
        const res = await fetch(`api/permitted-users/put`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            })
        })
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getGiveaways = async () => {
    try {
        const res = await fetch(`/api/giveaways/`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const handleCreateGiveaway = async (data: ICreateGiveaway) => {

    const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles } = data;

    if (!serverID || !Expiry || !title || !description || !chain || !type || !quantity || !price) {
        return toast.error("Plz input all values");
    }

    try {
        const res = await fetch(`/api/giveaways/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const handleEditGiveaway = async (data: ICreateGiveaway) => {

    const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles } = data;

    if (!serverID || !Expiry || !title || !description || !chain || !type || !quantity || !price) {
        return toast.error("Plz input all values");
    }

    try {
        // const res = await fetch(`/api/giveaways/`, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         data
        //     }),
        // });

        // if (!res.ok) {
        //     const errorData = await res.json();
        //     throw new Error(errorData.error);
        // }
        // const result = await res.json();

        // return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const handleEditGiveAway = async () => {
    console.log("handle edit giveaway");

}

export const Logout = async () => {
    try {
        const res = await fetch(`/api/logout`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getServers = async () => {
    try {
        const res = await fetch(`/api/servers`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
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
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getAllocation = async (serverID: string, id?: string) => {
    try {
        const res = await fetch(`/api/allocation?serverID=${serverID}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }

        const result = await res.json();

        return result
    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getVestingReports = async () => {
    try {
        const res = await fetch(`api/vesting-reports`)

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
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
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getAdministrationTrustedServers = async (serverID: string) => {
    try {
        const res = await fetch(`/api/administration/trusted-servers?serverID=${serverID}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const PutAdministrationTrustedServers = async (data: IAdministrationTrustedServers) => {
    try {
        const res = await fetch(`/api/administration/trusted-servers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data
            }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const getActiveServers = async () => {
    try {
        const res = await fetch(`/api/active-servers`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const administrationChannellist = async (serverID: string) => {
    try {
        const res = await fetch(`/api/administration/channellist?serverID=${serverID}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
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
        toast.error(error.message)
    }
}

export const getServerRoles = async (serverID: string) => {
    try {
        const res = await fetch(`/api/serverRoles/${serverID}`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

export const adminCheck = async () => {
    try {
        const res = await fetch(`/api/administration`);

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
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
        toast.error(error.message)
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
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
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
            const errorData = await res.json();
            throw new Error(errorData.error);
        }
        const result = await res.json();

        return result

    } catch (error: any) {
        toast.error(error.message)
    }
}

