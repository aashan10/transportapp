import React, {useContext, useEffect, useState} from 'react';
import {Input, Layout, Spinner} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {userLogin} from '../../api/requests';
import UserContext from '../../contexts/user-context';
import Button from '../../components/button';

const LoginScreen = (props: any) => {
  const {user} = useContext(UserContext);

  useEffect(() => {
    if (user) {
      props.navigation.navigate('home');
    }
  }, [props.navigation, user]);

  const [username, setUsername] = useState<string>('9806088688');
  const [password, setPassword] = useState<string>('helloo11');
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
                console.log(response);
              })
              .catch((err: any) => {
                console.log(err);
              })
              .finally(() => {
                setLoading(false);
                props.navigation.navigate('home');
              });
          }}
          disabled={loading}
          accessoryLeft={() => {
            if (!loading) {
              return <View />;
            }
            return <Spinner size={'small'} style={{borderColor: 'white'}} />;
          }}>
          {loading ? undefined : 'Login'}
        </Button>
        <Button
          onPress={() => {
            props.navigation.navigate('register');
          }}
          style={style.spacedComponent}
          appearance={'ghost'}>
          Not registered? Register Here
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
