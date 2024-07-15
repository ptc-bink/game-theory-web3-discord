export interface IAdministrationTrustedServers {
    id: string;
    serverID: string;
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
        owner: {
            avatar: string,
            id: string,
            username: string
            displayAvatarURL: string
            displayName: string
        }
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
    },
    channelList: IChannel[]
}

export interface IEditServerModalProps {
    key: number;
    server: string;
    rediskey: string;
    marketChannel: string;
    generalChannel: string;
    submitWallet: string;
    vestingChannel: string;
    reminderChannel: string;
    winnersChannel: string;
    channelList: IChannel[];
}

export interface IUserProfile {
    username: string,
    id: string,
    avatar: string,
    ETH_HOT: number
    ETH_COLD: number
    BTC_HOT: number
    BTC_COLD: number
    SOL_HOT: number
    SOL_COLD: number
}

export interface IProfileEdit {
    ETH_HOT?: string,
    ETH_COLD?: string,
    BTC_HOT?: string,
    BTC_COLD?: string,
    SOL_HOT?: string,
    SOL_COLD?: string,
}

export interface ISetAllocation {
    serverId: string,
    title: string,
    amount: string,
    allocation_id?: string,
    contract?: string,
    mintdate?: number,
    mintHoldDays?: number,
    secondaryHoldDays?: number,
    secondaryBuyHours?: number,
    secondaryBuyAmount: number,
    floorPriceVoid?: number
}

export interface IAllocation {
    id: number,
    title: string,
    allocation: number,
    for_server: string,
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

export interface ISetVestingParams {
    serverId: string,
    contract: string,
    mintDate: string,
    mintHoldDays: string,
    secondaryHoldDays?: number,
    secondaryBuyHours?: number,
    secondaryBuyAmount?: number,
    floorPriceVoid?: string
}

export interface IVestingReportListItem {
    id: number,
    title: string,
    last_updated: number,
    guild: string
}

export interface IVestingReport {
    reportID: number,
    serverID: string,
    user_id: string,
    NFTs_held: number
    NFTs_bought: number
    Held_Bought_for_Days: number
    Amount_Spent_NFTs: string,
    NFTs_minted: number
    Held_Minted_for_Days: number
    NFTs_sold: number
    Amount_Earned_NFTs: string
    NFTs_transferred: number,
    wallet1: string,
    wallet2: string
    last_updated: string
    passed_vesting: number
    transaction_hashes: {
        type: string,
        hash: string
    }[]
    username: string
}

export interface ICreateGiveaway {
    serverID: string
    expires: any
    title: string
    description: string
    chain: string
    type: string
    quantity: number
    price?: number
    requiredRoles?: any
    restrictedRoles?: any
    winningRole?: any
    requireAllRoles?: boolean,
}


export interface IUpdateGiveaway {
    serverID: string,
    giveawayID: string,
    expires: any
    title: string
    description: string
    chain: string
    type: string
    quantity: number
    price?: number
    requiredRoles?: any
    restrictedRoles?: any
    winningRole?: string
    requireAllRoles?: boolean,
    image?: string,
    links: string,
    requirements: string
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
    Submit_Wallet_ID?: string,
    serverID: string,
    // name?: string,
    Vesting_Channel_ID?: string,
    Reminder_Channel_ID?: string,
    Winners_Channel_ID?: string,
    rediskey: string,
    marketChannelID: string,
    generalChannelID: string,
    date?: string
}

export interface IUserInfo {
    id: string;
    username: string;
    avatar: string;
}

export interface IUserGlobalPermission {
    isMember: Array<string>,
    isAdmin: Array<string>,
    isSuperAdmin: Array<string>,
    canViewVesting: Array<string>,
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
    initValue?: string;
}

export interface IChannel {
    id: string;
    name: string;
    type: string;
}

export interface IGiveaway {
    messageID: string,
    serverData: string,
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

export interface IUserServer {
    name: string,
    id: string,
    iconURL?: string,
    memberCount: number
}

export interface IServer {
    guildID: string,
    guild: IGuild,
    admins: string[],
    owner: string
}

export interface IGuild {
    id: string,
    name: string,
    iconURL: string,
    memberCount: number
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
    index: number,
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
    channelList: IChannel[]
}

export interface IGiveawayCardProps {
    // serverData: IGuild;
    serverData: string;
    giveawayName: string;
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
    adminOfServer: boolean;
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