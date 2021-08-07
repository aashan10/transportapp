/* eslint-disable react-hooks/exhaustive-deps */
import React, {createContext, useEffect, useState} from 'react';
import {userInfo} from '../api/requests';
import {ToastAndroid} from 'react-native';
import {getToken, storeToken} from '../storage/user-storage';

interface UserInterface {
  id: string;
  token: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  role: string;
  licenseAndBillBook: Array<string>;
  companyName?: string;
}

declare global {
  interface Global {
    user: UserInterface;
  }
}

let sharedData: Global = {
  user: {
    id: '',
    token: '',
    name: '',
    phoneNumber: '',
    email: '',
    role: '',
    address: '',
    licenseAndBillBook: [],
    companyName: undefined,
  },
};

interface UserContextState {
  user: UserInterface;
  setUser: (user: Partial<UserInterface>) => void;
}

export const UserContext = createContext<UserContextState>({
  user: {
    id: '',
    token: '',
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    role: '',
    licenseAndBillBook: [],
    companyName: undefined,
  },
  setUser: (user: Partial<UserInterface>) => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserInterface>({
    id: '',
    token: '',
    email: '',
    phoneNumber: '',
    address: '',
    name: '',
    role: '',
    licenseAndBillBook: [],
    companyName: undefined,
  });
  const {token} = user;
  useEffect(() => {
    sharedData.user = user;
  }, [user]);
  useEffect(() => {
    getToken()
      .then(storageToken => {
        if (
          storageToken !== null &&
          storageToken !== '' &&
          storageToken !== user.token
        ) {
          setUser({...user, token: storageToken});
        }
      })
      .catch();
    userInfo(user.token)
      .then(response => {
        const {name, email, phoneNumber, address, role, licenseAndBillBook} =
          response;
        setUser({
          ...user,
          name: name[0].toUpperCase() + name.slice(1),
          email: email,
          address: address,
          role: role,
          licenseAndBillBook: licenseAndBillBook ?? [],
          phoneNumber: phoneNumber,
          companyName: response.companyName ?? '',
        });

        storeToken(token)
          .then()
          .catch(() => {
            ToastAndroid.show(
              'Unable to persist login information. You might need to re-login once the application is reopened',
              5000,
            );
          });
        sharedData.user = user;
      })
      .catch(async () => {
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
          storeToken(newUserData.token)
            .then()
            .catch(() => {
              ToastAndroid.show(
                'Unable to persist login information. You might need to re-login once the application is reopened',
                5000,
              );
            });
        },
      }}>
      {children}
    </UserContext.Provider>
  );
};
export {UserProvider, sharedData};
export default UserContext;
