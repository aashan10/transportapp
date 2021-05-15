import React, {useContext, useEffect, useState} from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {ScrollView, View} from 'react-native';
import Header from '../components/header';
import RefreshControl from '../components/refresh-control';
import UserContext from '../contexts/user-context';
import Button from '../components/button';
import {Exception, getDriverFeeds} from '../api/requests';
import DeliveryRequest from '../components/delivery-request';
import LocalizationContext from '../contexts/localization-context';

const HomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {currentLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    setLoading(false);
    getDriverFeeds()
      .then(feeds => {
        setPosts(feeds.totalItem);
      })
      .catch(err => {})
      .finally(() => {
        setLoading(false);
      });
  }, [user.token, navigation]);

  return (
    <Layout style={{height: '100%', width: '100%'}}>
      <Header navigation={navigation} />
      <Layout
        style={{padding: 5, paddingTop: 10, height: '100%', flex: 1}}
        level={'4'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                getDriverFeeds()
                  .then(feeds => {
                    setPosts(feeds.totalItem);
                    console.log(feeds.totalItem[0]);
                  })
                  .catch(async (err: Exception) => {
                    console.log(await err.response.text());
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          }
          style={{height: '100%'}}>
          {user.role === 'vendor' ? (
            <Card style={{borderRadius: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Requests</Text>
                <Button
                  onPress={() => {
                    navigation.navigate('createRequest');
                  }}
                  size={'small'}>
                  {currentLanguage.addNewRequest}
                </Button>
              </View>
            </Card>
          ) : null}
          {posts.map((post, id) => {
            return (
              <DeliveryRequest
                key={id}
                navigation={navigation}
                request={post}
              />
            );
          })}
        </ScrollView>
      </Layout>
    </Layout>
  );
};

export default HomeScreen;
