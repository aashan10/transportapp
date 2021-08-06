import MapboxGL from '@react-native-mapbox-gl/maps';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React, {useCallback, useContext, useEffect} from 'react';
import {useState} from 'react';
import {RequestInterface} from './item-details';
import {useWindowDimensions, StatusBar, Alert} from 'react-native';
import {View} from 'react-native';
import {Image} from 'react-native';
import {throttle} from 'underscore';
import {requestLocationPermission} from '../helpers/functions';
import Geolocation from '@react-native-community/geolocation';
import {ThemeContext} from '../contexts/theme-context';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface ItemDetailsMapProps {
  navigation: any;
  item: any;
  route: any;
}

const ItemDetailsMap = ({navigation, route}: ItemDetailsMapProps) => {
  const [item] = useState<RequestInterface>(route.params.item);
  const [from, setFrom] = useState<Partial<Coordinates>>({});
  const [to, setTo] = useState<Partial<Coordinates>>({});
  const [path, setPath] = useState<any>(null);
  const [isSatelliteView, setSatelliteView] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const {theme} = useContext(ThemeContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setCurrentCoordinates = useCallback(
    throttle(({lat, lng}: {lat: number; lng: number}) => {
      setTo({latitude: lat, longitude: lng});
    }, 3000),
    [],
  );
  let {height, width} = useWindowDimensions();

  useEffect(() => {
    setBgColor(theme[theme['background-basic-color-4'].slice(1)]);
  }, [theme]);

  // @ts-ignore
  height += StatusBar?.currentHeight;
  useEffect(() => {
    if (item.latitudeOfDeliveryFrom && item.longitudeOfDeliveryFrom) {
      setFrom({
        latitude: item.latitudeOfDeliveryFrom,
        longitude: item.longitudeOfDeliveryFrom,
      });
    }
  }, [item]);

  requestLocationPermission()
    .then(() => {
      Geolocation.watchPosition(
        currentLocation => {
          setCurrentCoordinates({
            lat: currentLocation.coords.latitude,
            lng: currentLocation.coords.longitude,
          });
        },
        err => () => {
          Alert.alert('Error', err.message + 'Error Code: ' + err.code);
        },
      );
    })
    .catch(() => {
      Alert.alert('Error', 'Cannot access location services');
    });

  const BackIcon = (props: any) => {
    return (
      <Icon
        {...props}
        name={'arrow-back-outline'}
        fill={theme['color-primary-500']}
      />
    );
  };

  return (
    <Layout style={{height: '100%', backgroundColor: 'black'}}>
      <StatusBar hidden={true} />

      <View
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          zIndex: 100,
        }}>
        <Button
          onPress={() => {
            navigation.goBack();
          }}
          appearance={'outline'}
          style={{
            borderBottomStartRadius: 100,
            borderTopStartRadius: 100,
            margin: 0,
          }}
          accessoryLeft={BackIcon}
        />

        <Button
          onPress={() => {
            setSatelliteView(!isSatelliteView);
          }}
          accessoryLeft={() => {
            return (
              <Text
                style={{
                  fontWeight: 'bold',
                  paddingHorizontal: 10,
                  color: 'white',
                }}>
                {isSatelliteView ? 'Disable' : 'Enable'} Satellite View
              </Text>
            );
          }}
          appearance={'primary'}
          style={{
            borderBottomEndRadius: 100,
            borderTopEndRadius: 100,
            margin: 0,
          }}
        />
      </View>
      <MapboxGL.MapView
        style={{
          height: height,
          width: width,
          borderRadius: 20,
          overflow: 'hidden',
        }}
        logoEnabled={false}
        styleURL={
          isSatelliteView
            ? 'mapbox://styles/aashan10/ckryneo9e6gp117pkwcdpdv3q'
            : theme.name === 'dark'
            ? 'mapbox://styles/aashan10/ckrrtqczwge5e19nzsserx3yo'
            : 'mapbox://styles/aashan10/ckrrtzng71ayz17pilq44om1t'
        }
        attributionEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={12}
          centerCoordinate={[
            from.longitude ?? 85.324,
            from.latitude ?? 27.7172,
          ]}
        />
        {path ? (
          <>
            <MapboxGL.ShapeSource id={'path'} shape={path} />
          </>
        ) : null}

        {from.latitude && from.longitude ? (
          <>
            <MapboxGL.MarkerView
              id={'pickup-location'}
              coordinate={[from.longitude, from.latitude]}>
              <Image
                source={require('../assets/marker-red.png')}
                style={{
                  height: 35,
                  width: 35 * 1.205,
                }}
              />
            </MapboxGL.MarkerView>
          </>
        ) : null}

        {to.latitude && to.longitude ? (
          <>
            <MapboxGL.MarkerView
              id={'me'}
              coordinate={[to.longitude, to.latitude]}>
              <Image
                source={require('../assets/marker-gray.png')}
                style={{
                  height: 35,
                  width: 35 * 1.271,
                }}
              />
            </MapboxGL.MarkerView>
          </>
        ) : null}
      </MapboxGL.MapView>

      <Layout
        level={'4'}
        style={{
          height: 60,
          padding: 10,
          width: '100%',
          position: 'absolute',
          bottom: 0,
          borderRadius: 10,
          justifyContent: 'space-around',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/marker-gray.png')}
            style={{height: 30, width: 1.25 * 30}}
          />
          <Text>Your Location</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/marker-red.png')}
            style={{height: 30, width: 1.25 * 30}}
          />
          <Text>Pickup Location</Text>
        </View>
      </Layout>
    </Layout>
  );
};

export default ItemDetailsMap;
