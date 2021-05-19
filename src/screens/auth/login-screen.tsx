import React, {useContext, useEffect, useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {Exception, userLogin} from '../../api/requests';
import UserContext from '../../contexts/user-context';
import Button from '../../components/button';
import {isEmpty} from '../../helpers/functions';
import LocalizationContext from '../../contexts/localization-context';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';

const LoginScreen = (props: any) => {
  const {user, setUser} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    if (!isEmpty(user.token)) {
      props.navigation.navigate('home');
    }
  }, [props.navigation, user, props.route]);

  useFocusEffect(() => {
    if (!isEmpty(user.token)) {
      props.navigation.navigate('home');
    }
  });
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <Layout style={style.container}>
      <View style={style.centeredContent}>
        <Text
          style={{
            marginBottom: 100,
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          {currentLanguage.appName}
        </Text>
        <ScrollView>
          <Input
            style={style.spacedComponent}
            value={username}
            onChangeText={text => setUsername(text)}
            placeholder={currentLanguage.username}
          />
          <Input
            style={[style.spacedComponent, {marginBottom: 50}]}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={text => setPassword(text)}
            placeholder={currentLanguage.password}
            accessoryRight={() => {
              return (
                <Button
                  appearance={'ghost'}
                  size={'small'}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  accessoryLeft={iconProps => {
                    return (
                      <Icon
                        {...iconProps}
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      />
                    );
                  }}
                />
              );
            }}
          />
          <Button
            style={style.spacedComponent}
            appearance={'primary'}
            onPress={() => {
              setLoading(true);
              userLogin({username: username, password: password})
                .then(response => {
                  if (setUser) {
                    setUser({token: response.token});
                    props.navigation.navigate('home');
                  }
                })
                .catch(async (err: Exception) => {
                  try {
                    const {response} = err;
                    if (response.status >= 400 && response.status < 500) {
                      ToastAndroid.show((await response.json()).message, 5000);
                    } else if (response.status >= 500) {
                      ToastAndroid.show(
                        currentLanguage.loginAlert,

                        5000,
                      );
                    }
                  } catch (e) {
                    ToastAndroid.show('No internet connection', 5000);
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
            disabled={loading}
            accessoryLeft={() => {
              if (!loading) {
                return <View />;
              }
              return <Spinner size={'small'} style={{borderColor: 'white'}} />;
            }}>
            {loading ? undefined : currentLanguage.login}
          </Button>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() => {
                props.navigation.navigate('register');
              }}
              style={style.spacedComponent}
              appearance={'ghost'}>
              {currentLanguage.registerHere}
            </Button>
            <Button
              onPress={() => {
                props.navigation.navigate('verifyAccount');
              }}
              style={style.spacedComponent}
              appearance={'ghost'}>
              {currentLanguage.verifyEmail}
            </Button>
          </View>
          <View>
            <Button
              onPress={() => {
                props.navigation.navigate('forgotPassword');
              }}
              style={style.spacedComponent}
              appearance={'ghost'}>
              {currentLanguage.forgotPassword}
            </Button>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  spacedComponent: {
    marginTop: 15,
  },
  centeredContent: {
    marginTop: '60%',
  },
  container: {
    padding: 10,
    height: '100%',
  },
});

export default LoginScreen;
