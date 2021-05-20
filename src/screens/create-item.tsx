import React, { useState } from 'react';
import {
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import Header from '../components/header';
import { ScrollView, ToastAndroid, View } from 'react-native';
import Button from '../components/button';
import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import { requestLocationPermission } from '../helpers/functions';
import { createNewItemRequest } from '../api/requests';
import LocalizationContext from '../contexts/localization-context';
import { useContext } from 'react';

interface ErrorState {
  name: string | null;
  to: string | null;
  from: string | null;
  qty: string | null;
  price: string | null;
  type: string | null;
  size: string | null;
}
const validate = ({ name, to, from, qty, price, type, size }: ErrorState) => {
  let response: ErrorState = {
    name: null,
    to: null,
    from: null,
    qty: null,
    price: null,
    type: null,
    size: null,
  };

  if (!name || name?.length <= 0) {
    response.name = "The name can't be empty!";
  }
  if (!to || to?.length <= 0) {
    response.to = 'Enter the Item Drop destination!';
  }
  if (!from || from?.length < 0) {
    response.from = 'Enter the Item pick destination!';
  }
  if (!qty || qty === 'NaN') {
    response.qty = 'The Quantity must be in tons!';
  }
  if (!price || price === 'NaN') {
    response.price = 'The Price must be greater than zero!';
  }
  if (!type || type === 'NaN') {
    response.type = 'The type must be define!';
  }
  if (!size) {
    response.size = 'The Size must be define!';
  }

  return response;
};

const CreateItem = ({ navigation }: any) => {
  const { currentLanguage } = useContext(LocalizationContext);

  const [name, setName] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<IndexPath | Array<IndexPath>>(
    new IndexPath(0),
  );

  const [size, setSize] = useState<IndexPath | Array<IndexPath>>(
    new IndexPath(0),
  );
  const [loading, setLoading] = useState<boolean>(false);

  const sizes = ['4', '6', '10', '12', '16', '18', '20', '22'];
  const types = [
    currentLanguage.truck,
    currentLanguage.container,
    currentLanguage.otruck,
    currentLanguage.tripper,
    currentLanguage.pickup,
  ];

  const [error, setError] = useState<ErrorState>({
    name: null,
    to: null,
    from: null,
    qty: null,
    price: null,
    type: null,
    size: null,
  });
  return (
    <Layout style={{ height: '100%' }} level={'4'}>
      <Layout>
        <Header
          back={true}
          navigation={navigation}
          title={currentLanguage.createItems}
        />
      </Layout>
      <Layout style={{ flex: 1, margin: 5, borderRadius: 10 }} level={'1'}>
        <ScrollView style={{ flex: 1, padding: 10, paddingVertical: 20 }}>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.itemName}
            </Text>
            <Input
              onChangeText={text => {
                setName(text);
                setError({ ...error, name: null });
              }}
              status={error.name ? 'danger' : ''}
              placeholder={'Name of item to be picked'}
            />
            {error?.name ? <Text status={'danger'}>{error.name}</Text> : null}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.pickUp}
            </Text>
            <Input
              value={from}
              onChangeText={text => {
                setFrom(text);
                setError({ ...error, from: null });
              }}
              status={error.from ? 'danger' : ''}
              placeholder={'Pickup Address'}
            />
            {error?.from ? <Text status={'danger'}>{error.from}</Text> : null}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.Drop}
            </Text>
            <Input
              value={to}
              onChangeText={text => {
                setTo(text);
                setError({ ...error, to: null });
              }}
              status={error.to ? 'danger' : ''}
              placeholder={'Delivery Address'}
            />
            {error?.to ? <Text status={'danger'}>{error.to}</Text> : null}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.containerType}
            </Text>
            <Select
              selectedIndex={type}
              value={
                type instanceof Array
                  ? types[type[0].row] ?? ''
                  : types[type.row]
              }
              onSelect={itemValue => {
                setType(itemValue);
              }}>
              {types.map(vehicleCount => {
                return <SelectItem title={vehicleCount} />;
              })}
            </Select>
            {error?.type ? <Text status={'danger'}>{error.type}</Text> : null}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.containerSize}
            </Text>
            <Select
              selectedIndex={size}
              value={
                size instanceof Array
                  ? sizes[size[0].row] ?? ''
                  : sizes[size.row]
              }
              onSelect={itemValue => {
                setSize(itemValue);
              }}>
              {sizes.map(wheelCount => {
                return <SelectItem title={wheelCount} />;
              })}
            </Select>
            {error?.size ? <Text status={'danger'}>{error.size}</Text> : null}
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.quantity}
            </Text>
            <Input
              value={isNaN(qty) ? undefined : qty.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setQty(parseFloat(text));
                setError({ ...error, qty: null });
              }}
              status={error.qty ? 'danger' : ''}
              placeholder={'Quantity of items to be dropped'}
            />
            {error?.qty ? <Text status={'danger'}>{error.qty}</Text> : null}
          </View>
          <View style={{ marginBottom: 50 }}>
            <Text style={{ paddingBottom: 5, fontWeight: 'bold' }}>
              {currentLanguage.price}
            </Text>
            <Input
              value={isNaN(price) ? undefined : price.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setPrice(parseFloat(text));
                setError({ ...error, price: null });
              }}
              status={error.price ? 'danger' : ''}
              placeholder={'Estimated price for delivery'}
            />
            {error?.price ? <Text status={'danger'}>{error.price}</Text> : null}
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
          style={{ minWidth: 150 }}
          appearance={'outline'}
          onPress={() => {
            navigation.goBack();
          }}>
          {currentLanguage.cancel}
        </Button>
        <Button
          onPress={async () => {
            try {
              const validation = validate({
                name: name,
                to: to,
                from: from,
                price: price.toString(),
                qty: qty.toString(),
                type: types[type instanceof IndexPath ? type.row : 0],
                size: sizes[size instanceof IndexPath ? size.row : 0],
              });
              if (
                validation.from !== null ||
                validation.to !== null ||
                validation.name !== null ||
                validation.qty !== null ||
                validation.price !== null ||
                validation.type !== null ||
                validation.size !== null
              ) {
                setError(validation);
              } else {
                setLoading(true);
                await requestLocationPermission();
                Geolocation.getCurrentPosition(
                  async (position: GeolocationResponse) => {
                    const { latitude, longitude } = position.coords;
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
                        // @ts-ignore
                        type: types[type.row],
                        // @ts-ignore
                        size: sizes[size.row],
                      });
                      setName('');
                      setTo('');
                      setFrom('');
                      setQty(0);
                      setPrice(0);
                      setType(new IndexPath(0));
                      setSize(new IndexPath(0));
                      ToastAndroid.show(response.message, 5000);
                      navigation.goBack();
                    } catch (e) {
                      console.error(e);
                    } finally {
                      setLoading(false);
                    }
                  },
                  (e: GeolocationError) => {
                    ToastAndroid.show(e.message, 5000);
                  },
                );
              }
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
          style={{ minWidth: 150 }}>
          {currentLanguage.createItems}
        </Button>
      </Layout>
    </Layout>

  );
};

export default CreateItem;
