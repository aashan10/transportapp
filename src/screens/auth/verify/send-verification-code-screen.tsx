import React, {useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import {Alert, View} from 'react-native';
import Button from '../../../components/button';
import {verifyAccount} from '../../../api/requests';
import {useContext} from 'react';
import LocalizationContext from '../../../contexts/localization-context';

interface SendVerificationCodeScreenInterface {
  navigation: any;
}

const SendVerificationCodeScreen = ({
  navigation,
}: SendVerificationCodeScreenInterface) => {
  const {currentLanguage} = useContext(LocalizationContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [showToken, setShowToken] = useState<boolean>(false);

  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout>
        <Header
          navigation={navigation}
          back={true}
          title={currentLanguage.accountOTP}
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
          <View>
            <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
              {currentLanguage.confirmCode}
            </Text>
            <Input
              value={token}
              secureTextEntry={!showToken}
              placeholder={'OTP'}
              accessoryRight={() => (
                <Button
                  appearance={'ghost'}
                  size={'small'}
                  onPress={() => {
                    setShowToken(!showToken);
                  }}
                  accessoryRight={iconProps => (
                    <Icon
                      {...iconProps}
                      name={showToken ? 'eye-off-outline' : 'eye-outline'}
                    />
                  )}
                />
              )}
              onChangeText={setToken}
            />
          </View>
        </View>

        <Layout
          style={{backgroundColor: 'orange', padding: 10, borderRadius: 10}}>
          <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
            {currentLanguage.otpMessage}
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
          {currentLanguage.cancel}
        </Button>
        <Button
          style={{minWidth: 150}}
          disabled={loading}
          onPress={() => {
            setLoading(true);
            verifyAccount({token: token})
              .then(() => {
                Alert.alert('Success', 'The account has been verified!');
                navigation.navigate('login');
              })
              .catch(() => {
                Alert.alert('Error', 'There was a problem with verification!');
              })
              .finally(() => {
                setLoading(false);
              });
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

export default SendVerificationCodeScreen;
