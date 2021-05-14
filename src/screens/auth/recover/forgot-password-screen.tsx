import React, {useState} from 'react';
import {Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {View} from 'react-native';
import {EMAIL_REGEX} from '../../../helpers/constants';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen = ({navigation}: ForgotPasswordScreenProps) => {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout>
        <Header navigation={navigation} back={true} title={'Recover Account'} />
      </Layout>
      <Layout
        style={{
          margin: 5,
          borderRadius: 10,
          padding: 10,
          flex: 1,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontWeight: 'bold', paddingBottom: 10}}>Email ID</Text>
          <Input
            value={email}
            onChangeText={setEmail}
            autoFocus={true}
            status={error !== '' ? 'danger' : ''}
            placeholder={'someone@example.com'}
          />
          <Text status={'danger'}>{error}</Text>
        </View>

        <Layout
          style={{backgroundColor: 'orange', padding: 10, borderRadius: 10}}>
          <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
            To reset your password, we need to make sure that the account
            actually belongs to you! Please provide us your email address that
            you used at the time of registration and we will send you a
            verification code which can be used in the next screen to reset your
            password!
          </Text>
        </Layout>
      </Layout>
      <Layout
        level={'4'}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          paddingBottom: 10,
        }}>
        <Button
          appearance={'outline'}
          style={{minWidth: 150}}
          onPress={() => {
            navigation.goBack();
          }}>
          Cancel
        </Button>
        <Button
          style={{minWidth: 150}}
          disabled={loading}
          onPress={() => {
            if (!EMAIL_REGEX.test(email)) {
              setError('Please enter a valid email address!');
            } else {
              setError('');
            }
          }}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }
          accessoryRight={() => (
            <Text style={{paddingLeft: 20}}>
              {loading ? 'Loading' : 'Continue'}
            </Text>
          )}
        />
      </Layout>
    </Layout>
  );
};

export default ForgotPasswordScreen;
