import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home-screen';
import DrawerComponent from '../components/drawer';
import SettingsScreen from '../screens/settings-screen';
import UserContext from '../contexts/user-context';
import VendorNavigation from './vendor-navigation';
import DriverNavigation from './driver-navigation';
import MyPickups from '../screens/my-pickups';

const HomeNavigation = () => {
  const {user} = useContext(UserContext);
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerContent={(props: any) => <DrawerComponent {...props} />}>
      <Drawer.Screen
        name={user.role === 'vendor' ? 'vendor Home' : 'driver Home'}
        component={user.role === 'vendor' ? VendorNavigation : DriverNavigation}
      />
      <Drawer.Screen name={'settings'} component={SettingsScreen} />
      {user.role === 'driver' ? (
        <Drawer.Screen name={'my Pickups'} component={MyPickups} />
      ) : null}
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
