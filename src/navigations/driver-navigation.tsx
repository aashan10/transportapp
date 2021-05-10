import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import CreateItem from '../screens/create-item';
import ItemDetails from '../screens/item-details';
import HomeScreen from '../screens/home-screen';

const Driver = createStackNavigator();

const DriverNavigation = () => {
  return (
    <Driver.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'driverHome'}>
      <Driver.Screen name={'driverHome'} component={HomeScreen} />
      <Driver.Screen name={'view Requests'} component={CreateItem} />
      <Driver.Screen name={'viewRequest'} component={ItemDetails} />
    </Driver.Navigator>
  );
};

export default DriverNavigation;
