import React, {useState} from 'react';
import {Input, Layout, Spinner, Text} from '@ui-kitten/components';
import Header from '../../components/header';
import {ScrollView, ToastAndroid, View} from 'react-native';
import Button from '../../components/button';
import {createNewItemRequest} from '../../api/requests';
import LocalizationContext from '../../contexts/localization-context';
import {useContext} from 'react';
import {Coordinates} from '@mapbox/mapbox-sdk';

interface ErrorState {
  name: string | null;
  to:
    | string
    | {latitudeOfDeliveryTo: string; longitudeOfDeliveryTo: string}
    | null;
  from:
    | string
    | {latitudeOfDeliveryFrom: string; longitudeOfDeliveryFrom: string}
    | null;
  qty: string | null;
  price: string | null;
  description: string | null;
}
const validate = ({name, to, from, qty, price, description}: ErrorState) => {
  let response: ErrorState = {
    name: null,
    to: null,
    from: null,
    qty: null,
    price: null,
    description: null,
  };

  if (!name || name?.length <= 0) {
    response.name = "The name can't be empty!";
  }
  // if (!to || {to?.length} <= 0) {
  //   response.to = 'Enter the Item Drop destination!';
  // }
  // if (!from || from?.length < 0) {
  //   response.from = 'Enter the Item pick destination!';
  // }
  if (!qty || qty === 'NaN') {
    response.qty = 'The Quantity must be in tons!';
  }
  if (!price || price === 'NaN') {
    response.price = 'The Price must be greater than zero!';
  }
  if (!description || description === 'NaN') {
    response.description = 'The type must be define!';
  }

  return response;
};

const CreateDeliveryRequestScreen = ({navigation, route}: any) => {
  const {pickupLocation, deliveryLocation} = route.params;
  const {currentLanguage} = useContext(LocalizationContext);

  const [name, setName] = useState<string>('');
  const [to, setTo] = useState<string>(deliveryLocation.name);
  const [from, setFrom] = useState<string>(pickupLocation.name);
  const [qty, setQty] = useState<number>(1);
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const [error, setError] = useState<ErrorState>({
    name: null,
    to: null,
    from: null,
    qty: null,
    price: null,
    description: null,
  });
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header
          back={true}
          navigation={navigation}
          title={currentLanguage.createItems}
        />
      </Layout>
      <Layout style={{flex: 1, margin: 5, borderRadius: 10}} level={'1'}>
        <ScrollView style={{flex: 1, padding: 10, paddingVertical: 20}}>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.itemName}
            </Text>
            <Input
              onChangeText={text => {
                setName(text);
                setError({...error, name: null});
              }}
              status={error.name ? 'danger' : ''}
              placeholder={'Name of item to be picked'}
            />
            {error?.name ? <Text status={'danger'}>{error.name}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.pickUp}
            </Text>
            <Input
              disabled
              value={pickupLocation.name}
              status={error.from ? 'danger' : ''}
              placeholder={'Pickup Address'}
            />

            {/* {error?.from ? <Text status={'danger'}>{error.from}</Text> : null} */}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.Drop}
            </Text>
            <Input
              disabled
              value={deliveryLocation.name}
              status={error.to ? 'danger' : ''}
              placeholder={'Delivery Address'}
            />
            {/* {error?.to ? <Text status={'danger'}>{error.to}</Text> : null} */}
          </View>

          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.quantity}
            </Text>
            <Input
              value={isNaN(qty) ? undefined : qty.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setQty(parseFloat(text));
                setError({...error, qty: null});
              }}
              status={error.qty ? 'danger' : ''}
              placeholder={'Quantity of items to be dropped'}
            />
            {error?.qty ? <Text status={'danger'}>{error.qty}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.price}
            </Text>
            <Input
              value={isNaN(price) ? undefined : price.toString()}
              keyboardType={'numeric'}
              onChangeText={text => {
                setPrice(parseFloat(text));
                setError({...error, price: null});
              }}
              status={error.price ? 'danger' : ''}
              placeholder={'Estimated price for delivery'}
            />
            {error?.price ? <Text status={'danger'}>{error.price}</Text> : null}
          </View>
          <View style={{marginBottom: 15}}>
            <Text style={{paddingBottom: 5, fontWeight: 'bold'}}>
              {currentLanguage.Description}
            </Text>
            <Input
              multiline={true}
              textAlignVertical={'top'}
              numberOfLines={6}
              value={description}
              onChangeText={text => {
                setDescription(text);
                setError({...error, description: null});
              }}
              status={error.description ? 'danger' : ''}
              placeholder={'Delivery Description'}
            />
            {error?.description ? (
              <Text status={'danger'}>{error.description}</Text>
            ) : null}
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
                description: description,
              });
              if (
                validation.from !== null ||
                validation.to !== null ||
                validation.name !== null ||
                validation.qty !== null ||
                validation.price !== null ||
                validation.description !== null
              ) {
                setError(validation);
              } else {
                setLoading(true);
                try {
                  setLoading(true);
                  const from: {coords: Coordinates; name: string} =
                    pickupLocation;
                  const to: {coords: Coordinates; name: string} =
                    deliveryLocation;
                  let response = await createNewItemRequest({
                    name: name,
                    from: from,
                    to: to,
                    quantity: qty,
                    price: price,
                    description: description,
                  });
                  setName('');
                  setTo('');
                  setFrom('');
                  setQty(0);
                  setPrice(0);
                  setDescription('');
                  ToastAndroid.show(response.message, 5000);
                  // I didn't want to do this but some things has to be done even if you don't like it
                  navigation.goBack();
                  navigation.goBack();
                  navigation.goBack();
                } catch (e) {
                } finally {
                  setLoading(false);
                }
              }
            } catch (err: any) {
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
          {currentLanguage.createItems}
        </Button>
      </Layout>
    </Layout>
  );
};

export default CreateDeliveryRequestScreen;
