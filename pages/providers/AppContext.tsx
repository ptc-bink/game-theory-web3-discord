import { createContext, useContext } from "react";
import { IChannel, IServer } from "../utils/_type";

interface ContextType {
  addServerModalOpen: boolean;
  editServerModalOpen: boolean;
  profileModalOpen: boolean;
  serverID: string;
  userID: string;
  username: string;
  userImage: string;
  isAdmin: boolean;
  selectedGiveawayID: string;
  isLoading: boolean;
  removeEntrantModalOpen: boolean;
  removeApproval: boolean;
  addAllocationModalOpen: boolean;
  permittedUserModalOpen: boolean;
  allChannelList: IChannel[];
  setAllChannelList: (allChainList: IChannel[]) => void,
  setPermittedUserModalOpen: (permittedUserModalOpen: boolean) => void,
  setAddAllocationModalOpen: (addAllocationModalOpen: boolean) => void,
  setRemoveEntrantModalOpen: (removeEntrantModalOpen: boolean) => void;
  setRemoveApproval: (removeApproval: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSelectedGiveawayID: (seletedGiveawayID: string) => void;
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
  selectedGiveawayID: "",
  isLoading: false,
  addAllocationModalOpen: false,
  permittedUserModalOpen: false,
  removeApproval: false,
  allChannelList: [],
  setAllChannelList(allChannelList) { },
  setPermittedUserModalOpen(permittedUserModalOpen) { },
  setAddAllocationModalOpen(addAllocationModalOpen) { },
  setRemoveEntrantModalOpen(removeEntrantModalOpen) { },
  setRemoveApproval(rremoveApproval) { },
  setIsLoading: (isLoading) => { },
  setSelectedGiveawayID: (selectedGiveawayID) => { },
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
