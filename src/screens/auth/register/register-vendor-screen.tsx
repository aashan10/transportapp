import React, {useState} from 'react';
import {Icon, Input, Layout, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import {ScrollView, View} from 'react-native';
import Button from '../../../components/button';

const RegisterVendorScreen = (props: any) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Layout style={{height: '100%'}} level={'1'}>
      <Header title={'Register as Vendor'} navigation={props.navigation} />
      <Layout
        style={{height: '100%', padding: 5, display: 'flex', flex: 10}}
        level={'4'}>
        <ScrollView
          style={{
            height: '100%',
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Full Name</Text>
            <Input placeholder={'John Doe'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Email</Text>
            <Input placeholder={'someperson@example.com'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Address</Text>
            <Input placeholder={'Kalanki, Kathmandu'} />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Password</Text>
            <Input
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
              placeholder={'someperson@example.com'}
              secureTextEntry={!showPassword}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{fontWeight: 'bold', marginBottom: 5}}>Phone</Text>
            <Input placeholder={'98xxxxxxxx'} />
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
          Cancel
        </Button>
        <Button style={{minWidth: 150}}>Register</Button>
      </Layout>
    </Layout>
  );
};

export default RegisterVendorScreen;
