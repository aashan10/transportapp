import React, {useState} from 'react';
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
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {View, Image, StyleSheet, ScrollView, Alert} from 'react-native';
import {Exception, getUrl, registerDriver} from '../../../api/requests';
import {EMAIL_REGEX} from '../../../helpers/constants';
import RNFS from 'react-native-fs';
import {DRIVER_REGISTER} from '../../../api/constants';

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
  vehicleSize,
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
    vehicleSize: null,
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

  if (isNull(vehicleSize)) {
    error.vehicleSize = 'Please choose the number of wheels of your vehicle!';
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
  vehicleSize: string | null;
  vehicleType: string | null;
  repeatPassword: string | null;
  licensePhoto: string | null;
  blueBookPhoto: string | null;
}

const RegisterDriverScreen = (props: any) => {
  const [licensePhoto, setLicensePhoto] =
    useState<ImageOrVideo | undefined>(undefined);
  const [blueBookPhoto, setBlueBookPhoto] =
    useState<ImageOrVideo | undefined>(undefined);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [vehicleSize, setSize] = useState<IndexPath>(new IndexPath(0));
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
    vehicleSize: null,
    vehicleType: null,
    licensePhoto: null,
    blueBookPhoto: null,
  });

  const sizes = ['4', '6', '10', '12', '16', '18', '20', '22'];
  const types = ['Truck', 'Container', 'Open Truck', 'Tripper', 'Pickup'];

  return (
    <Layout style={{height: '100%'}}>
      <Header title={'Register as Driver'} navigation={props.navigation} />
      <Layout style={{height: '100%', marginBottom: 65}} level={'4'}>
        <Layout style={style.content}>
          <ScrollView
            style={{marginBottom: 20}}
            showsVerticalScrollIndicator={false}>
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Full Name
              </Text>
              <Input
                status={error.name ? 'danger' : ''}
                onChangeText={text => {
                  setName(text);
                  setError({...error, name: null});
                }}
                placeholder={'John Doe'}
                autoFocus={true}
              />
              {error.name ? <Text status={'danger'}>{error.name}</Text> : null}
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Email</Text>
              <Input
                status={error.email ? 'danger' : ''}
                onChangeText={text => {
                  setEmail(text);
                  setError({...error, email: null});
                }}
                placeholder={'someone@example.com'}
              />
              {error.email ? (
                <Text status={'danger'}>{error.email}</Text>
              ) : null}
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Address
              </Text>
              <Input
                status={error.address ? 'danger' : ''}
                onChangeText={text => {
                  setAddress(text);
                  setError({...error, address: null});
                }}
                placeholder={'Kalanki, Kathmandu'}
              />
              {error.address ? (
                <Text status={'danger'}>{error.address}</Text>
              ) : null}
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Phone Number
              </Text>
              <Input
                status={error.phone ? 'danger' : ''}
                onChangeText={text => {
                  setPhone(text);
                  setError({...error, phone: null});
                }}
                placeholder={'98xxxxxxxx'}
              />
              {error.phone ? (
                <Text status={'danger'}>{error.phone}</Text>
              ) : null}
            </View>
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Vehicle Type
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
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Vehicle Size
              </Text>
              <Select
                selectedIndex={vehicleSize}
                value={sizes[vehicleSize.row]}
                onSelect={itemValue => {
                  if (itemValue instanceof IndexPath) {
                    setSize(itemValue);
                  }
                }}>
                {sizes.map((item, index) => {
                  return <SelectItem key={index} title={item} />;
                })}
              </Select>

              {error.vehicleSize ? (
                <Text status={'danger'}>{error.vehicleSize}</Text>
              ) : null}
            </View>

            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Password
              </Text>
              <Input
                status={error.password ? 'danger' : ''}
                onChangeText={text => {
                  setPassword(text);
                  setError({...error, password: null});
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
            <View style={{marginBottom: 15}}>
              <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
                Confirm Password
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
                  setError({...error, repeatPassword: null});
                }}
                placeholder={'Confirm Password'}
                secureTextEntry={!showRepeatPassword}
              />
              {error.repeatPassword ? (
                <Text status={'danger'}>{error.repeatPassword}</Text>
              ) : null}
            </View>

            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Attachments
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{display: 'flex', flex: 1, marginRight: 5}}>
                {blueBookPhoto === undefined ? (
                  <Button
                    size={'small'}
                    onPress={async () => {
                      ImagePicker.openPicker({
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setBlueBookPhoto(res);
                          setError({...error, blueBookPhoto: null});
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
                      size={'small'}
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
                {error.blueBookPhoto ? (
                  <Text status={'danger'}>{error.blueBookPhoto}</Text>
                ) : null}
              </View>
              <View style={{display: 'flex', flex: 1, marginLeft: 5}}>
                {licensePhoto === undefined ? (
                  <Button
                    size={'small'}
                    onPress={async () => {
                      ImagePicker.openPicker({
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setLicensePhoto(res);
                          setError({...error, licensePhoto: null});
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
                      size={'small'}
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
          Cancel
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
                vehicleSize: sizes[vehicleSize.row],
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
                validation.vehicleSize !== null ||
                validation.vehicleType !== null ||
                validation.blueBookPhoto !== null ||
                validation.licensePhoto !== null
              ) {
                throw new Error('Please fill up the required fields!');
              } else {
                registerDriver({
                  name: name,
                  email: email,
                  address: address,
                  phone: phone,
                  password: password,
                  vehicleSize: sizes[vehicleSize.row],
                  vehicleType: types[vehicleType.row],
                  licensePhoto: licensePhoto,
                  blueBookPhoto: blueBookPhoto,
                })
                  .then(res => {
                    Alert.alert(
                      'Success',
                      res.success ??
                        'Registration is completed. Please wait for admin approval!',
                    );
                    props.navigation.navigate('login');
                  })
                  .catch(async err => {
                    if (err instanceof Exception) {
                      Alert.alert(
                        'Error',
                        (await err.response.json()).message ??
                          'There was an error!',
                      );
                    } else {
                      Alert.alert(
                        'Error',
                        'There was an error processing the request!',
                      );
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
