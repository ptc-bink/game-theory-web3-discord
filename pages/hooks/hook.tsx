import { giveAways, harvestWinners, } from "../utils/_data";
import { ICreateGiveaway, IAdministrationTrustedServers } from "../utils/_type";


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

export const UserInfo = async (userId: string) => {

    const response = await fetch("/api/userinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
        }),
    });

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const GetGiveaways = async (serverID: string) => {

    // const response = await fetch(`/api/giveaways/${serverID}`);

    // if (response.status == 200) {
    //     const data = await response.json();

    //     return data;

    // } else {
    //     return undefined;
    // }

    return giveAways;
}

export const CreateGiveaway = async (data: ICreateGiveaway) => {

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

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const Logout = async () => {

    const response = await fetch(`/api/logout`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const GetServers = async () => {

    const response = await fetch(`/api/servers`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const GetAdministrationTrustedServers = async () => {

    const response = await fetch(`/api/administration/trusted-servers`);

    if (response.status == 200) {
        const data = await response.json();

        console.log("data ====>", data);


        return data;

    } else {
        return undefined;
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
        return undefined;
    }
}

export const ActiveServers = async (serverID: string) => {

    const response = await fetch(`/api/active-servers`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const AdministrationChannellist = async (serverID: string) => {

    const response = await fetch(`/api/administration/channellist/${serverID}`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const GetSeverRoles = async (serverID: string) => {

    const response = await fetch(`/api/serverRoles/${serverID}`);

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;

    } else {
        return undefined;
    }
}

export const Administration = async () => {

    const res = await fetch(`/api/administration`);

    if (res.status == 200) {
        const data = await res.json();
        return data;
    } else {
        return undefined;
    }
}

export const RemoveEntry = async (marketID: string, serverID: string, removeUserID: string) => {
    const response = await fetch(`/api/removeenty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            marketID,
            serverID,
            removeUserID
        }),
    });

    console.log(response);

    if (response.status == 200) {
        const data = await response.json();

        return data;
    }
}
