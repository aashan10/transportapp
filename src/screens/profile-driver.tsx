import {Layout, Modal, Text} from '@ui-kitten/components';
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import LocalizationContext from '../contexts/localization-context';
import Header from '../components/header';
import UserContext from '../contexts/user-context';

const md5 = require('md5');
import {capitalize, upperCase} from 'lodash';
import {ThemeContext} from '../contexts/theme-context';
import Button from '../components/button';

interface profileDetailPros {
  navigation: any;
  item: any;
  route: any;
}

const ProfileImage = ({email}: {email: string}) => {
  return (
    <Image
      source={{uri: 'https://gravatar.com/avatar/' + md5(email ?? 'hello')}}
      style={{
        height: 75,
        width: 75,
        borderRadius: 20,
      }}
    />
  );
};

interface ImageDimensions {
  height: number;
  width: number | string;
}

const ProfileScreen = ({navigation}: profileDetailPros) => {
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  const {theme} = useContext(ThemeContext);
  const {width} = Dimensions.get('window');
  const [licenseVisible, setLicenseVisible] = useState<boolean>(false);
  const [billBookVisible, setBillBookVisible] = useState<boolean>(false);

  const [licenseDimension, setLicenseDimension] = useState<ImageDimensions>({
    height: 0,
    width: 0,
  });

  const [billBookDimension, setBillBookDimension] = useState<ImageDimensions>({
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (
      user.role === 'driver' &&
      user.licenseAndBillBook &&
      user.licenseAndBillBook.length > 0
    ) {
      Image.getSize(user.licenseAndBillBook[0], (imageWidth, imageHeight) => {
        setLicenseDimension({
          height: (width - 50) * (imageHeight / imageWidth),
          width: width - 50,
        });
      });

      Image.getSize(user.licenseAndBillBook[1], (imageWidth, imageHeight) => {
        setBillBookDimension({
          height: (width - 50) * (imageHeight / imageWidth),
          width: width - 50,
        });
      });
    }
  }, [user, width]);
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout
        style={{
          flexDirection: 'column',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          overflow: 'hidden',
        }}>
        <Header navigation={navigation} title={currentLanguage.profile} />
        <Layout style={{alignItems: 'center'}}>
          <ProfileImage email={user.email} />
          <Layout style={{marginVertical: 20}}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginVertical: 5,
                textAlign: 'center',
                fontFamily: 'sans',
              }}>
              {user.name}
            </Text>
            <Button appearance={'outline'} size={'small'}>
              {upperCase(user.role)}
            </Button>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                marginTop: 20,
                textAlign: 'center',
                color: 'gray',
              }}>
              {user.email?.toLowerCase()}
            </Text>
          </Layout>
        </Layout>
      </Layout>
      <ScrollView style={{padding: 20}} showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Personal Information
          </Text>
          <View style={{marginTop: 10, paddingLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Name</Text>
              <Text style={{paddingHorizontal: 30}}>{user.name}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Address</Text>
              <Text style={{paddingHorizontal: 30}}>{user.address}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Account Type</Text>
              <Text style={{paddingHorizontal: 30}}>
                {capitalize(user.role)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Contact Information
          </Text>
          <View style={{marginTop: 10, paddingLeft: 10}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Phone</Text>
              <Text style={{paddingHorizontal: 30}}>{user.phoneNumber}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold'}}>Email</Text>
              <Text style={{paddingHorizontal: 30}}>{user.email}</Text>
            </View>
          </View>
        </View>

        {user.role === 'driver' && (
          <View style={{marginBottom: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Document Information
            </Text>
            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <View style={{flexDirection: 'column', flex: 1, marginRight: 5}}>
                <Text style={{fontWeight: 'bold'}}>License</Text>
                <TouchableOpacity
                  onPress={() => {
                    setLicenseVisible(!licenseVisible);
                  }}>
                  <Image
                    source={{uri: user.licenseAndBillBook[0] ?? ''}}
                    style={{
                      flex: 1,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{flexDirection: 'column', flex: 1, marginLeft: 5}}>
                <Text style={{fontWeight: 'bold'}}>Bill Book</Text>
                <TouchableOpacity
                  onPress={() => {
                    setBillBookVisible(!billBookVisible);
                  }}>
                  <Image
                    source={{uri: user.licenseAndBillBook[1] ?? ''}}
                    style={{
                      flex: 1,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                backgroundColor: theme['color-warning-transparent-500'],
                padding: 10,
                marginTop: 20,
                borderRadius: 10,
              }}>
              <Text style={{fontWeight: 'bold'}}>
                Click the preview to view full image!
              </Text>
            </View>
          </View>
        )}

        {user.role === 'driver' && (
          <>
            <Modal
              visible={licenseVisible}
              backdropStyle={{
                backgroundColor: theme.backdropColor,
              }}
              onBackdropPress={() => {
                setLicenseVisible(!licenseVisible);
              }}>
              <Layout style={{borderRadius: 10, overflow: 'hidden'}}>
                <Image
                  source={{uri: user.licenseAndBillBook[0]}}
                  style={{...licenseDimension, borderRadius: 10}}
                />
              </Layout>
            </Modal>

            <Modal
              visible={billBookVisible}
              backdropStyle={{
                backgroundColor: theme.backdropColor,
              }}
              onBackdropPress={() => {
                setBillBookVisible(!billBookVisible);
              }}>
              <Layout style={{borderRadius: 10, overflow: 'hidden'}}>
                <Image
                  source={{uri: user.licenseAndBillBook[1]}}
                  style={{...billBookDimension, borderRadius: 10}}
                />
              </Layout>
            </Modal>
          </>
        )}
      </ScrollView>
    </Layout>
  );
};
export default ProfileScreen;
