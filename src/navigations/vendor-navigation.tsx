import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import CreateItem from '../screens/create-item';

const Vendor = createStackNavigator();

const VendorNavigation = () => {
  return (
    <Vendor.Navigator screenOptions={{headerShown: false}}>
      <Vendor.Screen name={'vendorHome'} component={HomeScreen} />
      <Vendor.Screen name={'createRequest'} component={CreateItem} />
    </Vendor.Navigator>
  );
};

export default VendorNavigation;
