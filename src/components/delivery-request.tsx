import React, {useContext, useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Card, Icon, Text} from '@ui-kitten/components';
import Button from './button';
import LocalizationContext from '../contexts/localization-context';

interface DeliveryRequestProps {
  navigation: any;
  request: {
    deliveryFrom: string;
    deliveryTo: string;
    deliveryPriceByVendor: number;
    deliveryPriceByAdmin: number;
    adminApproved: boolean;
    quantity: number;
    vendorId: string;
    itemReachedAt?: string | boolean;
    itemDescription: string;
  };
}

const DeliveryRequest = ({navigation, request}: DeliveryRequestProps) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const [price, setPrice] = useState<string | number | null>('');
  const [delivered, setDelivered] = useState(false);
  useEffect(() => {
    setPrice(request.deliveryPriceByAdmin ?? request.deliveryPriceByVendor);
  }, [request]);

  useEffect(() => {
    switch (request.itemReachedAt) {
      case undefined:
      case null:
      case false:
        setDelivered(false);
        break;
      default:
        setDelivered(true);
    }
  }, [request.itemReachedAt]);

  return (
    <Card
      status={delivered ? 'success' : 'primary'}
      header={() => {
        return (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  flex: 1,
                  paddingTop: 5,
                  textAlign: 'center',
                }}>
                {request.deliveryFrom}
              </Text>
              <Button
                size={'small'}
                appearance={'ghost'}
                status={delivered ? 'success' : 'primary'}
                accessoryRight={iconProps => (
                  <Icon name={'arrow-forward-outline'} {...iconProps} />
                )}
                onPress={() => {
                  Alert.alert(
                    '',
                    currentLanguage.pickupLocation +
                      ' : ' +
                      request.deliveryFrom +
                      '\n' +
                      '\n' +
                      currentLanguage.deliveryLocation +
                      ' : ' +
                      request.deliveryTo +
                      '\n' +
                      '\n' +
                      currentLanguage.price +
                      ' : ' +
                      currentLanguage.currency +
                      price +
                      '\n',

                    [
                      {
                        text: currentLanguage.close,
                        onPress: () => {},
                        style: 'cancel',
                      },
                    ],
                    {cancelable: true},
                  );
                }}
                accessoryLeft={iconProps => (
                  <Icon {...iconProps} name={'car-outline'} />
                )}
              />
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  flex: 1,
                  paddingTop: 5,
                  textAlign: 'center',
                }}>
                {' ' + request.deliveryTo}
              </Text>
              {request.adminApproved ? (
                <Button
                  size={'small'}
                  accessoryLeft={iconProps => (
                    <Icon name={'checkmark-circle-2-outline'} {...iconProps} />
                  )}
                  onPress={() => {
                    Alert.alert(
                      currentLanguage.verifiedRequest,
                      currentLanguage.verifiedRequestMessage,
                      [
                        {
                          text: currentLanguage.close,
                          onPress: () => {},
                          style: 'cancel',
                        },
                      ],
                    );
                  }}
                  status={'success'}
                  appearance={'ghost'}>
                  {currentLanguage.verifiedRequest}
                </Button>
              ) : null}
            </View>
          </View>
        );
      }}
      style={{borderRadius: 10, marginTop: 10, padding: 0}}>
      <View>
        <Text>
          {currentLanguage.currency} {price ?? ''}
        </Text>
        <Text>
          {request.quantity} {currentLanguage.itemsToDelivery}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <Button
          status={delivered ? 'success' : 'primary'}
          onPress={() => {
            navigation.navigate('viewRequest', {item: request});
          }}
          size={'small'}>
          {currentLanguage.detail}
        </Button>
      </View>
    </Card>
  );
};

export default DeliveryRequest;
