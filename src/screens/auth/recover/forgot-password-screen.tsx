import React, {useState} from 'react';
import {Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import Button from '../../../components/button';
import {Alert, View} from 'react-native';
import {EMAIL_REGEX} from '../../../helpers/constants';
import {forgotPassword, Exception} from '../../../api/requests';
import LocalizationContext from '../../../contexts/localization-context';
import {useContext} from 'react';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen = ({navigation}: ForgotPasswordScreenProps) => {
  const {currentLanguage} = useContext(LocalizationContext);

  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout>
        <Header
          navigation={navigation}
          back={true}
          title={currentLanguage.recoverAccount}
        />
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
          <Text style={{fontWeight: 'bold', paddingBottom: 10}}>
            {currentLanguage.eid}
          </Text>
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
              {currentLanguage.recoverMessage}
            </Text>
          </Layout>
          <Button
            onPress={() => {
              navigation.navigate('recoverPassword');
            }}
            appearance={'ghost'}>
            {currentLanguage.haveCode}
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
          {currentLanguage.cancel}
        </Button>
        <Button
          style={{minWidth: 150}}
          disabled={loading}
          onPress={() => {
            if (!EMAIL_REGEX.test(email)) {
              setError(currentLanguage.m8);
            } else {
              setError('');
              setLoading(true);
              forgotPassword(email)
                .then(() => {
                  Alert.alert(currentLanguage.alert3, currentLanguage.m6);
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
                        currentLanguage.alert1,
                        currentLanguage.m7 + e.message,
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
          {loading ? currentLanguage.loading : currentLanguage.continue}
        </Button>
      </Layout>
    </Layout>
  );
};

export default ForgotPasswordScreen;
