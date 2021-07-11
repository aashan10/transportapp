import React, {useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import {Alert, ScrollView, ToastAndroid, View} from 'react-native';
import Button from '../../../components/button';
import {EMAIL_REGEX} from '../../../helpers/constants';
import {Exception, registerVendor} from '../../../api/requests';
import {useContext} from 'react';
import LocalizationContext from '../../../contexts/localization-context';

interface ErrorState {
  email: string | null;
  password: string | null;
  address: string | null;
  company: string | null;
  name: string | null;
  phone: string | null;
}
const validate = ({
  email,
  name,
  company,
  phone,
  password,
  address,
}: ErrorState) => {
  let response: ErrorState = {
    email: null,
    name: null,
    password: null,
    company: null,
    phone: null,
    address: null,
  };
  if (!email || email?.length <= 0) {
    response.email = "The email can't be empty!";
  } else if (!EMAIL_REGEX.test(email)) {
    response.email = 'Please enter a valid email address!';
  }
  if (!name || name?.length <= 0) {
    response.name = "The name can't be empty!";
  }
  if (!company || company?.length <= 0) {
    response.company = "The company name can't be empty!";
  }
  if (!phone || phone?.length < 10) {
    response.phone = 'The phone number is invalid!';
  }
  if (!password || password?.length < 6) {
    response.password = 'The password must be at least 6 characters!';
  }
  if (!address || address?.length <= 0) {
    response.address = "The address field can't be empty!";
  }
  return response;
};

const RegisterVendorScreen = (props: any) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({
    email: null,
    password: null,
    address: null,
    company: null,
    name: null,
    phone: null,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header
          title={currentLanguage.registerVendor}
          navigation={props.navigation}
        />
      </Layout>
      <Layout
        style={{
          height: '100%',
          margin: 5,
          padding: 5,
          display: 'flex',
          flex: 1,
          borderRadius: 10,
        }}
        level={'1'}>
        <ScrollView
          style={{
            height: '100%',
            flex: 1,
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.name}
            </Text>
            <Input
              onChangeText={text => {
                setName(text);
                setError({...error, name: null});
              }}
              status={error.name ? 'danger' : ''}
              placeholder={'John Doe'}
            />
            {error.name ? <Text status={'danger'}>{error.name}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.address}
            </Text>
            <Input
              onChangeText={text => {
                setAddress(text);
                setError({...error, address: null});
              }}
              status={error.address ? 'danger' : ''}
              placeholder={'Kalanki, Kathmandu'}
            />
            {error.address ? (
              <Text status={'danger'}>{error.address}</Text>
            ) : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.company}
            </Text>
            <Input
              onChangeText={text => {
                setCompany(text);
                setError({...error, company: null});
              }}
              status={error.company ? 'danger' : ''}
              placeholder={'ABC Company'}
            />
            {error.company ? (
              <Text status={'danger'}>{error.company}</Text>
            ) : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.phone}
            </Text>
            <Input
              onChangeText={text => {
                setPhone(text);
                setError({...error, phone: null});
              }}
              status={error.phone ? 'danger' : ''}
              placeholder={'98xxxxxxxx'}
            />
            {error.phone ? <Text status={'danger'}>{error.phone}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.email}
            </Text>
            <Input
              onChangeText={text => {
                setEmail(text);
                setError({...error, email: null});
              }}
              status={error.email ? 'danger' : ''}
              placeholder={'someperson@example.com'}
            />
            {error.email ? <Text status={'danger'}>{error.email}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>
              {currentLanguage.password}
            </Text>
            <Input
              onChangeText={text => {
                setPassword(text);
                setError({...error, password: null});
              }}
              status={error.password ? 'danger' : ''}
              accessoryRight={() => {
                return (
                  <Button
                    size={'small'}
                    appearance={'ghost'}
                    onPress={() => {
                      setShowPassword(!showPassword);
                    }}
                    accessoryLeft={iconProps => (
                      <Icon
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        {...iconProps}
                      />
                    )}
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
        </ScrollView>
      </Layout>
      <Layout
        level={'4'}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Button
          style={{minWidth: 150}}
          appearance={'outline'}
          onPress={() => {
            props.navigation.goBack();
          }}>
          {currentLanguage.cancel}
        </Button>
        <Button
          disabled={loading}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }
          onPress={() => {
            const validation = validate({
              name: name,
              address: address,
              email: email,
              password: password,
              company: company,
              phone: phone,
            });
            if (
              validation.name ||
              validation.address ||
              validation.company ||
              validation.email ||
              validation.phone ||
              validation.password
            ) {
              setError(validation);
            } else {
              setLoading(true);
              registerVendor({
                name: name,
                companyName: company,
                email: email,
                password: password,
                phoneNumber: phone,
                address: address,
              })
                .then(async response => {
                  ToastAndroid.show(response.message, 5000);
                  props.navigation.navigate('sendVerificationCodeScreen');
                })
                .catch(async (exception: any) => {
                  if (exception instanceof Exception) {
                    Alert.alert(
                      currentLanguage.alert1,
                      await exception.response.text(),
                    );
                  } else {
                    Alert.alert(
                      currentLanguage.alert1,
                      currentLanguage.m4 + exception.message,
                    );
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          }}
          style={{minWidth: 150}}>
          {currentLanguage.register}
        </Button>
      </Layout>
    </Layout>
  );
};

export default RegisterVendorScreen;
