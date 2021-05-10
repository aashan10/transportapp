import React, {useState} from 'react';
import {Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../components/header';
import {ScrollView, ToastAndroid, View} from 'react-native';
import Button from '../components/button';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {requestLocationPermission} from '../helpers/functions';
import {createNewItemRequest} from '../api/requests';

const CreateItem = ({navigation}: any) => {
  const [name, setName] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header
          back={true}
          navigation={navigation}
          title={'Create New Request'}
        />
      </Layout>
      <Layout style={{flex: 1, margin: 5, borderRadius: 10}} level={'1'}>
        <ScrollView style={{flex: 1, padding: 10, paddingVertical: 20}}>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Item Name
            </Text>
            <Input
              value={name}
              onChangeText={text => {
                setName(text);
              }}
              placeholder={'Name of item to be picked'}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              Pickup From
            </Text>
            <Input
              value={from}
              onChangeText={text => {
                setFrom(text);
              }}
              placeholder={'Pickup Address'}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Drop To</Text>
            <Input
              value={to}
              onChangeText={text => {
                setTo(text);
              }}
              placeholder={'Delivery Address'}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Quantity</Text>
            <Input
              value={isNaN(qty) ? undefined : qty.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setQty(parseFloat(text));
              }}
              placeholder={'Quantity of items to be dropped'}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>Price</Text>
            <Input
              value={isNaN(price) ? undefined : price.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setPrice(parseFloat(text));
              }}
              placeholder={'Estimated price for delivery'}
            />
          </View>
        </ScrollView>
      </Layout>
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
          Cancel
        </Button>
        <Button
          onPress={async () => {
            try {
              setLoading(true);
              await requestLocationPermission();
              Geolocation.getCurrentPosition(
                async (position: GeolocationResponse) => {
                  const {latitude, longitude} = position.coords;
                  try {
                    setLoading(true);
                    let response = await createNewItemRequest({
                      name: name,
                      latitude: latitude,
                      longitude: longitude,
                      from: from,
                      to: to,
                      quantity: qty,
                      price: price,
                    });
                    setName('');
                    setTo('');
                    setFrom('');
                    setQty(0);
                    setPrice(0);
                    ToastAndroid.show(response.message, 5000);
                    navigation.goBack();
                  } catch (e) {
                    console.error(e);
                  } finally {
                    setLoading(false);
                  }
                },
                (error: GeolocationError) => {
                  ToastAndroid.show(error.message, 5000);
                },
              );
            } catch (err) {
              ToastAndroid.show(err.message, 5000);
            } finally {
              setLoading(false);
            }
          }}
          accessoryLeft={() => {
            return loading ? <Spinner size={'small'} /> : <View />;
          }}
          disabled={loading}
          style={{minWidth: 150}}>
          Create New Request
        </Button>
      </Layout>
    </Layout>
  );
};

export default CreateItem;
