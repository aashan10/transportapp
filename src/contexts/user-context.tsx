import React, {createContext, useEffect, useState} from 'react';
import {Exception, userInfo} from '../api/requests';
import {ToastAndroid} from "react-native";

interface UserInterface {
  token: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  role: string;
}

declare global {
  interface Global {
    user: UserInterface;
  }
}

let sharedData: Global = {
  user: {
    token: '',
    name: '',
    phoneNumber: '',
    email: '',
    role: '',
    address: '',
  },
};

interface UserContextState {
  user: UserInterface;
  setUser: (user: Partial<UserInterface>) => void;
}

export const UserContext = createContext<UserContextState>({
  user: {
    token: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    role: '',
  },
  setUser: (user: Partial<UserInterface>) => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserInterface>({
    token: '',
    email: '',
    phoneNumber: '',
    address: '',
    name: '',
    role: '',
  });
  const {token} = user;
  useEffect(() => {
    userInfo(user.token)
      .then(response => {
        const {name, email, phoneNumber, address, role} = response;
        setUser({
          ...user,
          name: name[0].toUpperCase() + name.slice(1),
          email: email,
          address: address,
          role: role,
          phoneNumber: phoneNumber,
        });
        sharedData.user = user;
      })
      .catch(() => {
        ToastAndroid.show('Unable to fetch user data', 5000);
      });
  }, [token, user.token]);
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: (userData: Partial<UserInterface>) => {
          const newUserData = {...user, ...userData};
          setUser(newUserData);
        },
      }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, sharedData};
export default UserContext;
