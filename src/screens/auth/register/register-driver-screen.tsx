import React, { useState } from 'react';
import Header from '../../../components/header';
import Button from '../../../components/button';
import { Icon, Input, Layout, Spinner, Text } from '@ui-kitten/components';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { registerDriver } from '../../../api/requests';
import { Picker } from '@react-native-picker/picker';

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
  vehicleType,
  vehicleSize,
  licensePhoto,
  blueBookPhoto,
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
    vehicleType: isNull(vehicleType) ? "Vehicle Type can't be empty!" : null,
    vehicleSize: isNull(vehicleSize)
      ? "Vehicle size  can't be empty"
      : vehicleSize!.length < 4
        ? 'Vehicle must be greater than 4 wheels'
        : null,

    licensePhoto: isNull(licensePhoto) ? 'Please choose a license photo' : null,
    blueBookPhoto: isNull(blueBookPhoto)
      ? 'Please choose a bluebook photo'
      : null,
  };
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
  const [licensePhoto, setLicensePhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [blueBookPhoto, setBlueBookPhoto] = useState<ImageOrVideo | undefined>(
    undefined,
  );
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('Aashan');
  const [email, setEmail] = useState<string>('ashan@gmail.com');
  const [address, setAddress] = useState<string>('Kalanki');
  const [phone, setPhone] = useState<string>('9800000000');
  const [vehicleSize, setSize] = useState<string>('4');
  const [vehicleType, setType] = useState<string>('js');
  const [password, setPassword] = useState<string>('Ashan@123');
  const [repeatPassword, setRepeatPassword] = useState<string>('Ashan@123');
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

  return (
    <Layout style={{ height: '100%' }}>
      <Header title={'Register as Driver'} navigation={props.navigation} />
      <Layout style={{ height: '100%', marginBottom: 65 }} level={'4'}>
        <Layout style={style.content}>
          <ScrollView
            style={{ marginBottom: 20 }}
            showsVerticalScrollIndicator={false}>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                Full Name
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
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>Email</Text>
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
                Address
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
                Phone Number
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
                Vehicle Type
              </Text>
              <Picker
                selectedValue={vehicleType}
                onValueChange={(itemValue) => {
                  setType(itemValue);
                }}>
                <Picker.Item label="Truck" value="Truck" />
                <Picker.Item label="Container" value="Container" />
                <Picker.Item label="Open Truck" value="open Truck" />
                <Picker.Item label="Triper" value="Triper" />
              </Picker>
              {error.vehicleType ? <Text status={'danger'}>{error.vehicleType}</Text> : null}
            </View>
            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                Vehicle Size    </Text>
                <Picker.Item label="4" value="4"/>
                <Picker.Item label="6" value="6"/>
                <Picker.Item label="10" value="10"/>
                <Picker.Item label="12" value="12"/>
                <Picker.Item label="16" value="16"/>
                <Picker.Item label="18" value="18" />
                <Picker.Item label="20" value="20"/>
                <Picker.Item label="22" value="22" />

              {error.vehicleSize ? (
                <Text status={'danger'}>{error.vehicleSize}</Text>
              ) : null}
            </View>


            <View style={{ marginBottom: 15 }}>
              <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
                Password
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
              Attachments
            </Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ display: 'flex', flex: 1, marginRight: 5 }}>
                {blueBookPhoto === undefined ? (
                  <Button
                    size={'small'}
                    onPress={async () => {
                      ImagePicker.openPicker({
                        includeBase64: true,
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setBlueBookPhoto(res);
                          setError({ ...error, blueBookPhoto: null });
                        })
                        .catch(() => { });
                    }}
                    appearance={'outline'}>
                    Choose Bluebook Photo
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
                      Remove Bluebook Photo
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
                        includeBase64: true,
                        mediaType: 'photo',
                      })
                        .then(res => {
                          setLicensePhoto(res);
                          setError({ ...error, licensePhoto: null });
                        })
                        .catch(() => { });
                    }}
                    appearance={'outline'}>
                    Choose License Photo
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
                vehicleSize: vehicleSize,
                vehicleType: vehicleType,
                // @ts-ignore
                licensePhoto: licensePhoto?.data ?? null,
                // @ts-ignore
                blueBookPhoto: blueBookPhoto?.data ?? null,
              });
              setLoading(false);
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
                  vehicleSize: vehicleSize,
                  vehicleType: vehicleType,
                  // @ts-ignore
                  licensePhoto: licensePhoto?.data
                    ? 'data:' +
                    licensePhoto.mime +
                    ';base64,' +
                    // @ts-ignore
                    licensePhoto.data
                    : '',
                  // @ts-ignore
                  blueBookPhoto: blueBookPhoto?.data
                    ? 'data:' +
                    blueBookPhoto.mime +
                    ';base64,' +
                    // @ts-ignore
                    blueBookPhoto.data
                    : '',
                })
                  .then()
                  .catch()
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
