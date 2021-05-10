import React, {useEffect, useState} from 'react';
import {Layout, Text} from '@ui-kitten/components';
import Header from '../components/header';
import {ScrollView} from 'react-native';
import Button from '../components/button';

interface ItemDetailsProps {
  navigation: any;
  item: any;
  route: any;
}

const ItemDetails = ({navigation, route}: ItemDetailsProps) => {
  const [request, setRequest] = useState(null);
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
            <Text>Delivery From: {request?.deliveryFrom}</Text>
            <Text>Delivery To: {request?.deliveryTo}</Text>
            <Text>Price: Rs.{request?.deliveryPrice}</Text>
            <Text>Item: {request?.itemName}</Text>
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
        <Button style={{minWidth: 150}} onPress={() => {}}>
          Accept Request
        </Button>
      </Layout>
    </Layout>
  );
};

export default ItemDetails;
