import * as eva from '@eva-design/eva';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../components/button';
import Header from '../components/header';
import {Layout, ListItem, Text} from '@ui-kitten/components';
import {ThemeContext} from '../contexts/theme-context';

const SettingsScreen = ({navigation}: any) => {
  const {theme, toggleTheme} = useContext(ThemeContext);
  return (
    <Layout style={{height: '100%'}}>
      <Header navigation={navigation} />
      <Layout style={style.container} level={'4'}>
        <ListItem style={style.listItem}>
          <Text>Night Mode</Text>
          <Button appearance={'ghost'} size={'small'} onPress={toggleTheme}>
            {theme === eva.light ? 'Enable' : 'Disable'}
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
  },
  container: {
    overflow: 'hidden',
    padding: 5,
    height: '100%',
  },
});

export default SettingsScreen;
