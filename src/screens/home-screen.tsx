import React, { useContext, useEffect, useState } from 'react';
import { Card, Layout, Text } from '@ui-kitten/components';
import { ScrollView, View, Alert } from 'react-native';
import Header from '../components/header';
import RefreshControl from '../components/refresh-control';
import UserContext from '../contexts/user-context';
import Button from '../components/button';
import { currentAddress, getNearYouItem } from '../api/requests';
import DeliveryRequest from '../components/delivery-request';
import LocalizationContext from '../contexts/localization-context';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../helpers/functions';
const HomeScreen = ({ navigation }: any) => {
  const [posts, setPosts] = useState<Array<any>>([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentLanguage } = useContext(LocalizationContext);
  const [latLng, setLatLng] = useState<[number, number]>([1, 1]);

  useEffect(() => {
    Geolocation.watchPosition((location) => {
      console.log(location);
      
    }, () => {}, {
      timeout:  5000,
      maximumAge: 60 * 1000,
      enableHighAccuracy: true,
      distanceFilter: 3
    });
  });

  useEffect(() => {
    const setMyLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLatLng([longitude, latitude]);
          currentAddress({
            driverCurrentLat: latitude.toString(),
            driverCurrentLng: longitude.toString(),
          })
          console.log(latitude, longitude);
          
        },
        () => { },
        {
          enableHighAccuracy: true
        }
      );

    };

    let interval: NodeJS.Timeout | false = false;
    requestLocationPermission()
      .then(() => {
        interval = setInterval(setMyLocation, 10000);
      })
      .catch(() => {
        Alert.alert(
          'Location permission is required to show your data in map!',
        );
      });
    return () => {
      interval && clearInterval(interval);
    };
  }, [navigation, posts, user]);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      setLoading(true);
      getNearYouItem({
        latitude: latLng[1],
        longitude: latLng[0]
      })
        .then(feeds => {
          setPosts(feeds.totalItem);
          if (feeds.totalItem && feeds.totalItem.length === 0) {
            Alert.alert('', currentLanguage.message5);
          }
        })
        .catch(() => { })
        .finally(() => {
          setLoading(false);
        });
    });
  }, [user.token, navigation, currentLanguage.message5]);

  return (
    <Layout style={{ height: '100%', width: '100%' }}>
      <Header navigation={navigation} />
      <Layout
        style={{ padding: 5, paddingTop: 10, height: '100%', flex: 1 }}
        level={'4'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                getNearYouItem({
                  latitude: latLng[1],
                  longitude: latLng[0]
                })
                  .then(feeds => {
                    setPosts(feeds.totalItem);
                    if (feeds.totalItem && feeds.totalItem.length === 0) {
                      Alert.alert('', currentLanguage.message5);
                    }
                  })
                  .catch(() => {
                    Alert.alert(
                      currentLanguage.alert1,
                      currentLanguage.message6,
                    );
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            />
          }
          style={{ height: '100%' }}>
          {user.role === 'vendor' ? (
            <Card style={{ borderRadius: 10 }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
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
