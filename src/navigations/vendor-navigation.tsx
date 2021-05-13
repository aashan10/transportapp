import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateItem from '../screens/create-item';
import VendorHomeScreen from '../screens/vendor-home-screen';
import ItemDetails from '../screens/item-details';

const Vendor = createStackNavigator();

const VendorNavigation = () => {
  return (
    <Vendor.Navigator screenOptions={{headerShown: false}}>
      <Vendor.Screen name={'vendorHome'} component={VendorHomeScreen} />
      <Vendor.Screen name={'createRequest'} component={CreateItem} />
      <Vendor.Screen name={'viewRequest'} component={ItemDetails} />
    </Vendor.Navigator>
  );
};

export default VendorNavigation;
