import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../components/button';
import Header from '../components/header';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {ThemeContext} from '../contexts/theme-context';
import LocalizationContext from '../contexts/localization-context';
import {themes} from '../themes/themes';
import English from '../languages/en';

const SettingsScreen = ({navigation}: any) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {currentLanguage, setLanguage} = useContext(LocalizationContext);

  return (
    <Layout style={{height: '100%'}}>
      <Header navigation={navigation} />
      <Layout style={style.container} level={'4'}>
        <ListItem style={style.listItem}>
          <Text>{currentLanguage.night}</Text>
          <Button appearance={'ghost'} size={'small'} onPress={toggleTheme}>
            {theme === themes.light
              ? currentLanguage.enable
              : currentLanguage.disable}
          </Button>
        </ListItem>

        <ListItem style={style.listItem}>
          <Text>{currentLanguage.language}</Text>
          <Button
            appearance={'ghost'}
            size={'small'}
            onPress={() => {
              if (currentLanguage.appName === English.appName) {
                setLanguage('np');
              } else {
                setLanguage('en');
              }
            }}>
            {currentLanguage.changeLanguage}
          </Button>
        </ListItem>
      </Layout>
    </Layout>
  );
};

const style = StyleSheet.create({
  listItem: {
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    marginBottom: 5,
  },
  container: {
    overflow: 'hidden',
    padding: 5,
    height: '100%',
  },
});

export default SettingsScreen;
