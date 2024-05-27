import { createContext, useContext } from "react";
import { IServer } from "../utils/_type";

interface ContextType {
  addServerModalOpen: boolean;
  editServerModalOpen: boolean;
  profileModalOpen: boolean;
  serverID: string;
  userID: string;
  username: string;
  userImage: string;
  isAdmin: boolean;
  giveawayID: string;
  isLoading: boolean;
  marketChannelList: any[];
  generalChannelList: any[];
  serverList: IServer[];
  removeEntrantModalOpen: boolean;
  addAllocationModalOpen: boolean;
  permittedUserModalOpen: boolean;
  setPermittedUserModalOpen: (permittedUserModalOpen: boolean) => void,
  setAddAllocationModalOpen: (addAllocationModalOpen: boolean) => void,
  setRemoveEntrantModalOpen: (removeEntrantModalOpen: boolean) => void;
  setServerList: (serverList: IServer[]) => void;
  setGeneralChannelList: (generalChannelList: any[]) => void;
  setMarketChannelList: (marketChannelList: any[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setGiveawayID: (giveawayID: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setAddServerModalOpen: (addServerModalOpen: boolean) => void;
  setEditServerModalOpen: (editServerModalOpen: boolean) => void;
  setProfileModalOpen: (profileModalOpen: boolean) => void;
  setServerID: (serverID: string) => void;
  setUserID: (userID: string) => void;
  setUsername: (username: string) => void;
  setUserImage: (userImage: string) => void;
}

const initialValue: ContextType = {
  addServerModalOpen: false,
  editServerModalOpen: false,
  removeEntrantModalOpen: false,
  profileModalOpen: false,
  serverID: "",
  userID: "",
  userImage: "",
  username: "",
  isAdmin: true,
  giveawayID: "",
  isLoading: false,
  marketChannelList: [],
  generalChannelList: [],
  serverList: [],
  addAllocationModalOpen: false,
  permittedUserModalOpen: false,
  setPermittedUserModalOpen(permittedUserModalOpen) { },
  setAddAllocationModalOpen(addAllocationModalOpen) { },
  setRemoveEntrantModalOpen(removeEntrantModalOpen) { },
  setServerList(serverList) { },
  setGeneralChannelList: (generalChannelList) => { },
  setMarketChannelList: (marketChannelIdList) => { },
  setIsLoading: (isLoading) => { },
  setGiveawayID: (giveawayID) => { },
  setIsAdmin: (isAdmin) => { },
  setUserImage: (userImage) => { },
  setUsername: (username) => { },
  setUserID: (userID) => { },
  setServerID: (serverID) => { },
  setAddServerModalOpen: (addServerModalOpen) => { },
  setEditServerModalOpen: (editServerModalOpen) => { },
  setProfileModalOpen: (profileModalOpen) => { },
};

const AppContext = createContext(initialValue);

export default AppContext;
