import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Layout, ListItem, Spinner, Text } from '@ui-kitten/components';
import Header from '../components/header';
import { ScrollView, Alert, View } from 'react-native';
import Button from '../components/button';
import UserContext from '../contexts/user-context';
import { acceptDeliveryRequest, Exception, itemReached } from '../api/requests';
import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../helpers/functions';
import { MAPBOX_API_KEY } from '../api/constants';
import { throttle } from 'underscore';
MapboxGL.setAccessToken(MAPBOX_API_KEY);

interface ItemDetailsProps {
  navigation: any;
  item: any;
  route: any;
}

interface RequestInterface {
  itemId: string;
  itemName: string;
  deliveryPriceByVendor: string;
  deliveryPriceByAdmin: string;
  deliveryFrom: string;
  deliveryTo: string;
  containerSize: string;
  containerType: string;
  quantity: string;
  driverAccepted?: boolean;
  vendorId: string;
  latitudeOfDeliveryFrom: number;
  longitudeOfDeliveryFrom: number;
  acceptedAt: undefined | string;
}

const renderAnnotations = ({
  coordinates,
  isDestination,
}: {
  coordinates: Coordinates;
  isDestination: boolean;
}) => {
  const { latitude, longitude } = coordinates;
  return (
    <MapboxGL.PointAnnotation
      id={'' + latitude + longitude}
      title={'Pickup Location'}
      coordinate={[longitude, latitude]}>
      <View
        style={{
          height: 22,
          width: 22,
          padding: 5,
          borderWidth: 2,
          borderRadius: 20,
          backgroundColor: isDestination ? 'blue' : 'red',
          borderColor: 'white',
          zIndex: 1000,
        }}>
        <View
          style={{
            height: 7.5,
            width: 7.5,
            borderRadius: 7.5,
            backgroundColor: '#00CC66',
          }}
        />
      </View>
    </MapboxGL.PointAnnotation>
  );
};

interface Coordinates {
  latitude: number;
  longitude: number;
}

const renderPath = ({
  source,
  destination,
}: {
  source: Coordinates;
  destination: Coordinates;
}) => {
  return (
    <MapboxGL.ShapeSource
      id={'path'}
      shape={{
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: [
                [source.longitude, source.latitude],
                [destination.longitude, destination.latitude],
              ],
            },
          },
        ],
      }}>
      <MapboxGL.LineLayer
        id={'path'}
        style={{
          lineColor: '#00CC66',
          lineWidth: 5,
        }}
      />
    </MapboxGL.ShapeSource>
  );
};

