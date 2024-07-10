"use client"

import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";
import { IChannel, IServer } from "../utils/_type";

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
  const [permittedUserModalOpen, setPermittedUserModalOpen] = useState<boolean>(false);
  const [removeApproval, setRemoveApproval] = useState<boolean>(false);
  const [allocationDeleted, setAllocationDeleted] = useState<boolean>(false);
  const [allocationEdited, setAllocationEdited] = useState<boolean>(false);
  const [giveawayCreated, setGiveawayCreated] = useState<boolean>(false);
  const [showCreditCard, setShowCreditCard] = useState<boolean>(false);
  const [giveawayEdited, setGiveawayEdited] = useState<boolean>(false);
  const [isRemoveEntry, setIsRemoveEntry] = useState<boolean>(false);


  return (
    <AppContext.Provider
      value={{
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default UserProvider;
