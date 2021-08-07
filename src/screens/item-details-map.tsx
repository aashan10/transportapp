import MapboxGL from '@react-native-mapbox-gl/maps';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {RequestInterface} from './item-details';
import {useWindowDimensions, StatusBar, Alert} from 'react-native';
import {View} from 'react-native';
import {Image} from 'react-native';
import {requestLocationPermission} from '../helpers/functions';
import Geolocation from '@react-native-community/geolocation';
import {ThemeContext} from '../contexts/theme-context';
import {MAPBOX_API_KEY, MAPBOX_DIRECTIONS_API_URL} from '../api/constants';
import {FeatureCollection, Feature} from 'geojson';
import LocalizationContext from '../contexts/localization-context';
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
  const {currentLanguage} = useContext(LocalizationContext);
  const [to, setTo] = useState<Partial<Coordinates>>({});
  const [path, setPath] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  const [isSatelliteView, setSatelliteView] = useState<boolean>(false);
  const {theme} = useContext(ThemeContext);

  let {height, width} = useWindowDimensions();

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

  useEffect(() => {
    const setMyLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setTo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {},
        {},
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
  }, [route]);

  useEffect(() => {
    if (from.longitude && from.latitude && to.longitude && to.latitude) {
      const url = `${MAPBOX_DIRECTIONS_API_URL}/${to.longitude},${to.latitude};${from.longitude},${from.latitude}?access_token=${MAPBOX_API_KEY}&geometries=geojson`;

      fetch(url)
        .then(response => response.json())
        .then(geoJson => {
          const featureCollection: FeatureCollection = {
            type: 'FeatureCollection',
            features: [],
          };

          geoJson.routes.map((mapRoute: any) => {
            const feature: Feature = {
              type: 'Feature',
              geometry: mapRoute.geometry,
              properties: {
                color: 'green',
              },
            };
            featureCollection.features.push(feature);
          });

          setPath(featureCollection);
        })
        .catch(() => {});
    }
  }, [from, to]);

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
          size={'small'}
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
          size={'small'}
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
                {isSatelliteView ? 'Disable' : 'Enable'}{' '}
                {currentLanguage.satteliteView}
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
            <MapboxGL.ShapeSource
              id={'path'}
              shape={path}
              style={{
                backgroundColor: 'red',
                zIndex: 100,
              }}>
              {path.features.map((feature, id) => {
                return (
                  <MapboxGL.LineLayer
                    id={'line'}
                    style={{
                      lineJoin: 'round',
                      lineColor: theme['color-primary-500'],
                      lineWidth: 5,
                      lineCap: 'round',
                    }}
                  />
                );
              })}
            </MapboxGL.ShapeSource>
          </>
        ) : null}

        {from.latitude && from.longitude ? (
          <>
            <MapboxGL.MarkerView
              id={'pickup-location'}
              coordinate={[from.longitude, from.latitude]}
              anchor={{x: 0.25, y: 1}}>
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
              anchor={{x: 0.25, y: 1}}
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
          <Text>{currentLanguage.yourLocation}</Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../assets/marker-red.png')}
            style={{height: 30, width: 1.25 * 30}}
          />
          <Text>{currentLanguage.pickupLocation}</Text>
        </View>
      </Layout>
    </Layout>
  );
};

export default ItemDetailsMap;
