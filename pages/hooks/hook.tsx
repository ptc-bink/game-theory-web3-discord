import { error } from "console";
import { giveAways, harvestWinners, } from "../utils/_data";
import { ICreateGiveaway, IAdministrationTrustedServers, IAddserverInfo, IEditserverInfo } from "../utils/_type";


export const test = async () => {
    console.log("====================fetching raffles");

    const response = await fetch(`/api/administration`, {
        method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({
        //     inscriptionId,
        //     paymentAddress,
        //     ordinalPublicKey,
        //     walletType,
        //   }),
    });
    console.log(response);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else {
        return undefined;
    }
};

export const User = async () => {
    const response = await fetch(`/api/user`);
    console.log(response);
    if (response.status == 200) {
        const data = await response.json();
        return data;
    } else {
        return undefined;
    }
}

export const GetHarvest = async (giveawayID: string) => {
    // const response = await fetch(`/api/harvest`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //         giveawayID,
    //     }),
    // });
    // console.log(response);
    // if (response.status == 200) {
    //     const data = await response.json();
    //     return data;
    // } else {
    //     return undefined;
    // }

    return harvestWinners
}

export const GetAdminof = async () => {
    try {
        const res = await fetch(`/api/adminof`);

        if (res.status == 200) {
            const data = await res.json();
            return data;
        } else {
            return "undefined";
        }
    } catch (error) {
        return error
    }
}

export const UserInfo = async () => {

    const response = await fetch("/api/userinfo");

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const removeEntrants = async (serverID: string, marketID: string, removeUserID: string) => {
    const response = await fetch(`api/entrants/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            removeUserID, serverID, marketID
        })
    })
}

export const getPermittedusers = async (serverID: string) => {
    const res = await fetch(`/api/permitted-users/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            serverID
        }),
    })

    if (res.status == 200) {
        const data = await res.json();

        return data;

    } else {
        return undefined;
    }
}

export const putPermittedusers = async (data: any) => {
    const res = await fetch(`api/permitted-users/put`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        })
    })

    if (res.status == 200) {
        const data = await res.json();

        return data;
    }

    return console.log("put permitted user error");

}

export const getGiveaways = async () => {

    const response = await fetch(`/api/giveaways/`);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const handleCreateGiveaway = async (data: ICreateGiveaway) => {

    const { serverID, Expiry, title, description, chain, type, quantity, price, requiredRoles, restrictedRoles, winningRole, requireAllRoles } = data;

    if (!serverID || !Expiry || !title || !description || !chain || !type || !quantity || !price) {
        return console.log("Plz input all values");
    }

    const response = await fetch(`/api/giveaways/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    });

    console.log("create giveaway", response);

    // if (response.status == 200) {
    //     const data = await response.json();

    //     return data;

    // } else {
    //     return undefined;
    // }
}

export const Logout = async () => {

    const response = await fetch(`/api/logout`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return console.log("log out error");
        ;
    }
}

export const getServers = async () => {

    const response = await fetch(`/api/servers`);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return console.log("get servers error");
        ;
    }
}
export const enterGiveaway = async (serverID: string, giveAwayID: string, userID: string) => {
    const res = await fetch(`/api/enter-giveaway`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            serverID,
            giveAwayID,
            userID
        })
    }
    )

    if (res.status == 200) {
        const data = await res.json();

        return data;

    } else {
        return console.log("enter giveaway error");
        ;
    }
}

export const getAllocation = async (serverID: string, id?: string) => {
    const res = await fetch(`/api/allocation/${serverID}`);

    if (res.status == 200) {
        const data = await res.json();

        console.log("get allocation ===>", data);

        return data;
    } else {
        return console.log("error : get allocation");
    }
}

export const getVestingReports = async () => {
    const res = await fetch(`api/vesting-reports`)

    if (res.status == 200) {
        const data = await res.json();

        return data;
    } else {
        return console.log("get vesting reports error");

    }
}

export const addAllocation = async (data: any) => {
    const res = await fetch(`/api/allocation/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        })
    })

    if (res.status == 200) {
        const data = await res.json();

        return data;
    } else {
        return console.log("add allocation error");
        ;
    }
}

export const getAdministrationTrustedServers = async (serverID: string) => {

    const response = await fetch(`/api/administration/trusted-servers/${serverID}`);

    if (response.status == 200) {
        const data = await response.json();

        console.log("data ====>", data);


        return data;

    } else {
        return console.log("get administratin trusted servers error");
        ;
    }
}

export const PutAdministrationTrustedServers = async (data: IAdministrationTrustedServers) => {

    console.log("data ========>", data);

    const response = await fetch(`/api/administration/trusted-servers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    });

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return console.log("put administration trusted servers error");
        ;
    }
}

export const ActiveServers = async (serverID: string) => {

    const response = await fetch(`/api/active-servers`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return console.log("active servers error");
        ;
    }
}

export const AdministrationChannellist = async (serverID: string) => {

    const response = await fetch(`/api/administration/channellist/${serverID}`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return console.log("administration channel list error");
        ;
    }
}

export const GetSeverRoles = async (serverID: string) => {

    const res = await fetch(`/api/serverRoles/${serverID}`);

    console.log(res);

    if (res.status == 200) {
        const data = await res.json();
        console.log("server roles ===>", data);

        return data;

    } else {
        return console.log("get server roles error");
        ;
    }
}

export const adminCheck = async () => {

    const res = await fetch(`/api/administration`);

    if (res.status == 200) {
        const data = await res.json();

        if (data.message == "User is an administrator")
            return true
    } else {
        return false;
        ;
    }
}

export const getMarketChannelList = async () => {
    const res = await fetch(`api/channel/market-channel`);

    if (res.status == 200) {
        const data = await res.json();
        return data
    } else {
        return undefined;
    }
}

export const getGeneralChannelList = async () => {
    const res = await fetch(`api/channel/general-list`);

    if (res.status == 200) {
        const data = await res.json();
        return data;
    } else {
        return undefined;
    }
}

export const RemoveEntry = async (marketID: string, serverID: string, removeUserID: string) => {
    const res = await fetch(`/api/removeenty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            marketID,
            serverID,
            removeUserID
        }),
    });

    console.log(res);

    if (res.status == 200) {
        const data = await res.json();

        return data;
    } else {
        return undefined
    }
}

export const addServer = async (data: IAddserverInfo) => {
    const res = await fetch(`api/servers/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    })

    console.log(res);

    if (res.status == 200) {
        const data = await res.json();

        return data;
    } else {
        return undefined
    }
}

export const editServer = async (data: IEditserverInfo) => {
    const res = await fetch(`api/servers/edit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            data
        }),
    })

    console.log(res);

    if (res.status == 200) {
        const data = await res.json();

        return data;
    } else {
        return undefined
    }
}

