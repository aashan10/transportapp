import React, {useState} from 'react';
import {Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {Alert, View} from 'react-native';
import {EMAIL_REGEX} from '../../../helpers/constants';
import {forgotPassword, Exception} from '../../../api/requests';

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
        <Layout>
          <Layout
            style={{backgroundColor: 'orange', padding: 10, borderRadius: 10}}>
            <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
              To reset your password, we need to make sure that the account
              actually belongs to you! Please provide us your email address that
              you used at the time of registration and we will send you a
              verification code which can be used in the next screen to reset
              your password!
            </Text>
          </Layout>
          <Button
            onPress={() => {
              navigation.navigate('recoverPassword');
            }}
            appearance={'ghost'}>
            I have a confirmation code.
          </Button>
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
              setLoading(true);
              forgotPassword(email)
                .then(() => {
                  Alert.alert(
                    'Email Sent',
                    'An email containing a token has been sent to your email address. Please check your mailbox and enter token and new password to reset your password',
                  );
                  navigation.navigate('recoverPassword');
                })
                .catch(async (err: any) => {
                  if (err instanceof Exception) {
                    const {response} = err;
                    try {
                      const msg = await response.text();
                      Alert.alert('Error', msg);
                    } catch (e) {
                      Alert.alert(
                        'Error',
                        'There was an error processing your request' +
                          e.message,
                      );
                    }
                  } else {
                    Alert.alert('Error', err.message);
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }
          }}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }>
          {loading ? 'Loading' : 'Continue'}
        </Button>
      </Layout>
    </Layout>
  );
};

export default ForgotPasswordScreen;
