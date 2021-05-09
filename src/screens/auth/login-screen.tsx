import React, {useContext, useEffect, useState} from 'react';
import {Input, Layout, Spinner} from '@ui-kitten/components';
import {StyleSheet, View, ToastAndroid} from 'react-native';
import {Exception, userLogin} from '../../api/requests';
import UserContext from '../../contexts/user-context';
import Button from '../../components/button';
import {isEmpty} from '../../helpers/functions';
import LocalizationContext from '../../contexts/localization-context';

const LoginScreen = (props: any) => {
  const {user, setUser} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    if (!isEmpty(user.token)) {
      props.navigation.navigate('home');
    }
  }, [props.navigation, user]);

  const [username, setUsername] = useState<string>('98123456');
  const [password, setPassword] = useState<string>('changeme');
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Layout style={style.container}>
      <View style={style.centeredContent}>
        <Input
          style={style.spacedComponent}
          value={username}
          onChangeText={text => setUsername(text)}
          placeholder={'Username'}
        />
        <Input
          style={style.spacedComponent}
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder={'Password'}
        />
        <Button
          style={style.spacedComponent}
          appearance={'outline'}
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
                    ToastAndroid.show(
                      'The username and password do not match our records!',
                      5000,
                    );
                  } else if (response.status >= 500) {
                    ToastAndroid.show(
                      'A problem occurred in server. Please try again later!',
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
        <Button
          onPress={() => {
            props.navigation.navigate('register');
          }}
          style={style.spacedComponent}
          appearance={'ghost'}>
          {currentLanguage.registerHere}
        </Button>
      </View>
    </Layout>
  );
};

const style = StyleSheet.create({
  spacedComponent: {
    marginTop: 20,
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
