import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ItemDetails from '../screens/item-details';
import ItemDetailsMap from '../screens/item-details-map';
import History from '../screens/history-screen';

const Stack = createStackNavigator();

const HistoryNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'pickups'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'pickups'} component={History} />
      <Stack.Screen name={'detailsScreen'} component={ItemDetails} />
      <Stack.Screen name={'map'} component={ItemDetailsMap} />
    </Stack.Navigator>
  );
};

export default HistoryNavigation;
