import React, {useContext} from 'react';
import {Alert, View} from 'react-native';
import {Card, Icon, Text} from '@ui-kitten/components';
import Button from './button';
import LocalizationContext from '../contexts/localization-context';

interface DeliveryRequestProps {
  navigation: any;
  request: {
    deliveryFrom: string;
    deliveryTo: string;
    deliveryPriceByVendor: number ;
    deliveryPriceByAdmin: number ;
    adminApproved: boolean;
    quantity: number;
    vendorId: string;
  };
}

const DeliveryRequest = ({navigation, request}: DeliveryRequestProps) => {
  const {currentLanguage} = useContext(LocalizationContext);
  const price =
    request.deliveryPriceByAdmin ?? request.deliveryPriceByAdmin ?? '';
  return (
    <Card
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
        <Text>Rs. {price}</Text>
        <Text>{request.quantity} items to be delivered</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          flexDirection: 'row',
        }}>
        <Button
          onPress={() => {
            navigation.navigate('viewRequest', {item: request});
          }}
          size={'small'}>
          Details
        </Button>
      </View>
    </Card>
  );
};

export default DeliveryRequest;
