import React, {useContext, useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import Header from '../components/header';
import UserContext from '../contexts/user-context';
import LocalizationContext from '../contexts/localization-context';
import {getDeliveryitemDetail} from '../api/requests';
import {Alert, ScrollView} from 'react-native';
import DeliveryRequest from '../components/delivery-request';
import RefreshControl from '../components/refresh-control';

const History = ({navigation}: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const {currentLanguage} = useContext(LocalizationContext);
  useEffect(() => {
    return navigation.addListener('focus', () => {
      setLoading(true);
      getDeliveryitemDetail()
        .then((feeds: any) => {
          if (feeds.message) {
            Alert.alert('Message', feeds.message);
          }
          if (feeds.sortedItems) {
            setPosts(feeds.sortedItems);
          }
        })
        .catch(() => {
          setPosts([]);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [navigation, user.token]);
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header title={currentLanguage.history} navigation={navigation} />
      </Layout>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setLoading(true);
              getDeliveryitemDetail()
                .then((feeds: any) => {
                  if (feeds.message) {
                    Alert.alert('Message', feeds.message);
                  }
                  if (feeds.sortedItems) {
                    setPosts(feeds.sortedItems);
                  } else {
                    setPosts([]);
                  }
                })
                .catch(() => {
                  setPosts([]);
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        }
        style={{height: '100%', flex: 1, margin: 5}}>
        {posts.map((post, key) => (
          <DeliveryRequest key={key} request={post} navigation={navigation} />
        ))}
      </ScrollView>
    </Layout>
  );
};

export default History;
