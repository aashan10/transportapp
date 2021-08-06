import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateItem from '../screens/create-item';
import ItemDetails from '../screens/item-details';
import HomeScreen from '../screens/home-screen';
import MyPickups from '../screens/my-pickups';
import ItemDetailsMap from '../screens/item-details-map';
// import History from '../screens/item-delivery-detail';

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
