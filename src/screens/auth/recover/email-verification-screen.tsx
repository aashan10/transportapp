import React, {useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import {View, Alert} from 'react-native';
import Button from '../../../components/button';
import {EMAIL_REGEX} from '../../../helpers/constants';
import {changePassword, Exception, forgotPassword} from '../../../api/requests';
import {useContext} from 'react';
import LocalizationContext from '../../../contexts/localization-context';

interface EmailVerificationScreenProps {
  navigation: any;
}

const EmailVerificationScreen = ({
  navigation,
}: EmailVerificationScreenProps) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [showToken, setShowToken] = useState<boolean>(false);

  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout>
        <Header
          navigation={navigation}
          back={true}
          title={'Change Account Password'}
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
              {currentLanguage.newPass}
            </Text>
            <Input
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoFocus={true}
              accessoryRight={() => (
                <Button
                  appearance={'ghost'}
                  size={'small'}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  accessoryRight={iconProps => (
                    <Icon
                      {...iconProps}
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    />
                  )}
                />
              )}
            />
          </View>

          <View>
            <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
              {currentLanguage.cPassword}
            </Text>
            <Input
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              accessoryRight={() => (
                <Button
                  appearance={'ghost'}
                  size={'small'}
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  accessoryRight={iconProps => (
                    <Icon
                      {...iconProps}
                      name={
                        showConfirmPassword ? 'eye-off-outline' : 'eye-outline'
                      }
                    />
                  )}
                />
              )}
            />
          </View>

          <View>
            <Text style={{fontWeight: 'bold', paddingVertical: 10}}>
              {currentLanguage.confirmCode}
            </Text>
            <Input
              value={token}
              secureTextEntry={!showToken}
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
            {currentLanguage.changeAccDes}
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
            changePassword({
              newPassword: password,
              confirmPassword: confirmPassword,
              token: token,
            })
              .then(() => {
                Alert.alert(currentLanguage.alert2, currentLanguage.m5);
                navigation.navigate('login');
              })
              .catch(async exception => {
                if (exception instanceof Exception) {
                  const {response} = exception;
                  const text = await response.text();
                  try {
                    const json = JSON.parse(text);
                    Alert.alert('Error', json.message);
                  } catch (e) {
                    Alert.alert('Error', text);
                  }
                } else {
                  Alert.alert(currentLanguage.alert1, currentLanguage.m4);
                }
              })
              .finally(() => {
                setLoading(false);
              });
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

export default EmailVerificationScreen;
