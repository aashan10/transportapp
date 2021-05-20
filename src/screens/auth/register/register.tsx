import React from 'react';
import {Layout} from '@ui-kitten/components';
import Button from '../../../components/button';
import {View} from 'react-native';
import RegisterScreenCarousel from '../../../components/register-screen-carousel';
import {useContext} from 'react';
import LocalizationContext from '../../../contexts/localization-context';

const RegisterScreen = (props: any) => {
  const {currentLanguage} = useContext(LocalizationContext);

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
            {currentLanguage.registerAsVendor}
          </Button>
          <Button
            onPress={() => {
              props.navigation.navigate('registerDriver');
            }}>
            {currentLanguage.registerAsDriver}
          </Button>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <Button
            onPress={() => {
              props.navigation.navigate('login');
            }}
            appearance={'outline'}>
            {currentLanguage.alreadyRegister}
          </Button>
        </View>
      </Layout>
    </Layout>
  );
};

export default RegisterScreen;
