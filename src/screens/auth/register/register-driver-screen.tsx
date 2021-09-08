import React, { useState } from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {
  Icon,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import messageing from '@react-native-firebase/messaging';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { View, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { Exception, getUrl, registerDriver } from '../../../api/requests';
import { EMAIL_REGEX } from '../../../helpers/constants';

import LocalizationContext from '../../../contexts/localization-context';
import { useContext } from 'react';
import { useEffect } from 'react';

const isNull = (param: any): boolean => {
  return param === null || param === undefined || param === '' || param === {};
};

const validate = ({
  name,
  phone,
  password,
  email,
  repeatPassword,
  address,
  vehicleType,
  licensePhoto,
  blueBookPhoto,
}: ErrorValidationState) => {
  const error: ErrorValidationState = {
    address: null,
    blueBookPhoto: null,
    email: null,
    licensePhoto: null,
    name: null,
    password: null,
    phone: null,
    repeatPassword: null,
    vehicleType: null,
  };

  if (isNull(address)) {
    error.address = "Address can't be empty!";
  }

  if (isNull(phone)) {
    error.phone = "Phone number can't be empty!";
  } else if (phone && phone?.length < 10) {
    error.phone = 'Please enter a valida phone number!';
  }

  if (isNull(password)) {
    error.password = "Password can't be empty!";
  } else if (password !== repeatPassword) {
    error.password = 'Passwords do not match!';
  }
  if (isNull(repeatPassword)) {
    error.repeatPassword = 'Confirm your password to continue!';
  } else if (password !== repeatPassword) {
    error.repeatPassword = 'Passwords do not match!';
  }

  if (isNull(name)) {
    error.name = "Name can't be empty!";
  }

  if (!EMAIL_REGEX.test(email ?? '')) {
    error.email = 'Please enter a valid email address!';
  }

  if (isNull(licensePhoto)) {
    error.licensePhoto = 'Please choose a copy of your license photo!';
  }

  if (isNull(blueBookPhoto)) {
    error.blueBookPhoto = 'Please choose a copy of your bluebook photo';
  }

  if (isNull(vehicleType)) {
    error.vehicleType = 'Please choose the type of your vehicle!';
  }

  return error;
};

interface ErrorValidationState {
  name: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  password: string | null;
  vehicleType: string | null;
  repeatPassword: string | null;
  licensePhoto: string | null;
  blueBookPhoto: string | null;
}

const RegisterDriverScreen = (props: any) => {
  const { currentLanguage } = useContext(LocalizationContext);
  const [licensePhoto, setLicensePhoto] =
    useState<ImageOrVideo | undefined>(undefined);
  const [blueBookPhoto, setBlueBookPhoto] =
    useState<ImageOrVideo | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [deviceId, setDeviceId] =useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [vehicleType, setType] = useState<IndexPath>(new IndexPath(0));
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ErrorValidationState>>({
    name: null,
    phone: null,
    email: null,
    password: null,
    repeatPassword: null,
    vehicleType: null,
    licensePhoto: null,
    blueBookPhoto: null,
  });
  const sendToken = async() => {
    await messageing().registerDeviceForRemoteMessages();
      const deviceToken = await messageing().getToken();
      setDeviceId(deviceToken);
  }
  useEffect(() =>{
    sendToken();
  },
  []);
  console.log('deviceId' + deviceId)
  const types = [
    '19.5 feet 8.5Ton (open)',
    '20 feet 10Ton (Open Truck)',
     '22 feet 10Ton(Open Truck)',
     '24 feet 10Ton (Open Truck)',
     '24 feet 10Ton (Container)',
     '10 wheeler',
     '12 wheeler',
     'Trailer',
     'DI/Bolero Pick Up',
     'Others',
  ];

  return (
    <Layout style={{ height: '100%' }}>
      <Header
        title={currentLanguage.registerDriver}
        navigation={props.navigation}
      />
      <Layout style={{ height: '100%', marginBottom: 65 }} level={'4'}>
        <Layout style={style.content}>
          <ScrollView
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.name}
              </Text>
              <Input
                status={error.name ? 'danger' : ''}
                onChangeText={text => {
                  setName(text);
                  setError({ ...error, name: null });
                }}
                placeholder={'John Doe'}
                autoFocus={true}
              />
              {error.name ? <Text status={'danger'}>{error.name}</Text> : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.email}
              </Text>
              <Input
                status={error.email ? 'danger' : ''}
                onChangeText={text => {
                  setEmail(text);
                  setError({ ...error, email: null });
                }}
                placeholder={'someone@example.com'}
              />
              {error.email ? (
                <Text status={'danger'}>{error.email}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.address}
              </Text>
              <Input
                status={error.address ? 'danger' : ''}
                onChangeText={text => {
                  setAddress(text);
                  setError({ ...error, address: null });
                }}
                placeholder={'Kalanki, Kathmandu'}
              />
              {error.address ? (
                <Text status={'danger'}>{error.address}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.phone}
              </Text>
              <Input
                status={error.phone ? 'danger' : ''}
                onChangeText={text => {
                  setPhone(text);
                  setError({ ...error, phone: null });
                }}
                placeholder={'98xxxxxxxx'}
              />
              {error.phone ? (
                <Text status={'danger'}>{error.phone}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.containerType}
              </Text>
              <Select
                value={types[vehicleType.row]}
                selectedIndex={vehicleType}
                onSelect={itemValue => {
                  if (itemValue instanceof IndexPath) {
                    setType(itemValue);
                  }
                }}>
                {types.map((type, index) => {
                  return <SelectItem key={index} title={type} />;
                })}
              </Select>
              {error.vehicleType ? (
                <Text status={'danger'}>{error.vehicleType}</Text>
              ) : null}
            </View>

            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.password}
              </Text>
              <Input
                status={error.password ? 'danger' : ''}
                onChangeText={text => {
                  setPassword(text);
                  setError({ ...error, password: null });
                }}
                accessoryRight={() => {
                  return (
                    <Button
                      size={'small'}
                      onPress={() => {
                        setShowPassword(!showPassword);
                      }}
                      appearance={'ghost'}
                      accessoryLeft={iconProps => {
                        return (
                          <Icon
                            {...iconProps}
                            name={
                              showPassword ? 'eye-outline' : 'eye-off-outline'
                            }
                          />
                        );
                      }}
                    />
                  );
                }}
                placeholder={'Password'}
                secureTextEntry={!showPassword}
              />
              {error.password ? (
                <Text status={'danger'}>{error.password}</Text>
              ) : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                {currentLanguage.cPassword}
              </Text>
              <Input
                status={error.repeatPassword ? 'danger' : ''}
                accessoryRight={() => {
                  return (
                    <Button
                      size={'small'}
                      onPress={() => {
                        setShowRepeatPassword(!showRepeatPassword);
                      }}
                      accessoryLeft={iconProps => {
                        return (
                          <Icon
                            {...iconProps}
                            name={
                              !showRepeatPassword
                                ? 'eye-off-outline'
                                : 'eye-outline'
                            }
                          />
                        );
                      }}
                      appearance={'ghost'}
                    />
                  );
                }}
                onChangeText={text => {
                  setRepeatPassword(text);
                  setError({ ...error, repeatPassword: null });
                }}
                placeholder={'Confirm Password'}
                secureTextEntry={!showRepeatPassword}
              />
              {error.repeatPassword ? (
                <Text status={'danger'}>{error.repeatPassword}</Text>
              ) : null}
            </View>

            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.attachement}
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ display: 'flex', flex: 1, marginRight: 5 }}>
                {blueBookPhoto === undefined ? (
                  <Button
                    size={'small'}
                    onPress={async () => {
                      ImagePicker.openPicker({
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setBlueBookPhoto(res);
                          setError({ ...error, blueBookPhoto: null });
                        })
                        .catch(() => { });
                    }}
                    appearance={'outline'}>
                    {currentLanguage.blueBook}
                  </Button>
                ) : (
                  <View>
                    <Image
                      source={{ uri: blueBookPhoto.path }}
                      style={style.image}
                    />
                    <Button
                      size={'small'}
                      appearance={'ghost'}
                      accessoryLeft={(iconProps: any) => (
                        <Icon name={'trash'} {...iconProps} />
                      )}
                      status={'danger'}
                      onPress={() => {
                        setBlueBookPhoto(undefined);
                      }}>
                      {currentLanguage.rBluebook}
                    </Button>
                  </View>
                )}
                {error.blueBookPhoto ? (
                  <Text status={'danger'}>{error.blueBookPhoto}</Text>
                ) : null}
              </View>
              <View style={{ display: 'flex', flex: 1, marginLeft: 5 }}>
                {licensePhoto === undefined ? (
                  <Button
                    size={'small'}
                    onPress={async () => {
                      ImagePicker.openPicker({
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setLicensePhoto(res);
                          setError({ ...error, licensePhoto: null });
                        })
                        .catch(() => { });
                    }}
                    appearance={'outline'}>
                    {currentLanguage.license}
                  </Button>
                ) : (
                  <View>
                    <Image
                      source={{ uri: licensePhoto.path }}
                      style={style.image}
                    />
                    <Button
                      appearance={'ghost'}
                      size={'small'}
                      accessoryLeft={(iconProps: any) => (
                        <Icon name={'trash'} {...iconProps} />
                      )}
                      status={'danger'}
                      onPress={() => {
                        setLicensePhoto(undefined);
                      }}>
                      {currentLanguage.rlicense}
                    </Button>
                  </View>
                )}
                {error.licensePhoto ? (
                  <Text status={'danger'}>{error.licensePhoto}</Text>
                ) : null}
              </View>
            </View>
          </ScrollView>
        </Layout>
      </Layout>
      <Layout style={style.bottomButtonContainer} level={'4'}>
        <Button
          onPress={() => {
            props.navigation.goBack();
          }}
          appearance={'outline'}
          disabled={loading}
          style={style.bottomButton}>
          {currentLanguage.cancel}
        </Button>
        <Button
          disabled={loading}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }
          onPress={async () => {
            try {
              setLoading(true);
              const validation = validate({
                name: name,
                password: password,
                email: email,
                phone: phone,
                address: address,
                repeatPassword: repeatPassword,
                vehicleType: types[vehicleType.row],
                licensePhoto: licensePhoto?.path ?? null,
                blueBookPhoto: blueBookPhoto?.path ?? null,
              });
              setError(validation);
              if (
                validation.repeatPassword !== null ||
                validation.phone !== null ||
                validation.name !== null ||
                validation.address !== null ||
                validation.email !== null ||
                validation.password !== null ||
                validation.vehicleType !== null ||
                validation.blueBookPhoto !== null ||
                validation.licensePhoto !== null
              ) {
                throw new Error(currentLanguage.m1);
              } else {   
                registerDriver({
                  name: name,
                  email: email,
                  address: address,
                  phone: phone,
                  password: password,
                  deviceId: deviceId,
                  vehicleType: types[vehicleType.row],
                  licensePhoto: licensePhoto,
                  blueBookPhoto: blueBookPhoto,
                })
                  .then(res => {
                    Alert.alert(
                      currentLanguage.alert2,
                      res.success ?? currentLanguage.message12,
                    );
                    props.navigation.navigate('login');
                  })
                  .catch(async err => {
                    if (err instanceof Exception) {
                      const message = await err.response.text();

                      console.log(message);
                      
                      if(message.includes('413')) {
                        Alert.alert(
                          'Image filesize too large!',
                          'The license and bluebook photo should be less than 200kb',
                        );
                      } else {
                        Alert.alert(
                          currentLanguage.alert1,
                          currentLanguage.m2,
                        );
                      }
                    } else {
                      Alert.alert("There was an error");
                      console.log(err);
                      
                      Alert.alert(currentLanguage.alert1, currentLanguage.m3);
                    }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }
            } catch (e) {
              setLoading(false);
            }
          }}
          style={style.bottomButton}>
          {currentLanguage.register}
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
  content: {
    padding: 10,
    paddingBottom: 0,
    paddingTop: 20,
    margin: 5,
    borderRadius: 10,
    flex: 1,
    marginBottom: 165,
  },
});

export default RegisterDriverScreen;
