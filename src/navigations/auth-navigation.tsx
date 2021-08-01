import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/login-screen';
import HomeNavigation from './home-navigation';
import RegisterScreen from '../screens/auth/register/register';
import RegisterVendorScreen from '../screens/auth/register/register-vendor-screen';
import RegisterDriverScreen from '../screens/auth/register/register-driver-screen';
import UserContext from '../contexts/user-context';
import ForgotPasswordScreen from '../screens/auth/recover/forgot-password-screen';
import EmailVerificationScreen from '../screens/auth/recover/email-verification-screen';
import VerifyAccountScreen from '../screens/auth/verify/verify-account-screen';
import SendVerificationCodeScreen from '../screens/auth/verify/send-verification-code-screen';
import ItemDetailsMap from '../screens/item-details-map';

const AuthNavigation = () => {
  const {user} = useContext(UserContext);
  const Navigator = createStackNavigator();
  return (
    <Navigator.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={user.token ? 'home' : 'login'}>
      <Navigator.Screen name={'login'} component={LoginScreen} />
      <Navigator.Screen name={'register'} component={RegisterScreen} />
      <Navigator.Screen
        name={'forgotPassword'}
        component={ForgotPasswordScreen}
      />
      <Navigator.Screen
        name={'recoverPassword'}
        component={EmailVerificationScreen}
      />
      <Navigator.Screen
        name={'sendVerificationCodeScreen'}
        component={SendVerificationCodeScreen}
      />
      <Navigator.Screen
        name={'verifyAccount'}
        component={VerifyAccountScreen}
      />
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
