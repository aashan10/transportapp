import React, {useContext, useEffect, useState} from 'react';
import {Card, Icon, Layout, Modal, Text} from '@ui-kitten/components';
import Header from '../components/header';
import {Pressable, ScrollView, View} from 'react-native';
import Button from '../components/button';
import UserContext from '../contexts/user-context';
import MapboxGL from '@react-native-mapbox-gl/maps';
import {MAPBOX_API_KEY} from '../api/constants';
import LocalizationContext from '../contexts/localization-context';
import {ThemeContext} from '../contexts/theme-context';
import moment from 'moment';

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

const DateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const ItemDetails = ({navigation, route}: ItemDetailsProps) => {
  const {user} = useContext(UserContext);
  const {currentLanguage} = useContext(LocalizationContext);
  const [item] = useState<RequestInterface>(route.params.item);
  const [isMenuVisible, setMenuVisible] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState('warning');
  const [state, setState] =
    useState<'pending' | 'accepted' | 'picked' | 'completed'>('pending');
  const [actions, setActions] = useState<Array<'cancel' | 'delete' | 'pick'>>(
    [],
  );

  const [showTooltip, setShowTooltip] = useState<boolean>(true);

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

    console.log(item);
  }, [user, item]);

  useEffect(() => {
    if (user.role === 'driver') {
      switch (state) {
        case 'completed':
        case 'accepted':
          setActions([]);
          break;
        default:
          setActions(['cancel']);
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

  return (
    <Layout level={'4'} style={{height: '100%'}}>
      <Layout style={{width: '100%'}}>
        <Header
          back={true}
          navigation={navigation}
          title={currentLanguage.requestDetail}
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
        <ScrollView style={{padding: 10}}>
          <View style={{borderWidth: 0, paddingHorizontal: 0}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 3,
                marginVertical: 15,
              }}>
              <View style={{flex: 3}}>
                <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                  {item.deliveryFrom}
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Button appearance={'ghost'} accessoryLeft={ArrowIcon} />
              </View>
              <View style={{flex: 3}}>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    textAlign: 'right',
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

          <View style={{marginBottom: 30}}>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
              Description
            </Text>

            <Text>{item.itemDescription}</Text>
          </View>

          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 5}}>
              Timeline
            </Text>

            {item.createdAt ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                }}>
                <Text>Order Placed</Text>
                <Icon
                  name={'arrow-forward-outline'}
                  style={{
                    height: 15,
                    width: 15,
                    fill: 'green',
                    paddingHorizontal: 20,
                  }}
                  fill={'green'}
                />

                <Text>{moment(Date.parse(item.createdAt)).calendar()}</Text>
              </View>
            ) : null}

            {item.acceptedAt ? (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontWeight: 'bold'}}>Accepted By Admin</Text>
                  <Icon
                    name={'arrow-forward-outline'}
                    style={{height: 15, width: 15, fill: 'green'}}
                    fill={'green'}
                  />
                  <Text>{moment(Date.parse(item.acceptedAt)).calendar()}</Text>
                </View>
              </View>
            ) : null}

            {item.driverAcceptedAt ? (
              <View>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <Text>Accepted By Driver</Text>
                  <Icon
                    name={'arrow-forward-outline'}
                    style={{
                      height: 20,
                      width: 20,
                      fill: 'green',
                      paddingHorizontal: 20,
                    }}
                    fill={'green'}
                  />

                  <Text>
                    {moment(Date.parse(item.driverAcceptedAt)).calendar()}
                  </Text>
                </View>
              </View>
            ) : null}

            {item.itemReachedAt ? (
              <View>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}
                />
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
                  <Text>Delivered</Text>
                  <Icon
                    name={'arrow-forward-outline'}
                    style={{
                      height: 20,
                      width: 20,
                      fill: 'green',
                      paddingHorizontal: 20,
                    }}
                    fill={'green'}
                  />
                  <Text>
                    {moment(Date.parse(item.itemReachedAt)).calendar()}
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
        {showTooltip ? (
          <Layout
            style={{
              backgroundColor: 'rgba(100,100,100,0.5)',
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 10,
              margin: 10,
              flexDirection: 'row',
            }}>
            <Text style={{paddingVertical: 10, fontSize: 12, flex: 1}}>
              Press more icon on top right of the screen to access the menu!
            </Text>
            <Button
              onPress={() => {
                setShowTooltip(!showTooltip);
              }}
              appearance={'ghost'}
              style={{width: 60}}>
              OK
            </Button>
          </Layout>
        ) : null}
        <Button
          appearance={'outline'}
          onPress={() => {
            navigation.navigate('viewMap', {item: route.params.item});
          }}
          style={{margin: 10, marginTop: 0}}>
          View Pickup Address on Map
        </Button>
        <ThemeContext.Consumer>
          {theme => {
            return (
              <Modal
                style={{
                  width: '100%',
                  padding: 10,
                  borderRadius: 30,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                }}
                visible={isMenuVisible}
                onBackdropPress={() => {
                  setMenuVisible(false);
                }}
                backdropStyle={{backgroundColor: theme.theme.backdropColor}}>
                <Card style={{borderRadius: 10}}>
                  {actions.indexOf('pick') > -1 ? (
                    <Button
                      appearance={'outline'}
                      status={'primary'}
                      style={{marginVertical: 2.5}}>
                      Pickup Request
                    </Button>
                  ) : null}

                  {actions.indexOf('cancel') > -1 ? (
                    <Button
                      appearance={'ghost'}
                      status={'danger'}
                      style={{marginVertical: 2.5}}>
                      Cancel Request
                    </Button>
                  ) : null}
                  {actions.indexOf('delete') > -1 ? (
                    <Button
                      appearance={'ghost'}
                      status={'danger'}
                      style={{marginVertical: 2.5}}>
                      Delete Request
                    </Button>
                  ) : null}
                  <Button
                    onPress={() => {
                      setMenuVisible(false);
                    }}
                    appearance={'ghost'}
                    style={{marginVertical: 2.5}}>
                    Close
                  </Button>
                </Card>
              </Modal>
            );
          }}
        </ThemeContext.Consumer>
      </Layout>
    </Layout>
  );
};

export default ItemDetails;
