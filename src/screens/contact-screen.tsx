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

const ContactPage = ({navigation}: contact) => {
  const {currentLanguage} = useContext(LocalizationContext);

  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header navigation={navigation} title={currentLanguage.contact} />
      </Layout>
      <Layout level={'4'}>
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
    </Layout>
  );
};
export default ContactPage;
