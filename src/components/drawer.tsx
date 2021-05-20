import React, {useContext, useEffect, useState} from 'react';
import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import {Image, StyleSheet, View} from 'react-native';
import Button from './button';
import UserContext from '../contexts/user-context';
import LocalizationContext from '../contexts/localization-context';
import {storeToken} from '../storage/user-storage';
import {userInfo} from '../api/requests';

const md5 = require('md5');

const Drawer = (props: any) => {
  const {user, setUser} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  const {descriptors} = props;
  userInfo(user.token)
    .then()
    .catch(async () => {
      await storeToken('');
      props.navigation.navigate('login');
    });
  return (
    <Layout level={'3'} style={{height: '100%'}}>
      <Layout style={style.userDetailsCard} level={'1'}>
        <Text style={style.welcomeText}>{currentLanguage.welcome}</Text>
        <Text style={style.userName}>{user.name}</Text>
        <View style={style.profilePictureContainer}>
          <Image
            source={{
              uri:
                'https://www.gravatar.com/avatar/' +
                md5(user.email ? user.email : 'example@gmail.com'),
            }}
            style={style.profilePicture}
          />
        </View>
      </Layout>
      <View>
        <Layout level={'1'} style={style.menuContainer}>
          <List
            data={props.state.routes}
            renderItem={item => {
              const label = descriptors[item.item.key].options.drawerLabel;
              return (
                <ListItem
                  onPress={() => {
                    props.navigation.navigate(item.item.name);
                  }}>
                  <Text style={{paddingLeft: 20}}>{label}</Text>
                </ListItem>
              );
            }}
          />
        </Layout>
      </View>
      <View style={style.logoutButtonContainer}>
        <Button
          appearance={'ghost'}
          status={'danger'}
          onPress={async () => {
            await storeToken('');
            setUser({...user, token: ''});
            props.navigation.navigate('login');
          }}>
          {currentLanguage.logout}
        </Button>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  userDetailsCard: {
    margin: 10,
    marginTop: 40,
    height: 150,
    borderRadius: 10,
  },
  welcomeText: {
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 30,
  },
  userName: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 0,
  },
  profilePictureContainer: {
    position: 'absolute',
    bottom: -25,
    height: 60,
    width: 60,
    left: '40%',
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: 'white',
    borderWidth: 2,
  },
  profilePicture: {height: 60, width: 60, resizeMode: 'cover'},
  menuContainer: {
    borderRadius: 10,
    margin: 10,
    marginTop: 30,
    overflow: 'hidden',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 10,
    marginBottom: 20,
    padding: 0,
    width: '100%',
  },
});

export default Drawer;
