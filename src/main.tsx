import React from 'react';
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
import {Alert} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

const Main = () => {
  request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then(permission => {
      RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      })
        .then()
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
