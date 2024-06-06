export interface IAdministrationTrustedServers {
    id: string;
    data: {
        name: string,
        admin: {
            avatar: string,
            id: string,
            username: string
        },
        default_Required_Role_ID: string,
        serverImage?: string,
        adminImage?: string,
        redisKey: string,
        paymentExpires: number,
        Market_Channel_ID: string,
        General_Channel_ID: string,
        Submit_Wallet_ID: string,
        Database: string,
        Vesting_Channel_ID: string,
        Reminder_Channel_ID: string,
        Winners_Channel_ID: string,
        Supported_Wallets: string[]
    }
}

export interface IEditServerModalProps {
    server: string;
    rediskey: string;
    marketChannel: string;
    generalChannel: string;
    submitWallet: string;
    vestingChannel: string;
    reminderChannel: string;
    winnersChannel: string;
}

export interface IAllocation {
    id: string,
    title: string,
    allocation: number,
    for_server: number,
    role: number,
    contract: string,
    mint_date: number,
    vesting?: {
        allocation: number,
        mint_hold_days: number,
        secondary_buy_hold_days: number,
        secondary_buy_hours: number,
        secondary_buy_amount: number,
        price_void: number,
    }
}

export interface ICreateGiveaway {
    serverID: string
    Expiry: any
    title: string
    description: string
    chain: string
    type: string
    quantity: number
    price?: number
    requiredRoles?: any
    restrictedRoles?: any
    winningRole?: any
    requireAllRoles?: boolean
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

export interface IEditserverInfo {

}

export interface IAddserverInfo {
    Submit_Wallet_ID: string,
    Vesting_Channel_ID: string,
    Reminder_Channel_ID: string,
    Winners_Channel_ID: string,
    rediskey: string,
    marketChannelID: string,
    generalChannelID: string,
    date: string
}

export interface IUserInfo {
    id: string;
    username: string;
    avatar: string;
}

export interface IDropdownListProps {
    name: string,
    id: string
}

export interface IDropdownProps {
    dropdownList: IDropdownListProps[];
    placeholder: string;
    className: string;
    initValue?: string;
    callback: any;
}

export interface IPermittedUser {
    id: string,
    vesting_reports_ids: string,
    added_by: string
}

export interface IMultiDropdownProps {
    dropdownList: IServerRole[];
    placeholder: string;
    className: string;
    callback: any;
}

export interface IChannel {
    id: string;
    name: string;
    type: string;
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
    bidders: {
        id: string,
        username: string,
        avatar: string
    }[],
    bidderWallets: string[],
    bidEntryTimes: number[],
    SQLID: number,
    finalEntrantsNumber: number,
    entrantsNumber: number,
    winners?: string[],
    ended_reason: string
}

export interface IBiddersGiveaway {
    bidders: string[],
    giveaway: string
}

export interface IDashboardres {
    serverList: IServer[],
    biddersGiveawayList: IBiddersGiveaway[],
    initGiveawayList: IGiveaway[]
}

export interface IServer {
    guildID: string,
    guild: {
        id: string,
        name: string,
        iconURL: string,
        memberCount: number
    },
    admins: string[],
    owner: string
}

export interface IActiveServer {
    name: string,
    icon: string,
    members: string
}

export interface IRemoveEntrants {
    marketID: string;
    serverID: string;
    removeUserID: string;
}

export interface IServerCardProps {
    id: string
    name: string;
    rediskey: string;
    createdBy: string;
    paymentExpires: number;
    marketChannel: string;
    generalChannel: string;
    submitWallet: string;
    vestingChannel: string;
    reminderChannel: string;
    winnersChannel: string;
    adminImg?: string;
    serverImg?: string;
}

export interface IGiveawayCardProps {
    giveawayID: string;
    title: string;
    avatar: string;
    chain?: string;
    entrants?: number;
    quantity?: number;
    enterDate?: string;
    timeRemaining: number;
    harvested: boolean;
    bidders: {
        id: string,
        username: string,
        avatar: string
    }[];
    winners?: string[];
}

export interface IPreviewCardProps {
    title: string,
    description: string
    type: string,
    expiry: string,
    winningRole?: IServerRole,
    chain: string,
    quantity: number,
    links: string,
    restricted: IServerRole[],
    required: IServerRole[],
    requirements: string,
    requiredAllRoles: boolean,
    price?: number
}

export interface IServerRole {
    id: string,
    name: string,
    color: string,
    position?: number,
}

export interface IAdminProps { }