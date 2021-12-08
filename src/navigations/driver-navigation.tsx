import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateItem from '../screens/delivery-request/delivery-screen';
import ItemDetails from '../screens/item-details';
import HomeScreen from '../screens/home-screen';
import ItemDetailsMap from '../screens/item-details-map';

const Driver = createStackNavigator();

const DriverNavigation = () => {
  return (
    <Driver.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'driverHome'}>
      <Driver.Screen name={'driverHome'} component={HomeScreen} />
      <Driver.Screen name={'view Requests'} component={CreateItem} />
      <Driver.Screen name={'detailsScreen'} component={ItemDetails} />
      <Driver.Screen name={'map'} component={ItemDetailsMap} />
    </Driver.Navigator>
  );
};

export default DriverNavigation;
