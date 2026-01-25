"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { User } from "@/lib/actions/data-fetchers";
import { UserActivityContextType } from "@/types";

const UserActivityContext = createContext<UserActivityContextType | undefined>(
  undefined,
);

export const UserActivityProvider = ({
  children,
  userData,
  defaultUser,
}: {
  children: React.ReactNode;
  userData?: User[];
  defaultUser?: User | null;
}) => {
  const [selectedUser, setSelectedUser] = useState({
    userid: "",
    isSelected: false,
    name: "",
  });

  const value = useMemo(
    () => ({
      selectedUser,
      setSelectedUser,
    }),
    [selectedUser],
  );

  return (
    <UserActivityContext.Provider value={value}>
      {children}
    </UserActivityContext.Provider>
  );
};

export const useUserActivity = () => {
  const context = useContext(UserActivityContext);
  if (!context) {
    throw new Error("useUserActivity must be used within UserActivityProvider");
  }
  return context;
};
