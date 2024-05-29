"use client"

import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { IChannel, IServer } from "../utils/_type";

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
  const [selectedGiveawayID, setSelectedGiveawayID] = useState<string>("");
  const [removeEntrantModalOpen, setRemoveEntrantModalOpen] = useState<boolean>(false);
  const [permittedUserModalOpen, setPermittedUserModalOpen] = useState<boolean>(false);
  const [removeApproval, setRemoveApproval] = useState<boolean>(false);
  const [allChannelList, setAllChannelList] = useState<IChannel[]>([]);

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
        selectedGiveawayID,
        removeEntrantModalOpen,
        addAllocationModalOpen,
        permittedUserModalOpen,
        removeApproval,
        allChannelList,
        setAllChannelList,
        setRemoveApproval,
        setPermittedUserModalOpen,
        setAddAllocationModalOpen,
        setRemoveEntrantModalOpen,
        setSelectedGiveawayID,
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
