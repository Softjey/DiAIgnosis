import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { User } from "./users";

const initialState = {
  user: null as User | null,
  setUser: (() => {}) as Dispatch<SetStateAction<User | null>>,
};

export const UserContext = createContext(initialState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
