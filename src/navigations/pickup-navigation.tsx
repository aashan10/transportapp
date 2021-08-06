import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MyPickups from '../screens/my-pickups';
import ItemDetails from '../screens/item-details';
import ItemDetailsMap from '../screens/item-details-map';

const Stack = createStackNavigator();

const PickupNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'pickups'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'pickups'} component={MyPickups} />
      <Stack.Screen name={'detailsScreen'} component={ItemDetails} />
      <Stack.Screen name={'map'} component={ItemDetailsMap} />
    </Stack.Navigator>
  );
};

export default PickupNavigation;
