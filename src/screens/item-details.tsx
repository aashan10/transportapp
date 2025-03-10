import React, {useContext, useEffect, useState} from 'react';
import {Icon, Layout, Modal, Text} from '@ui-kitten/components';
import Header from '../components/header';
import {Alert, ScrollView, View} from 'react-native';
import Button from '../components/button';
import UserContext from '../contexts/user-context';
import MapboxGL from '@rnmapbox/maps';
import {MAPBOX_API_KEY} from '../api/constants';
import LocalizationContext from '../contexts/localization-context';
import {ThemeContext} from '../contexts/theme-context';
import {
  acceptDeliveryRequest,
  cancelDelivery,
  deleteRequest,
  itemReached,
} from '../api/requests';
import TimelineItem from '../components/timeline-item';
import RefreshControl from '../components/refresh-control';
import ConfirmModal from '../components/confirm-modal';
import messageing from '@react-native-firebase/messaging';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

interface ItemDetailsProps {
  navigation: any;
  item: any;
  route: any;
}

export interface RequestInterface {
  driverAcceptedAt: string | false;
  itemId: string;
  itemName: string;
  deliveryPriceByVendor: string;
  deliveryPriceByAdmin: string;
  deliveryFrom: string;
  deliveryTo: string;
  quantity: string;
  vendorId: string;
  latitudeOfDeliveryFrom: number;
  longitudeOfDeliveryFrom: number;
  latitudeOfDeliveryTo: number;
  longitudeOfDeliveryTo: number;
  acceptedAt: string | false;
  itemReachedAt: string | false;
  vendorPhoneNumber?: string;
  itemDescription: string;
  cancelledByVendor: string;
  adminApproved: boolean;
  createdAt?: string | false;
}

const ArrowIcon = (props: any) => {
  return <Icon name={'arrow-forward-outline'} {...props} />;
};

