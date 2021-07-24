import {Icon, Layout, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {ScrollView} from 'react-native';
import LocalizationContext from '../contexts/localization-context';
import Header from '../components/header';
import UserContext from '../contexts/user-context';

interface contact {
  navigation: any;
  item: any;
  route: any;
}

const Contact = ({navigation}: contact) => {
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  const Contact = () => {
    return (
      <Layout
        level={'4'}
        style={{
          height: 100,
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      />
    );
  };

  return (
    <Layout style={{height: '100%'}}>
      <Layout style={{width: '100%'}}>
        <Header navigation={navigation} title={currentLanguage.contact} />
      </Layout>
      <Layout
        style={{
          flex: 1,
          height: '100%',
          padding: 5,
        }}>
        <ScrollView style={{height: '100%'}}>
          <Layout
            level={'4'}
            style={{
              padding: 20,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              flexDirection: 'column',
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Text
              style={{
                fontSize: 15,
                textAlign: 'center',
                fontWeight: 'bold',
                marginTop: 20,
                padding: 10,
              }}>
              For More Detail
            </Text>
            <Text style={{fontSize: 15, textAlign: 'center', padding: 10}}>
              9858020193
            </Text>
            <Text style={{fontSize: 15, textAlign: 'center'}}>
              Khasi Bazaar, kathmandu
            </Text>
          </Layout>
        </ScrollView>
      </Layout>
    </Layout>
  );
};
export default Contact;
