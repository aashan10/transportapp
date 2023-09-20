import {Coordinates} from '@mapbox/mapbox-sdk';
import MapboxGL from '@rnmapbox/maps';
import {Button, Layout} from '@ui-kitten/components';
import React, {useContext, useState} from 'react';
import {useEffect} from 'react';
import {Image, useWindowDimensions, View} from 'react-native';
import {MAPBOX_API_KEY, MAPBOX_DIRECTIONS_API_URL} from '../../api/constants';
import Header from '../../components/header';
import LocationPicker from '../../components/location-picker';
import LocalizationContext from '../../contexts/localization-context';
import {ThemeContext} from '../../contexts/theme-context';
import {FeatureCollection, Feature} from 'geojson';
const PickupScreen = ({navigation}: {navigation: any}) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const {height, width} = useWindowDimensions();
  const {theme} = useContext(ThemeContext);
  const [delivery] = useState<Coordinates>([85.318948, 27.690027]);
  const [pickup, setPickup] = useState<Coordinates>([85.318948, 27.690027]);
  const [center, setCenter] = useState<Coordinates>([85.318948, 27.690027]);
  const [locationName, setLocationName] = useState<string>('');
  const [showMap, setShowMap] = useState<boolean>(false);
  const [path, setPath] = useState<FeatureCollection>({
    type: 'FeatureCollection',
    features: [],
  });
  useEffect(() => {
    if (pickup && delivery) {
      const url = `${MAPBOX_DIRECTIONS_API_URL}/${pickup.toString()};${delivery.toString()}?access_token=${MAPBOX_API_KEY}&geometries=geojson`;

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
  }, [delivery, pickup]);
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header
          navigation={navigation}
          back={true}
          title="Choose a pickup location"
        />
      </Layout>
      <View style={{flex: 1, margin: 5, borderRadius: 10}}>
        <LocationPicker
          onItemPress={(item: any) => {
            const {place_name} = item;
            setLocationName(place_name);
            setPickup(item.center);
            setCenter(item.center);
            setShowMap(true);
          }}
          onChangeText={(text: string) => {
            if (text === '') {
              setShowMap(false);
            }
          }}
        />
        {showMap && (
          <MapboxGL.MapView
            style={{
              height: height - 175,
              width: width - 10,
              borderRadius: 10,
              overflow: 'hidden',
            }}
            onPress={data => {
              if (data.geometry.type === 'Point') {
                // @ts-ignore
                setPickup(data.geometry.coordinates);
              }
            }}
            logoEnabled={false}
            styleURL={
              theme.name === 'dark'
                ? 'mapbox://styles/aashan10/ckrrtqczwge5e19nzsserx3yo'
                : 'mapbox://styles/aashan10/ckrrtzng71ayz17pilq44om1t'
            }
            attributionEnabled={false}>
            <MapboxGL.Camera centerCoordinate={center} zoomLevel={12} />

            {pickup && (
              <>
                <MapboxGL.MarkerView
                  id={'pickup-location'}
                  coordinate={pickup}
                  anchor={{x: 0.25, y: 1}}>
                  <Image
                    source={require('../../assets/marker-red.png')}
                    style={{
                      height: 35,
                      width: 35 * 1.205,
                    }}
                  />
                </MapboxGL.MarkerView>
              </>
            )}
          </MapboxGL.MapView>
        )}
      </View>
      <Layout
        style={{
          padding: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
        level={'4'}>
        <Button
          style={{minWidth: 150}}
          appearance={'outline'}
          onPress={() => {
            navigation.goBack();
          }}>
          {currentLanguage.cancel}
        </Button>
        <Button
          disabled={!pickup}
          onPress={() => {
            navigation.navigate('delivery', {
              pickupLocation: {name: locationName, coords: pickup},
            });
          }}
          style={{minWidth: 150}}>
          Next
        </Button>
      </Layout>
    </Layout>
  );
};

export default PickupScreen;
