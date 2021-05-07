import React from 'react';
import {Layout, List, ListItem, Text} from '@ui-kitten/components';
import {Image, StyleSheet, View} from 'react-native';
import Button from './button';

const capitalize = (text: string) => {
  return text[0].toUpperCase() + text.slice(1);
};

const Drawer = (props: any) => {
  return (
    <Layout level={'3'} style={{height: '100%'}}>
      <Layout style={style.userDetailsCard} level={'1'}>
        <Text style={style.welcomeText}>Welcome</Text>
        <Text style={style.userName}>Aashan</Text>
        <View style={style.profilePictureContainer}>
          <Image
            source={{
              uri:
                'https://scontent.fktm8-1.fna.fbcdn.net/v/t1.6435-9/160625821_3788193727926188_9136776959279923453_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=WY9T1WJJnzAAX-ZbUzR&_nc_ht=scontent.fktm8-1.fna&oh=fcd226b34d26e6c0f150e18b2a2267e7&oe=60B97229',
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
              return (
                <ListItem
                  onPress={() => {
                    props.navigation.navigate(item.item.name);
                  }}>
                  <Text style={{paddingLeft: 20}}>
                    {capitalize(item.item.name)}
                  </Text>
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
          onPress={() => {
            props.navigation.navigate('login');
          }}>
          Logout
        </Button>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  userDetailsCard: {
    margin: 10,
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
