import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home-screen';
import DrawerComponent from '../components/drawer';
import SettingsScreen from '../screens/settings-screen';

const HomeNavigation = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerContent={(props: any) => <DrawerComponent {...props} />}>
      <Drawer.Screen name={'home'} component={HomeScreen} />
      <Drawer.Screen name={'settings'} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
