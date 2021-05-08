import React from 'react';
import {Layout} from '@ui-kitten/components';
import Button from '../../../components/button';
import {View} from 'react-native';
import RegisterScreenCarousel from '../../../components/register-screen-carousel';

const RegisterScreen = (props: any) => {
  return (
    <Layout
      style={{height: '100%', backgroundColor: 'transparent'}}
      level={'4'}>
      <RegisterScreenCarousel />
      <Layout
        level={'4'}
        style={{
          width: '100%',
          position: 'absolute',
          bottom: 0,
          paddingTop: 20,
          paddingBottom: 20,
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Button
            onPress={() => {
              props.navigation.navigate('registerVendor');
            }}>
            Register As Vendor
          </Button>
          <Button
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
            status={'success'}
            appearance={'outline'}>
            Already Registered? Login
          </Button>
        </View>
      </Layout>
    </Layout>
  );
};

export default RegisterScreen;
