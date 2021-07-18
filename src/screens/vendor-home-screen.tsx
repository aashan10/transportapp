import React, {useContext, useEffect, useState} from 'react';
import {Card, Layout, Text} from '@ui-kitten/components';
import {Alert, ScrollView, View} from 'react-native';
import Header from '../components/header';
import RefreshControl from '../components/refresh-control';
import UserContext from '../contexts/user-context';
import Button from '../components/button';
import {Exception, getVendorItemsDetail} from '../api/requests';
import DeliveryRequest from '../components/delivery-request';
import LocalizationContext from '../contexts/localization-context';

const VendorHomeScreen = ({navigation}: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {currentLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    setLoading(true);
    getVendorItemsDetail()
      .then(feeds => {
        console.log(feeds)

        if (feeds.message) {
          Alert.alert('Message', feeds.message);
        }
        if (feeds.detail) {
          setPosts(feeds.detail);
        }
      })
      .catch(() => {})
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
                getVendorItemsDetail()
                  .then(feeds => {
                    if (feeds.message) {
                      Alert.alert('Message', feeds.message);
                    }
                    if (feeds.detail) {
                      setPosts(feeds.detail);
                    }
                  })
                  .catch(() => {
                    Alert.alert(
                      currentLanguage.alert1,
                      currentLanguage.message7,
                    );
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          }
          style={{height: '100%', flex: 1}}>
          {user.role === 'vendor' ? (
            <Card style={{borderRadius: 10}}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>{currentLanguage.request}</Text>
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
          {posts.map((post, index) => {
            return (
              <DeliveryRequest
                key={index}
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

export default VendorHomeScreen;
