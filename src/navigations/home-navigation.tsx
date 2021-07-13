import React, {useContext, useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerComponent from '../components/drawer';
import SettingsScreen from '../screens/settings-screen';
import UserContext from '../contexts/user-context';
import VendorNavigation from './vendor-navigation';
import DriverNavigation from './driver-navigation';
import MyPickups from '../screens/my-pickups';
import LocalizationContext from '../contexts/localization-context';
import History from '../screens/history-screen';
import DriverProfileScreen from '../screens/profile-driver';

const HomeNavigation = () => {
  const Drawer = createDrawerNavigator();
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);

  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerContent={(props: any) => <DrawerComponent {...props} />}>
      <Drawer.Screen
        name={user.role === 'vendor' ? 'vendor Home' : 'driver Home'}
        options={{
          drawerLabel:
            user.role === 'vendor'
              ? currentLanguage.vendorHome
              : currentLanguage.driverHome,
        }}
        component={user.role === 'vendor' ? VendorNavigation : DriverNavigation}
      />
      <Drawer.Screen
        options={{drawerLabel: currentLanguage.setting}}
        name={'settings'}
        component={SettingsScreen}
      />
      {user.role === 'driver' ? (
        <Drawer.Screen
          name={'my Pickups'}
          options={{drawerLabel: currentLanguage.myPickups}}
          component={MyPickups}
        />
      ) : null}
      {user.role === 'driver' ? (
        <Drawer.Screen
          name={'History'}
          options={{drawerLabel: currentLanguage.history}}
          component={History}
        />
      ) : null}
      {user.role === 'driver' ? (
        <Drawer.Screen
          name={'Profile'}
          options={{drawerLabel: currentLanguage.profile}}
          component={DriverProfileScreen}
        />
      ) : null}
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
