import React, {useContext, useEffect, useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Header from '../components/header';
import {ScrollView} from 'react-native';
import Button from '../components/button';
import UserContext from '../contexts/user-context';
import { acceptDeliveryRequest } from '../api/requests';

interface ItemDetailsProps {
  navigation: any;
  item: any;
  route: any;
}

interface RequestInterface {
  _id: string;
  itemName: string;
  deliveryPrice: string;
  deliveryFrom: string;
  deliveryTo: string;
  containerSize: string;
  containerType: string;
  quantity: string;
  driverAccepted?: boolean;
}

const ItemDetails = ({navigation, route}: ItemDetailsProps) => {
  const {user} = useContext(UserContext);
  const [request, setRequest] = useState<RequestInterface>({
    _id: '',
    itemName: '',
    deliveryPrice: '',
    deliveryFrom:'',
    deliveryTo:'',
    containerSize:'',
    containerType:'',
    quantity:'',
  });
  const [isVendor, setIsVendor] = useState<boolean>(user.role === 'vendor');
  useEffect(() => {
    setRequest(route.params.item);
  }, [route.params]);
  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout>
        <Header back={true} navigation={navigation} title={'Request Details'} />
      </Layout>
      <Layout
        style={{flex: 1, height: '100%', margin: 5, borderRadius: 10}}
        level={'1'}>
        <ScrollView style={{padding: 10}}>
            <Text>Delivery From: {request.deliveryFrom}</Text>
            <Text>Delivery To: {request.deliveryTo}</Text>
            <Text>Price: Rs.{request.deliveryPrice}</Text>
            <Text>Item: {request.itemName}</Text>
            <Text>Quantity: {request.quantity}</Text>
            <Text>Container Type: {request.containerType}</Text>
            <Text>Container Size: {request.containerSize}</Text>
        </ScrollView>
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
          style={{minWidth: 150}}
          onPress={() => {
            navigation.goBack();
          }}>
          Cancel
        </Button>
        <Button disabled={isVendor} style={{minWidth: 150}} onPress={() => {
          acceptDeliveryRequest({
            itemId: request._id,
            vendorId: user.id
          })
        }}>
          {isVendor ? (request.driverAccepted ? 'Accepted By Driver' : 'Pending') : 'Accept Request'}
        </Button>
      </Layout>
    </Layout>
  );
};

export default ItemDetails;
