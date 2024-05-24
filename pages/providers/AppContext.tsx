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
  profileModalOpen: false,
  serverID: "123",
  userID: "456",
  userImage: "",
  username: "",
  isAdmin: false,
  giveawayID: "",
  isLoading: true,
  setIsLoading:(isLoading)=> { },
  setGiveawayID:(giveawayID)=> { },
  setIsAdmin:(isAdmin) => { },
  setUserImage:(userImage) => { },
  setUsername:(username) => { },
  setUserID: (userID) => { },
  setServerID: (serverID) => { },
  setAddServerModalOpen: (addServerModalOpen) => { },
  setEditServerModalOpen: (editServerModalOpen) => { },
  setProfileModalOpen: (profileModalOpen) => { },
};

const AppContext = createContext(initialValue);

export default AppContext;
