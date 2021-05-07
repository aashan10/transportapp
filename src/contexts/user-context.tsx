import React, {createContext, useState} from 'react';

interface UserInterface {}

interface UserContextState {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
}

export const UserContext = createContext<Partial<UserContextState>>({});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserInterface | null>(null);
  return (
    <UserContext.Provider value={{user: user, setUser: setUser}}>
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider};
export default UserContext;
