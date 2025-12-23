"use client";
import React, { useState, ReactNode } from "react";
import userContext from "./userContext";

interface UserStateProps {
  children: ReactNode;
}

interface User {
  [key: string]: any;
}

const UserState: React.FC<UserStateProps> = ({ children }) => {
  const [user, setUser] = useState<User | string>("");

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserState;
