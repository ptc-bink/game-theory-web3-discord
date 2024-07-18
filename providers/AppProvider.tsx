"use client"

import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { IChannel, IServer, IUserGlobalPermission } from "../utils/_type";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [addServerModalOpen, setAddServerModalOpen] = useState<boolean>(false);
  const [editServerModalID, setEditServerModalID] = useState<number>(0);
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
  const [serverRemoved, setServerRemoved] = useState<boolean>(false);
  const [permittedUserModalOpen, setPermittedUserModalOpen] = useState<boolean>(false);
  const [removeApproval, setRemoveApproval] = useState<boolean>(false);
  const [allocationDeleted, setAllocationDeleted] = useState<boolean>(false);
  const [allocationEdited, setAllocationEdited] = useState<boolean>(false);
  const [giveawayCreated, setGiveawayCreated] = useState<boolean>(false);
  const [showCreditCard, setShowCreditCard] = useState<boolean>(false);
  const [giveawayEdited, setGiveawayEdited] = useState<boolean>(false);
  const [isRemoveEntry, setIsRemoveEntry] = useState<boolean>(false);
  const [userGlobalPermission,  setUserGlobalPermission] = useState<IUserGlobalPermission>();
  const [isAdminOfSelectedServer_app, setIsAdminOfSelectedServer_app] = useState<boolean>(false);
  const [serverRemovalID, setServerRemovalID] = useState<string>("");
  return (
    <AppContext.Provider
      value={{
        serverRemoved,
        serverRemovalID,
        addServerModalOpen,
        editServerModalID,
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
        allocationDeleted,
        allocationEdited,
        giveawayCreated,
        giveawayEdited,
        showCreditCard,
        isRemoveEntry,
        userGlobalPermission,
        isAdminOfSelectedServer_app,
        setUserGlobalPermission,
        setIsRemoveEntry,
        setShowCreditCard,
        setGiveawayCreated,
        setGiveawayEdited,
        setAllocationDeleted,
        setAllocationEdited,
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
        setEditServerModalID,
        setProfileModalOpen,
        setIsAdminOfSelectedServer_app,
        setServerRemovalID,
        setServerRemoved
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
