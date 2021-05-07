import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/login-screen';
import HomeNavigation from './home-navigation';
import RegisterScreen from '../screens/auth/register/register';
import RegisterVendorScreen from '../screens/auth/register/register-vendor-screen';
import RegisterDriverScreen from '../screens/auth/register/register-driver-screen';

const AuthNavigation = () => {
  const Navigator = createStackNavigator();

  return (
    <Navigator.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'login'}>
      <Navigator.Screen name={'login'} component={LoginScreen} />
      <Navigator.Screen name={'register'} component={RegisterScreen} />
      <Navigator.Screen
        name={'registerVendor'}
        component={RegisterVendorScreen}
      />
      <Navigator.Screen
        name={'registerDriver'}
        component={RegisterDriverScreen}
      />
      <Navigator.Screen name={'home'} component={HomeNavigation} />
    </Navigator.Navigator>
  );
};

export default AuthNavigation;
