import React, {useState} from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {View, Image, StyleSheet, ToastAndroid, ScrollView} from 'react-native';

const RegisterDriverScreen = (props: any) => {
  const [licensePhoto, setLicensePhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [blueBookPhoto, setBlueBookPhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Layout style={{height: '100%', flex: 1}} level={'4'}>
      <Header title={'Register as Driver'} navigation={props.navigation} />
      <Layout
        level={'1'}
        style={{
          padding: 10,
          paddingBottom: 0,
          margin: 5,
          borderRadius: 10,
          flex: 1,
          marginBottom: 65,
        }}>
        <ScrollView style={{marginBottom: 20}}>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Full Name
            </Text>
            <Input placeholder={'John Doe'} autoFocus={true} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Email</Text>
            <Input placeholder={'someone@example.com'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Address</Text>
            <Input placeholder={'Kalanki, Kathmandu'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Phone Number
            </Text>
            <Input placeholder={'98xxxxxxxx'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Password</Text>
            <Input placeholder={'Password'} secureTextEntry={true} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Confirm Password
            </Text>
            <Input placeholder={'Confirm Password'} secureTextEntry={true} />
          </View>

          <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
            Attachments
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{display: 'flex', flex: 1, marginRight: 5}}>
              {blueBookPhoto === undefined ? (
                <Button
                  onPress={async () => {
                    ImagePicker.openPicker({})
                      .then(res => {
                        setBlueBookPhoto(res);
                      })
                      .catch(() => {});
                  }}
                  appearance={'outline'}>
                  Choose Bluebook Photo
                </Button>
              ) : (
                <View>
                  <Image
                    source={{uri: blueBookPhoto.path}}
                    style={style.image}
                  />
                  <Button
                    appearance={'ghost'}
                    accessoryLeft={(iconProps: any) => (
                      <Icon name={'trash'} {...iconProps} />
                    )}
                    status={'danger'}
                    onPress={() => {
                      setBlueBookPhoto(undefined);
                    }}>
                    Remove Bluebook Photo
                  </Button>
                </View>
              )}
            </View>
            <View style={{display: 'flex', flex: 1, marginLeft: 5}}>
              {licensePhoto === undefined ? (
                <Button
                  onPress={async () => {
                    ImagePicker.openPicker({})
                      .then(res => {
                        setLicensePhoto(res);
                      })
                      .catch(() => {});
                  }}
                  appearance={'outline'}>
                  Choose License Photo
                </Button>
              ) : (
                <View>
                  <Image
                    source={{uri: licensePhoto.path}}
                    style={style.image}
                  />
                  <Button
                    appearance={'ghost'}
                    accessoryLeft={(iconProps: any) => (
                      <Icon name={'trash'} {...iconProps} />
                    )}
                    status={'danger'}
                    onPress={() => {
                      setLicensePhoto(undefined);
                    }}>
                    Remove License Photo
                  </Button>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </Layout>
      <Layout style={style.bottomButtonContainer} level={'4'}>
        <Button
          onPress={() => {
            props.navigation.navigate('login');
          }}
          appearance={'outline'}
          disabled={loading}
          style={style.bottomButton}>
          Cancel
        </Button>
        <Button
          disabled={loading}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              ToastAndroid.show(
                'Driver Registered Successfully! Please login to continue!',
                200,
              );
              props.navigation.navigate('login');
              setLoading(false);
            }, 5000);
          }}
          style={style.bottomButton}>
          Register
        </Button>
      </Layout>
    </Layout>
  );
};

const style = StyleSheet.create({
  bottomButton: {
    minWidth: 150,
  },
  bottomButtonContainer: {
    padding: 10,
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    alignSelf: 'center',
    margin: 'auto',
    borderRadius: 10,
    width: '100%',
    aspectRatio: 6 / 4,
    height: 100,
  },
});

export default RegisterDriverScreen;
