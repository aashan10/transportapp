import {Icon, Layout, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import LocalizationContext from '../contexts/localization-context';
import Header from '../components/header';
import {FlatList} from 'react-native';
import {StyleSheet, View} from 'react-native';
import {ThemeContext} from '../contexts/theme-context';

interface Contact {
  name: string;
  contact: {
    phone: string;
    email: string;
    web?: string;
  };
  address: string;
}

const offices: Array<Contact> = [
  {
    name: 'Head Office',
    contact: {
      phone: '01-5234834, 9858020193',
      email: 'jaymataradhika@gmail.com',
    },
    address: 'Khasi Bazaar, Kathmandu',
  },
  {
    name: 'Bhairahawa Branch',
    contact: {
      phone: '9851057193',
      email: '',
    },
    address: 'Bhairahawa, Rupandehi',
  },
  {
    name: 'Biratnagar Branch',
    contact: {
      phone: '9851217028, 9813297693',
      email: '',
    },
    address: 'Biratnagar, Morang',
  },
];

const ContactPage = ({navigation}: any) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const {theme} = useContext(ThemeContext);

  const JMRIcon = (props: any) => {
    return (
      <Icon
        name={props.name}
        fill={theme['color-primary-500']}
        style={{height: 20, width: 20, marginRight: 15}}
      />
    );
  };
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header navigation={navigation} title={currentLanguage.contact} />
      </Layout>
      <Layout style={style.conatiner}>
        <Layout style={{flex: 1}}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 25,
              paddingTop: 20,
            }}>
            {' '}
            Jay Mata Radhika Transport Company{' '}
          </Text>
        </Layout>
        <Layout
          style={{
            flex: 5,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <FlatList
            data={offices}
            style={{paddingTop: 10, marginLeft: '10%'}}
            renderItem={office => {
              const {name, address, contact} = office.item;

              return (
                <View
                  style={{
                    display: 'flex',
                    flex: 3,
                    paddingLeft: 10,
                    marginTop: 20,
                  }}>
                  <View style={{display: 'flex', flex: 1}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        flex: 1,
                        marginBottom: 10,
                        fontSize: 20,
                      }}>
                      {name}
                    </Text>
                  </View>
                  <View style={{marginLeft: '10%'}}>
                    <View style={{flexDirection: 'row'}}>
                      <JMRIcon name="map-outline" />
                      <Text>{address}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <JMRIcon name="phone-outline" />
                      <Text>{contact.phone}</Text>
                    </View>
                    {contact.email.length > 0 && (
                      <View style={{flexDirection: 'row'}}>
                        <JMRIcon name="email-outline" />
                        <Text>{contact.email}</Text>
                      </View>
                    )}
                  </View>
                </View>
              );
            }}
          />
        </Layout>
        <Layout
          style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 10}}>
          <Text style={{textAlign: 'center', fontSize: 12}}>
            Developed By: Scrypt Spider
          </Text>
        </Layout>
      </Layout>
    </Layout>
  );
};
const style = StyleSheet.create({
  conatiner: {
    flex: 1,
    display: 'flex',
    margin: 5,
    borderRadius: 10,
    flexDirection: 'column',
    overflow: 'hidden',
  },
});
export default ContactPage;
