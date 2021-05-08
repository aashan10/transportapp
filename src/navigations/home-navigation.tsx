import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../screens/home-screen';
import DrawerComponent from '../components/drawer';
import SettingsScreen from '../screens/settings-screen';
import UserContext from '../contexts/user-context';
import CreateItem from '../screens/create-item';

const HomeNavigation = () => {
  const {user} = useContext(UserContext);
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerContent={(props: any) => <DrawerComponent {...props} />}>
      <Drawer.Screen name={'home'} component={HomeScreen} />
      {user.role === 'vendor' ? (
        <Drawer.Screen name={'create Request'} component={CreateItem} />
      ) : null}
      <Drawer.Screen name={'settings'} component={SettingsScreen} />
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
