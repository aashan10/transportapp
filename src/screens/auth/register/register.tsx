import React from 'react';
import {Layout} from '@ui-kitten/components';
import Button from '../../../components/button';
import Header from '../../../components/header';
import {View} from 'react-native';

const RegisterScreen = (props: any) => {
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Header title={'Register'} navigation={props.navigation} />
      <Layout
        level={'4'}
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            appearance={'outline'}
            onPress={() => {
              props.navigation.navigate('registerVendor');
            }}>
            Register As Vendor
          </Button>
          <Button
            appearance={'outline'}
            onPress={() => {
              props.navigation.navigate('registerDriver');
            }}>
            Register As Driver
          </Button>
        </View>
        <View style={{marginHorizontal: 30, marginTop: 10}}>
          <Button
            onPress={() => {
              props.navigation.navigate('login');
            }}
            appearance={'ghost'}>
            Login Instead
          </Button>
        </View>
      </Layout>
    </Layout>
  );
};

export default RegisterScreen;
