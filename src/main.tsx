import React, {useEffect} from 'react';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './navigations/auth-navigation';
import CustomStatusBar from './components/status-bar';
import {UserProvider} from './contexts/user-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ThemeProvider, {ThemeContext} from './contexts/theme-context';
import {LocalizationProvider} from './contexts/localization-context';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Alert, Linking} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Main = () => {
  useEffect(() => {
    Alert.alert(
      'Location Access',
      `Transport Nepal app uses location services to show your current location on map in real time. The location is required on the following features
      
      \t - To get the current location of the 
      \t \t driver and show the location on the 
      \t \t map.
      \t - To get current location of vendor to 
      \t \t show it in the pickup location for 
      \t \t driver.
      
The location information is collected on background and is updated every few seconds for the best experience while using the application. 

If you want to use these features, please press 'I Agree' to consent to providing the location information to us. For more info, please see our privacy policy.
      `,
      [
        {
          text: 'Privacy Policy',
          onPress: () => {
            Linking.openURL(
              'https://www.freeprivacypolicy.com/live/e831f385-134e-45b6-87a7-2824cbb69d2e',
            )
              .then()
              .catch();
          },
        },
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'I Agree',
          onPress: () => {
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then(permission => {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
                  interval: 10000,
                  fastInterval: 5000,
                })
                  .then(loc => {
                    console.log(loc);
                  })
                  .catch(() => {});
                if (permission !== RESULTS.GRANTED) {
                  Alert.alert(
                    'Location Permission Not Available',
                    'Some of the features of this app might not work correctly since location permission is not granted!',
                  );
                }
              })
              .catch(() => {
                Alert.alert(
                  'Location Permission Access',
                  'This application uses location services to pinpoint your location on map. You can revoke the permissions in your app settings under the permissions section, but this might cause unexpected behaviours on the application.',
                  [
                    {
                      text: 'Open Settings',
                      onPress: () => {
                        openSettings()
                          .then()
                          .catch(() => {});
                      },
                    },
                    {
                      text: 'Ok',
                      onPress: () => {},
                    },
                  ],
                );
              });
          },
        },
      ],
    );
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <LocalizationProvider>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {({theme}) => (
              <ApplicationProvider {...eva} theme={theme}>
                <CustomStatusBar />
                <UserProvider>
                  <Layout
                    style={{
                      height: '100%',
                      width: '100%',
                      backgroundColor: 'transparent',
                    }}>
                    <NavigationContainer>
                      <AuthNavigation />
                    </NavigationContainer>
                  </Layout>
                </UserProvider>
              </ApplicationProvider>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </LocalizationProvider>
    </>
  );
};

export default Main;
