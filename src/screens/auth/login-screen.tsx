import React, {useContext, useEffect, useState} from 'react';
import {Icon, Input, Layout, Spinner, Text} from '@ui-kitten/components';
import {StyleSheet, View, ToastAndroid, Image} from 'react-native';
import {Exception, userLogin} from '../../api/requests';
import UserContext from '../../contexts/user-context';
import Button from '../../components/button';
import {isEmpty} from '../../helpers/functions';
import LocalizationContext from '../../contexts/localization-context';
import {useFocusEffect} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import {ThemeContext} from '../../contexts/theme-context';

const LoginScreen = (props: any) => {
  const {user, setUser} = useContext(UserContext);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {currentLanguage, setLanguage} = useContext(LocalizationContext);
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

  const ThemeIcon = (iconProps: any) => {
    return (
      <Icon
        name={theme.name === 'dark' ? 'moon-outline' : 'sun-outline'}
        {...iconProps}
      />
    );
  };
  return (
    <Layout style={style.container}>
      <View
        style={{
          position: 'absolute',
          top: 50,
          right: 10,
          flexDirection: 'row',
        }}>
        <Button
          size={'small'}
          appearance={'outline'}
          style={{
            padding: 0,
            borderWidth: 0,
            borderTopEndRadius: 0,
            borderBottomEndRadius: 0,
          }}
          accessoryLeft={() => {
            return <Text style={{fontSize: 20}}>{currentLanguage.lang}</Text>;
          }}
          onPress={() => {
            if (currentLanguage.login === 'Login') {
              setLanguage('np');
            } else {
              setLanguage('en');
            }
          }}
        />

        <Button
          size={'small'}
          appearance={'outline'}
          style={{
            padding: 0,
            borderWidth: 0,
            borderTopStartRadius: 0,
            borderBottomStartRadius: 0,
          }}
          accessoryLeft={iconProps => {
            return <ThemeIcon {...iconProps} />;
          }}
          onPress={() => {
            toggleTheme();
          }}
        />
      </View>
      <View style={style.centeredContent}>
        <Text
          style={{
            marginBottom: 10,
            width: '100%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
          }}
        />
        <View style={[styles.conatiner]}>
          <Image
            style={styles.stretch}
            source={require('../../assets/transporticon.png')}
          />
        </View>
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
              userLogin({phoneNumber: username, password: password})
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
const styles = StyleSheet.create({
  conatiner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  stretch: {
    width: 60,
    height: 60,
    margin: 60,
    resizeMode: 'stretch',
  },
});

const style = StyleSheet.create({
  spacedComponent: {
    marginTop: 20,
  },
  centeredContent: {
    marginTop: '20%',
  },
  container: {
    padding: 10,
    height: '100%',
  },
});

export default LoginScreen;
