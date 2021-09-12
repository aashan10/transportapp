import {Icon, Layout, styled, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import LocalizationContext from '../contexts/localization-context';
import Header from '../components/header';
import {ScrollView} from 'react-native';
import { StyleSheet } from 'react-native';

interface contact {
  navigation: any;
  item: any;
  route: any;
}

const ContactPage = ({navigation}: contact) => {
  const {currentLanguage} = useContext(LocalizationContext);

  return (
    <ScrollView>
      <Layout style={{height: '100%'}} level={'4'}>
        <Layout
        style= {{
          marginBottom:10,
        }}
        >
          <Header navigation={navigation} 
          title={currentLanguage.contact} />
        </Layout>
        <Layout style={style.conatiner}>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Head Office
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', padding: 10}}>
            01-5234834, 9858020193 {'\n'} Khasi Bazaar, kathmandu
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center',}} />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontWeight: 'bold',
              padding: 5,
            }}>
            Branch
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', padding: 10}}>
            9851057193 {'\n'} Bhairahawa, Rupandehi
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            9851217028, 9813297693 {'\n'} Biratnagar, Morang
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center', padding: 10}}>
            Email us {'\n'} jayamataradhika@gmail.com
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontWeight: 'bold',
              marginTop: 10,
              padding: 10,
            }}>
            Technical Support
          </Text>
          <Text style={{fontSize: 15, textAlign: 'center'}}>
            Scrypt Spider and Mero Rating {'\n'} info@merorating.com {'\n'}
            9862658255
          </Text>
        </Layout>
      </Layout>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  conatiner:{
    padding: 10,
    height: '100%',
    marginBottom: 340,
  }


})
export default ContactPage;
