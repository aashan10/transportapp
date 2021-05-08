import React, {useState} from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import {
  View,
  Image,
  StyleSheet,
  ToastAndroid,
  ScrollView,
  Alert,
} from 'react-native';

const isNull = (param: any): boolean => {
  return param === null || param === undefined || param === '';
};

const validate = ({
  name,
  phone,
  password,
  email,
  repeatPassword,
  address,
}: ErrorValidationState) => {
  return {
    name: isNull(name) ? "Name can't be empty!" : null,
    phone: isNull(phone)
      ? "Phone can't be empty"
      : phone!.length < 10
      ? 'Phone must be at least 10 digits'
      : null,
    password: isNull(password)
      ? "Password can't be empty!"
      : password!.length < 6
      ? 'Password must be at least 6 characters!'
      : null,
    email: isNull(email) ? "Email can't be empty!" : null,
    repeatPassword: isNull(repeatPassword)
      ? "Repeat password can't be empty!"
      : password !== repeatPassword
      ? 'Password and repeat password must be same!'
      : null,
    address: isNull(address) ? "Address can't be empty!" : null,
  };
};

interface ErrorValidationState {
  name: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  password: string | null;
  repeatPassword: string | null;
}

const RegisterDriverScreen = (props: any) => {
  const [licensePhoto, setLicensePhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [blueBookPhoto, setBlueBookPhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<ErrorValidationState>>({
    name: null,
    phone: null,
    email: null,
    password: null,
    repeatPassword: null,
  });

  return (
    <Layout style={{height: '100%'}}>
      <Header title={'Register as Driver'} navigation={props.navigation} />
      <Layout style={{height: '100%', marginBottom: 65}} level={'4'}>
        <Layout
          style={{
            padding: 10,
            paddingBottom: 0,
            paddingTop: 20,
            margin: 5,
            borderRadius: 10,
            flex: 1,
            marginBottom: 165,
          }}>
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
              </View>
              <View style={{display: 'flex', flex: 1, marginLeft: 5}}>
                {licensePhoto === undefined ? (
                  <Button
                    size={'small'}
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
          onPress={() => {
            try {
              setLoading(true);
              setError(
                validate({
                  name: name,
                  password: password,
                  email: email,
                  phone: phone,
                  address: address,
                  repeatPassword: repeatPassword,
                }),
              );
              if (
                error.repeatPassword !== null ||
                error.phone !== null ||
                error.name !== null ||
                error.address !== null ||
                error.email !== null ||
                error.password !== null
              ) {
                throw new Error(
                  JSON.stringify({
                    phone: phone,
                    name: name,
                    email: email,
                    password: password,
                    address: address,
                    repeatPassword: repeatPassword,
                    error: error,
                  }),
                );
              }
              setTimeout(() => {
                ToastAndroid.show(
                  'Driver Registered Successfully! Please login to continue!',
                  200,
                );
                Alert.alert(
                  'Data',
                  JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    repeatPassword: repeatPassword,
                    address: address,
                    phoneNumber: phone,
                  }),
                );
                setLoading(false);
              }, 5000);
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
});

export default RegisterDriverScreen;
