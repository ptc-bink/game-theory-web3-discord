import { createContext, useContext } from "react";
import { removeEntry, getUserGlobalPermission } from '../hook';

interface ContextType {
  addServerModalOpen: boolean;
  editServerModalID: number;
  profileModalOpen: boolean;
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
  allocationEdited: boolean;
  allocationDeleted: boolean;
  giveawayCreated: boolean;
  giveawayEdited: boolean;
  showCreditCard: boolean;
  serverID: string;
  isRemoveEntry: boolean;
  userGlobalPermission: any;
  isAdminOfSelectedServer_app: boolean;
  setUserGlobalPermission: (userGlobalPermission: any) => void,
  setIsRemoveEntry: (removeEntry: boolean) => void,
  setShowCreditCard: (showCreditCard: boolean) => void,
  setGiveawayCreated: (giveawayCreated: boolean) => void,
  setGiveawayEdited: (giveawayEdited: boolean) => void,
  setPermittedUserModalOpen: (permittedUserModalOpen: boolean) => void,
  setAddAllocationModalOpen: (addAllocationModalOpen: boolean) => void,
  setRemoveEntrantModalOpen: (removeEntrantModalOpen: boolean) => void;
  setAllocationEdited: (allocationEdited: boolean) => void;
  setAllocationDeleted: (allocationDeleted: boolean) => void;
  setRemoveApproval: (removeApproval: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSelectedGiveawayID: (seletedGiveawayID: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setAddServerModalOpen: (addServerModalOpen: boolean) => void;
  setEditServerModalID: (editServerModalID: number) => void;
  setProfileModalOpen: (profileModalOpen: boolean) => void;
  setUserID: (userID: string) => void;
  setUsername: (username: string) => void;
  setUserImage: (userImage: string) => void;
  setServerID: (serverID: string) => void;
  setIsAdminOfSelectedServer_app: (isAdminOfSelectedServer_app: boolean) => void;
}

const initialValue: ContextType = {
  addServerModalOpen: false,
  editServerModalID: 0,
  removeEntrantModalOpen: false,
  profileModalOpen: false,
  userID: "",
  userImage: "",
  username: "",
  isAdmin: false,
  selectedGiveawayID: "",
  isLoading: false,
  addAllocationModalOpen: false,
  permittedUserModalOpen: false,
  removeApproval: false,
  allocationEdited: false,
  allocationDeleted: false,
  giveawayCreated: false,
  giveawayEdited: false,
  showCreditCard: false,
  serverID: "",
  isRemoveEntry: false,
  userGlobalPermission: {isAdmin:[], isSuperAdmin:[], canViewVesting:[], isMember:[]},
  isAdminOfSelectedServer_app: false,
  setUserGlobalPermission(userGlobalPermission) { },
  setIsRemoveEntry(isRemoveEntry) { },
  setShowCreditCard(showCreditCard) { },
  setGiveawayCreated(giveawayCreated) { },
  setGiveawayEdited(giveawayEdited) { },
  setAllocationEdited(allocationEdited) { },
  setAllocationDeleted(allocationDeleted) { },
  setPermittedUserModalOpen(permittedUserModalOpen) { },
  setAddAllocationModalOpen(addAllocationModalOpen) { },
  setRemoveEntrantModalOpen(removeEntrantModalOpen) { },
  setRemoveApproval(removeApproval) { },
  setIsLoading: (isLoading) => { },
  setSelectedGiveawayID: (selectedGiveawayID) => { },
  setIsAdmin: (isAdmin) => { },
  setUserImage: (userImage) => { },
  setUsername: (username) => { },
  setUserID: (userID) => { },
  setServerID: (serverID) => { },
  setAddServerModalOpen: (addServerModalOpen) => { },
  setEditServerModalID: (editServerModalID) => { },
  setProfileModalOpen: (profileModalOpen) => { },
  setIsAdminOfSelectedServer_app: (isAdminOfSelectedServer_app) => { },
};

const AppContext = createContext(initialValue);

export default AppContext;
