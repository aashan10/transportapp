import React from 'react';
import {ApplicationProvider, IconRegistry, Layout} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './navigations/auth-navigation';
import CustomStatusBar from './components/status-bar';
import {UserProvider} from './contexts/user-context';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import ThemeProvider, {ThemeContext} from './contexts/theme-context';

const Main = () => {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ThemeProvider>
        <ThemeContext.Consumer>
          {({theme}) => (
            <ApplicationProvider {...eva} theme={theme}>
              <CustomStatusBar />
              <UserProvider>
                <Layout style={{height: '100%', width: '100%'}}>
                  <NavigationContainer>
                    <AuthNavigation />
                  </NavigationContainer>
                </Layout>
              </UserProvider>
            </ApplicationProvider>
          )}
        </ThemeContext.Consumer>
      </ThemeProvider>
    </>
  );
};

export default Main;
