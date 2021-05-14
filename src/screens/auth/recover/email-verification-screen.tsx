import React, {useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../../components/header';
import {View} from 'react-native';
import Button from '../../../components/button';
import {EMAIL_REGEX} from '../../../helpers/constants';
import {Exception, forgotPassword} from '../../../api/requests';

interface EmailVerificationScreenProps {
  navigation: any;
}

const EmailVerificationScreen = ({
  navigation,
}: EmailVerificationScreenProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(
    false,
  );
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
              New Password
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
              Confirm Password
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
              Confirmation Code
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
            On the confirmation code field, please enter the confirmation code
            sent to your email address.
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
          onPress={() => {}}
          accessoryLeft={() =>
            loading ? <Spinner size={'small'} /> : <View />
          }>
          {loading ? 'Loading' : 'Continue'}
        </Button>
      </Layout>
    </Layout>
  );
};

export default EmailVerificationScreen;
