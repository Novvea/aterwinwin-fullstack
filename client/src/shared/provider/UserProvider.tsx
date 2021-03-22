import { useState, createContext, ReactChild } from "react";
import { i_loginCredentials } from '../interface/Interface'

export const UserContext = createContext<any>(null);

export const UserProvider = (props: { children: React.ReactChild }) => {
  const [authUserContext, setAuthUserContext] = useState();

  const { children } = props;

  return (
    <UserContext.Provider value={[authUserContext, setAuthUserContext]}>
      {children}
    </UserContext.Provider>
  );
};
