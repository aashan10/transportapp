import React, {useEffect, useState} from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {ScrollView} from 'react-native';
import Header from '../components/header';
import RefreshControl from '../components/refresh-control';

const HomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
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
            <Text>Hello User!</Text>
          </Card>
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default HomeScreen;
