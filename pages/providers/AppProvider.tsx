"use client"

import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { IServer } from "../utils/_type";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [addServerModalOpen, setAddServerModalOpen] = useState<boolean>(false);
  const [editServerModalOpen, setEditServerModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [addAllocationModalOpen, setAddAllocationModalOpen] = useState<boolean>(false);
  const [serverID, setServerID] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [giveawayID, setGiveawayID] = useState<string>("");
  const [removeEntrantModalOpen, setRemoveEntrantModalOpen] = useState<boolean>(false);
  const [marketChannelList, setMarketChannelList] = useState<any[]>([]);
  const [generalChannelList, setGeneralChannelList] = useState<any[]>([]);
  const [serverList, setServerList] = useState<IServer[]>([]);

  return (
    <AppContext.Provider
      value={{
        addServerModalOpen,
        editServerModalOpen,
        profileModalOpen,
        serverID,
        userID,
        username,
        userImage,
        isAdmin,
        isLoading,
        giveawayID,
        marketChannelList,
        generalChannelList,
        removeEntrantModalOpen,
        serverList,
        addAllocationModalOpen,
        setAddAllocationModalOpen,
        setRemoveEntrantModalOpen,
        setServerList,
        setGeneralChannelList,
        setMarketChannelList,
        setGiveawayID,
        setIsLoading,
        setIsAdmin,
        setUserImage,
        setUsername,
        setServerID,
        setUserID,
        setAddServerModalOpen,
        setEditServerModalOpen,
        setProfileModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
