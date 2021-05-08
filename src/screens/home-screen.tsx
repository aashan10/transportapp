import React, {useContext, useEffect, useState} from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
import Header from '../components/header';
import RefreshControl from '../components/refresh-control';
import UserContext from '../contexts/user-context';
import Button from '../components/button';
const HomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const {user} = useContext(UserContext);
  useEffect(() => {}, []);

  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Header navigation={navigation} />
      <Layout style={{padding: 5, height: '100%'}} level={'4'}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 5000);
              }}
            />
          }
          style={{height: '100%'}}>
          <Card style={{borderRadius: 10}}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>Requests</Text>
              <Button
                onPress={() => {
                  navigation.navigate('create Request');
                }}
                size={'small'}>
                Add New Request
              </Button>
            </View>
          </Card>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default HomeScreen;
