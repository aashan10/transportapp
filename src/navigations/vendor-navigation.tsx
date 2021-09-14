import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateItem from '../screens/create-item';
import VendorHomeScreen from '../screens/vendor-home-screen';
import ItemDetails from '../screens/item-details';
import ItemDetailsMap from '../screens/item-details-map';
import PickupScreen from '../screens/delivery-request/pickup-screen';
import DeliveryScreen from '../screens/delivery-request/delivery-screen';
import CreateDeliveryRequestScreen from '../screens/delivery-request/create-delivery-request-screen';

const Vendor = createStackNavigator();

const DeliveryRequest = createStackNavigator();

const DeliveryRequestNavigator = () => {
  return (
    <DeliveryRequest.Navigator
      initialRouteName="pickup"
      screenOptions={{headerShown: false}}>
      <Vendor.Screen name={'pickup'} component={PickupScreen} />
      <Vendor.Screen name={'delivery'} component={DeliveryScreen} />
      <Vendor.Screen
        name={'createDeliveryRequest'}
        component={CreateDeliveryRequestScreen}
      />
      <Vendor.Screen name={'home'} component={VendorHomeScreen} />
    </DeliveryRequest.Navigator>
  );
};

const VendorNavigation = () => {
  return (
    <Vendor.Navigator screenOptions={{headerShown: false}}>
      <Vendor.Screen name={'vendorHome'} component={VendorHomeScreen} />
      <Vendor.Screen
        name={'createRequest'}
        component={DeliveryRequestNavigator}
      />
      <Vendor.Screen name={'detailsScreen'} component={ItemDetails} />
      <Vendor.Screen name={'map'} component={ItemDetailsMap} />
    </Vendor.Navigator>
  );
};

export default VendorNavigation;
