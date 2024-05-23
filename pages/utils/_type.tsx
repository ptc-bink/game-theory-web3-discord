export interface IAdministrationTrustedServers {
    id: string,
    redisKey: string,
    name: string,
    paymentExpires: string,
    General_Channel_ID: string,
    Market_Channel_ID: string,
    Submit_Wallet_ID: string,
    Database: string,
    Vesting_Channel_ID: string,
    Reminder_Channel_ID: string,
    Winners_Channel_ID: string,
    Supported_Wallets: string
}

export interface ICreateGiveaway {
    serverID: string
    Expiry: string
    title: string
    description: string
    chain: string
    type: string
    quantity: string
    price: string
    requiredRoles: string
    restrictedRoles: string
    winningRole: string
    requireAllRoles: string
}

export interface IDashboard {

}

export interface IAdminof {
    name: string,
    id: string,
    giveaways: {
        SQLID: number,
        messageID: string,
        expiry: number,
        creator: {
            avatar: string,
            id: string,
            username: string,
        },
        bidEntryTimes: string[],
        bidderWallets: string[],
        bidders: string[],
        bids: string[],
        bought: number,
        chain: string,
        description: string,
        ended_reason: string,
        entrants: number,
        entrantsNumber: number,
        finalEntrantsNumber: number,
        harvested: boolean,
        price: number,
        quantity: number,
        requireAllRoles: boolean,
        required: string[],
        restriction: string[],
        title: string,
        winners: string[],
        winningRole: string,
    }[]
}

export interface IUserInfo {
    id: string;
    name: string;
    avatar: string;
}

export interface IDropdownProps {
    dropdownList: {
        name: string;
        id: string
    }[];
    placeholder: string;
    className: string;
    callback: any;
}

export interface IRoleDropdownProps {
    dropdownList: IServerRole[];
    placeholder: string;
    className: string;
    callback: any;
}

export interface IServerList {
    name: string,
    id: string
}

export interface IGiveaway {
    messageID: string,
    expiry: number,
    creator: {
        id: string,
        username: string,
        avatar: string
    },
    title: string,
    description: string,
    chain: string,
    type: string,
    winningRole: string,
    quantity: number,
    price: number,
    restriction: string[],
    required: string[],
    requireAllRoles: boolean,
    harvested: boolean,
    bought: number,
    sealedBids: number,
    entrants: number,
    bids: string[],
    bidders: string[],
    bidderWallets: string[],
    bidEntryTimes: number[],
    SQLID: number,
    finalEntrantsNumber: number,
    entrantsNumber: number,
    winners: string[],
    ended_reason: string
}

export interface IBiddersGiveaway {
    bidders: string[],
    giveaway: string
}

export interface IDashboardres {
    serverList: IServerList,
    biddersGiveawayList: IBiddersGiveaway[],
    initGiveawayList: IGiveaway[]
}

export interface IGiveawayCardProps {
    id?: string;
    username?: string;
    avatar?: string;
    chain?: string;
    entrants?: number;
    quantity?: number;
    enterDate?: string;
    timeRemaining?: string;
    status?: string;
    bidders: string[];
    winners: string[];
}

export interface IPreviewCardProps {
    title: string,
    description: string
    expiry: string,
    winningRole: string,
    chain: string,
    quantity: number,
    restricted: IServerRole,
    requirements: string,
    price: number
}

export interface IServerRole {
    id: string,
    name: string,
    color: string,
    position?: number,
}

export interface IAdminProps { }