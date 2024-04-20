import React, { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";

const initialState = {
  isLogged: false,
  setIsLogged: (() => {}) as Dispatch<SetStateAction<boolean>>,
};

export const UserContext = createContext(initialState);

const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  return (
    <UserContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
