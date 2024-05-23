"use client"

import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [addServerModalOpen, setAddServerModalOpen] = useState<boolean>(false);
  const [editServerModalOpen, setEditServerModalOpen] = useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [serverID, setServerID] = useState<string>("");
  const [userID, setUserID] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