const ItemDetails = ({navigation, route}: ItemDetailsProps) => {
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  const {theme} = useContext(ThemeContext);
  const [item] = useState<RequestInterface>(route.params.item);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState('warning');
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<
    'pending' | 'accepted' | 'picked' | 'completed'
  >('pending');
  const [actions, setActions] = useState<
    Array<'cancel' | 'delete' | 'pick' | 'complete'>
  >([]);

  const [showTooltip, setShowTooltip] = useState<boolean>(true);
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    const {itemReachedAt, acceptedAt, driverAcceptedAt} = item;

    if (!itemReachedAt && !acceptedAt && !driverAcceptedAt) {
      setState('pending');
    } else if (itemReachedAt) {
      setState('completed');
    } else if (driverAcceptedAt) {
      setState('picked');
    } else if (acceptedAt) {
      setState('accepted');
    }
  }, [user, item]);

  useEffect(() => {
    if (user.role === 'driver') {
      switch (state) {
        case 'completed':
          setActions([]);
          break;
        case 'picked':
          setActions(['cancel', 'complete']);
          break;
        case 'accepted':
        case 'pending':
          setActions(['pick']);
          break;
        default:
          setActions([]);
      }
    } else if (user.role === 'vendor') {
      let vendorActions: Array<'cancel' | 'delete' | 'pick'> = [];
      switch (state) {
        case 'pending':
          vendorActions = ['cancel', 'delete'];
          break;
        case 'completed':
        case 'picked':
        case 'accepted':
        default:
          vendorActions = [];
      }

      setActions(vendorActions);
    }

    if (state === 'pending' || state === 'accepted') {
      setColorScheme('warning');
    }

    if (state === 'completed') {
      setColorScheme('primary');
    }

    if (state === 'picked') {
      setColorScheme('success');
    }
  }, [state, user.role]);

  useEffect(() => {
    messageing()
      .getToken()
      .then(token => {
        setDeviceId(token);
      })
      .catch(err => {});
  }, []);
  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout style={{width: '100%', borderRadius: 20}}>
        <Header
          back={true}
          navigation={navigation}
          title={item.itemName}
          accessoryRight={() => {
            const MoreIcon = (props: any) => (
              <Icon name={'more-vertical-outline'} {...props} />
            );
            return (
              <Button
                appearance={'ghost'}
                onPress={() => {
                  setMenuVisible(true);
                }}
                size={'small'}
                accessoryLeft={MoreIcon}
              />
            );
          }}
        />

        <View style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 15,
                paddingHorizontal: 20,
              }}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.deliveryFrom}
                </Text>
              </View>
              <View>
                <Button appearance={'ghost'} accessoryLeft={ArrowIcon} />
              </View>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {item.deliveryTo}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{marginBottom: 10}}>
              <Text
                style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                Rs.{' '}
                {user.role === 'vendor'
                  ? item.deliveryPriceByVendor
                  : item.deliveryPriceByAdmin}
              </Text>
            </View>
            <Button
              appearance={'outline'}
              status={colorScheme}
              size={'small'}
              style={{marginBottom: 10, maxWidth: 150}}>
              {`DELIVERY ${state.toUpperCase()}`}
            </Button>
          </View>
        </View>
      </Layout>
      <Layout
        style={{
          flex: 1,
          height: '100%',
          paddingHorizontal: 20,
          overflow: 'hidden',
        }}
        level={'4'}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
              }}
            />
          }>
          <Button
            appearance={'ghost'}
            onPress={() => {
              navigation.navigate('map', {item: route.params.item});
            }}
            style={{marginBottom: 10, marginTop: 20}}>
            {currentLanguage.viewAddressMap.toUpperCase()}
          </Button>
          <View style={{marginBottom: 30}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
              {currentLanguage.Description}
            </Text>

            <Text>{item.itemDescription}</Text>
          </View>

          <View style={{marginBottom: 30}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
              {currentLanguage.quantity}
            </Text>

            <Text>{`${item.quantity} units`}</Text>
          </View>

          <View style={{marginBottom: 50}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
              {currentLanguage.timeline}
            </Text>
            <View>
              {item.createdAt && (
                <TimelineItem
                  date={item.createdAt}
                  label={currentLanguage.orderplaced}
                />
              )}

              {item.acceptedAt && (
                <TimelineItem
                  date={item.acceptedAt}
                  hasPreviousItem={true}
                  label={currentLanguage.adminapprove}
                />
              )}

              {item.driverAcceptedAt && (
                <TimelineItem
                  hasPreviousItem={true}
                  date={item.driverAcceptedAt}
                  label={currentLanguage.acceptbydriver}
                />
              )}

              {item.itemReachedAt && (
                <TimelineItem
                  hasPreviousItem={true}
                  date={item.itemReachedAt}
                  label={currentLanguage.delivered}
                />
              )}
            </View>
            <View style={{marginVertical: 20}}>
              {actions.indexOf('pick') > -1 && (
                <ConfirmModal
                  modalText={'Are you sure you want to pick this request?'}
                  buttonText={currentLanguage.pickuprequest}
                  buttonProps={{
                    appearance: 'outline',
                    status: 'primary',
                  }}
                  onSuccess={(closeModal: CallableFunction) => {
                    acceptDeliveryRequest({
                      itemId: item.itemId,
                      vendorId: item.vendorId,
                    })
                      .then(() => {
                        Alert.alert('Item Picked!');
                        closeModal(true);
                        navigation.goBack();
                      })
                      .catch(e => {
                        closeModal(true);
                        Alert.alert(currentLanguage.mess12);
                      });
                  }}
                />
              )}

              {actions.indexOf('complete') > -1 && (
                <ConfirmModal
                  modalText={'Are you sure you want to complete this request?'}
                  buttonText={currentLanguage.completereq}
                  buttonProps={{
                    appearance: 'outline',
                    status: 'primary',
                  }}
                  onSuccess={(closeModal: CallableFunction) => {
                    itemReached({
                      itemId: item.itemId,
                      vendorId: item.vendorId,
                    })
                      .then(() => {
                        closeModal(true);
                        Alert.alert('Item Delivered!');
                        navigation.goBack();
                      })
                      .catch(e => {
                        Alert.alert(
                          'There was some issue while trying to deliver the request!',
                        );
                      });
                  }}
                />
              )}

              {actions.indexOf('cancel') > -1 && (
                <ConfirmModal
                  modalText={'Are you sure you want to complete this request?'}
                  buttonText={currentLanguage.cancelReq}
                  buttonProps={{
                    appearance: 'ghost',
                    status: 'danger',
                  }}
                  onSuccess={(closeModal: CallableFunction) => {
                    if (user.role === 'vendor') {
                      deleteRequest({
                        itemId: item.itemId,
                        vendorId: item.vendorId,
                      })
                        .then(response => {
                          console.log(response);

                          Alert.alert('Item canceled successfully!');
                          navigation.goBack();
                        })
                        .catch(e => {
                          Alert.alert('Something went wrong!');
                        })
                        .finally(() => {
                          closeModal(true);
                        });
                    } else if (user.role === 'driver') {
                      cancelDelivery({
                        vendorId: item.vendorId,
                        itemId: item.itemId,
                      })
                        .then(() => {
                          Alert.alert('Delivery canceled!');
                          navigation.goBack();
                        })
                        .catch(e => {
                          Alert.alert(currentLanguage.mess11);
                        })
                        .finally(() => {
                          closeModal(true);
                        });
                    }
                  }}
                />
              )}
              {actions.indexOf('delete') > -1 && (
                <Button
                  appearance={'ghost'}
                  status={'danger'}
                  style={{marginVertical: 2.5}}
                  onPress={() => {}}>
                  {currentLanguage.deleteReq}
                </Button>
              )}
              {actions.length === 0 && (
                <Text style={{textAlign: 'center', marginVertical: 30}}>
                  {currentLanguage.mess10}
                </Text>
              )}
            </View>
          </View>
        </ScrollView>
        {showTooltip ? (
          <Layout
            style={{
              backgroundColor: 'rgba(100,100,100,0.5)',
              padding: 5,
              paddingLeft: 20,
              borderRadius: 10,
              flexDirection: 'row',
              position: 'absolute',
              bottom: 5,
              width: '100%',
              left: 20,
            }}>
            <Text style={{paddingVertical: 10, fontSize: 12, flex: 1}}>
              {currentLanguage.okmessage}
            </Text>
            <Button
              onPress={() => {
                setShowTooltip(!showTooltip);
              }}
              appearance={'ghost'}
              style={{width: 60}}>
              {currentLanguage.ok}
            </Button>
          </Layout>
        ) : null}
        <Modal
          style={{
            width: '100%',
            padding: 10,
          }}
          visible={isMenuVisible}
          onBackdropPress={() => {
            setMenuVisible(false);
          }}
          backdropStyle={{backgroundColor: theme.backdropColor}}>
          <Layout style={{borderRadius: 10}}>
            <View
              style={{
                borderColor: theme[theme['background-basic-color-4'].slice(1)],
                borderTopWidth: 1,
                margin: 0,
                padding: 0,
              }}>
              <Button
                style={{borderRadius: 0}}
                onPress={() => {
                  setMenuVisible(false);
                }}
                appearance={'ghost'}>
                {currentLanguage.close}
              </Button>
            </View>
          </Layout>
        </Modal>
      </Layout>
    </Layout>
  );
};

export default ItemDetails;
