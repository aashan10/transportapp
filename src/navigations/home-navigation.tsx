import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerComponent from '../components/drawer';
import SettingsScreen from '../screens/settings-screen';
import UserContext from '../contexts/user-context';
import VendorNavigation from './vendor-navigation';
import DriverNavigation from './driver-navigation';
import LocalizationContext from '../contexts/localization-context';
import History from '../screens/history-screen';
import DriverProfileScreen from '../screens/profile-driver';
import Contact from '../screens/contact-screen';
import PickupNavigation from './pickup-navigation';
import HistoryNavigation from './history-navigator';

const HomeNavigation = () => {
  const Drawer = createDrawerNavigator();
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);

  return (
    <Drawer.Navigator
      drawerType={'front'}
      drawerContent={(props: any) => <DrawerComponent {...props} />}>
      <Drawer.Screen
        name={'home'}
        options={{
          drawerLabel:
            user.role === 'vendor'
              ? currentLanguage.vendorHome
              : currentLanguage.driverHome,
        }}
        component={user.role === 'vendor' ? VendorNavigation : DriverNavigation}
      />

      {user.role === 'driver' ? (
        <Drawer.Screen
          name={'myPickups'}
          options={{drawerLabel: currentLanguage.myPickups}}
          component={PickupNavigation}
        />
      ) : null}
      {user.role === 'driver' ? (
        <Drawer.Screen
          name={'history'}
          options={{drawerLabel: currentLanguage.history}}
          component={HistoryNavigation}
        />
      ) : null}
      <Drawer.Screen
        name={'profile'}
        options={{drawerLabel: currentLanguage.profile}}
        component={DriverProfileScreen}
      />
      <Drawer.Screen
        name={'contact'}
        options={{drawerLabel: currentLanguage.contact}}
        component={Contact}
      />
      <Drawer.Screen
        options={{drawerLabel: currentLanguage.setting}}
        name={'settings'}
        component={SettingsScreen}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigation;