const ItemDetails = ({ navigation, route }: ItemDetailsProps) => {
  const { user } = useContext(UserContext);

  const [location, setCurrentLocation] = useState<Coordinates>({
    longitude: 0,
    latitude: 0,
  });

  const setCurrentCoordinates = useCallback(throttle(({ lat, lng }: { lat: number, lng: number }) => {
    console.log({ lat, lng });
    setCurrentLocation({ latitude: lat, longitude: lng });
  }, 3000), []);

  requestLocationPermission()
    .then(() => {
      Geolocation.getCurrentPosition(
        currentLocation => setCurrentCoordinates({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude }),
        err => () => {
          Alert.alert('Error', err.message + 'Error Code: ' + err.code);
        },
      );
    })
    .catch(err => {
      Alert.alert('Error', 'Cannot access location services');
    });

  const [request, setRequest] = useState<RequestInterface>({
    itemId: '',
    itemName: '',
    deliveryPriceByVendor: '',
    deliveryPriceByAdmin: '',
    deliveryFrom: '',
    deliveryTo: '',
    containerSize: '',
    containerType: '',
    quantity: '',
    vendorId: '',
    latitudeOfDeliveryFrom: 85.31853583740946,
    longitudeOfDeliveryFrom: 27.701739466949107,
    acceptedAt: undefined
  });
  const [isVendor] = useState<boolean>(user.role === 'vendor');
  const [price, setPrice] = useState<string | number>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isDelivered, setDelivered] = useState<boolean>(false);
  useEffect(() => {
    setRequest(route.params.item);
    const finalPrice =
      request.deliveryPriceByAdmin ?? request.deliveryPriceByVendor ?? '';
    setPrice(finalPrice);
    setDelivered(request.acceptedAt !== undefined);
  }, [request.deliveryPriceByAdmin, route.params]);

  return (
    <Layout level={'4'} style={{ height: '100%' }}>
      <Layout style={{ width: '100%' }}>
        <Header back={true} navigation={navigation} title={'Request Details'} />
      </Layout>
      <Layout
        style={{
          flex: 1,
          height: '100%',
          margin: 5,
          borderRadius: 10,
          overflow: 'hidden',
        }}
        level={'1'}>
        <ScrollView>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Delivery From
            </Text>
            <Text style={{ flex: 2 }}>{request.deliveryFrom}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Delivery To
            </Text>
            <Text style={{ flex: 2 }}>{request.deliveryTo}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Price
            </Text>
            <Text style={{ flex: 2 }}>Rs. {price}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Item Name
            </Text>
            <Text style={{ flex: 2 }}>{request.itemName}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Quantity
            </Text>
            <Text style={{ flex: 2 }}>{request.quantity}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Vehicle Type
            </Text>
            <Text style={{ flex: 2 }}>{request.containerType}</Text>
          </ListItem>
          <ListItem
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
              Vehicle Size
            </Text>
            <Text style={{ flex: 2 }}>{request.containerSize}</Text>
          </ListItem>
        </ScrollView>
        <Layout
          style={{
            height: 370,
            width: '100%',
            borderRadius: 10,
            bottom: 0,
            overflow: 'hidden',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
            status={'primary'}>
            Pickup Location
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
            <View>
              <View style={{ height: 20, width: 20, backgroundColor: 'red', borderRadius: 20, padding: 5 }}>
                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: 'white' }} />
              </View>
              <Text>Your Current Location</Text>
            </View>
            <View>
              <View style={{ height: 20, width: 20, backgroundColor: 'blue', borderRadius: 20, padding: 5 }}>
                <View style={{ height: 10, width: 10, borderRadius: 10, backgroundColor: 'white' }} />
              </View>
              <Text>Pickup Location</Text>
            </View>
          </View>
          <Layout style={{ borderRadius: 10, overflow: 'hidden' }}>
            <MapboxGL.MapView
              style={{ height: 300, width: '100%' }}
              logoEnabled={false}
              attributionEnabled={false}>
              <MapboxGL.Camera
                zoomLevel={12}
                centerCoordinate={[
                  request.longitudeOfDeliveryFrom,
                  request.latitudeOfDeliveryFrom,
                ]}
              />
              {renderAnnotations({
                coordinates: {
                  latitude: request.latitudeOfDeliveryFrom,
                  longitude: request.longitudeOfDeliveryFrom,
                },
                isDestination: true,
              })}
              {user.role === 'driver' ? (
                <>
                  {renderPath({
                    source: location,
                    destination: {
                      latitude: request.latitudeOfDeliveryFrom,
                      longitude: request.longitudeOfDeliveryFrom,
                    },
                  })}
                  {renderAnnotations({
                    coordinates: location,
                    isDestination: false,
                  })}
                </>
              ) : null}
            </MapboxGL.MapView>
          </Layout>
        </Layout>
      </Layout>
      <Layout
        level={'4'}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingBottom: 10,
          paddingHorizontal: 10,
        }}>
        <Button
          appearance={'outline'}
          style={{ minWidth: 150 }}
          onPress={() => {
            navigation.goBack();
          }}>
          Cancel
        </Button>
        <Button
          disabled={isVendor || loading || isDelivered}
          style={{ minWidth: 150 }}
          onPress={() => {
            if (!isVendor) {

              setLoading(true);
              if (request.acceptedAt) {
                itemReached({ itemId: request.itemId, vendorId: request.vendorId }).then(() => {
                  Alert.alert('Success', 'The item has been delivered successfully!');
                  navigation.goBack();
                }).catch(() => {
                  Alert.alert('Error', 'There was a problem completing the delivery!');
                 }).finally(() => { 
                   setLoading(false);
                 });
              } else {
                acceptDeliveryRequest({
                  vendorId: request.vendorId,
                  itemId: request.itemId,
                })
                  .then(response => {
                    console.log(response);
                    Alert.alert(
                      'Success',
                      'You requested for delivering the item! Please wait for vendor confirmation',
                    );
                  })
                  .catch(async (err: Exception) => {
                    try {
                      const { message } = await err.response.json();
                      if (message) {
                        Alert.alert(message);
                      }
                    } catch (e) { }
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }
            }
          }}
          accessoryLeft={() => {
            return <>{loading ? <Spinner size={'small'} /> : null}</>;
          }}>
          {loading
            ? 'Loading'
            : isVendor
              ? request.driverAccepted
                ? 'Accepted By Driver'
                : 'Pending'
              : (
                request.acceptedAt ? 'Delivery Completed' : 'Accept Request'
              )}
        </Button>
      </Layout>
    </Layout>
  );
};

export default ItemDetails;
