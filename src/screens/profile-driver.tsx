import {
    Icon,
    Layout,
    List,
    ListItem,
    Spinner,
    Text,
} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {Image, ScrollView} from 'react-native';
import LocalizationContext from '../contexts/localization-context';
import Header from '../components/header';
import UserContext from '../contexts/user-context';

const md5 = require('md5');
import {capitalize, startCase, toLower} from 'lodash';

interface profileDetailPros {
    navigation: any;
    item: any;
    route: any;
}

const ProfileScreen = ({navigation}: profileDetailPros) => {
    const {user} = useContext(UserContext);
    const {currentLanguage} = useContext(LocalizationContext);
    const ProfileImage = () => {
        return (
            <Layout
                level={'4'}
                style={{
                    height: 100,
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={{uri: 'https://gravatar.com/avatar/' + md5(user.email)}}
                    style={{
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                        zIndex: 1000,
                        backgroundColor: 'black',
                    }}
                />
            </Layout>
        );
    };

    const MoreIcon = (props: any) => {
        return <Icon {...props} name={'more-vertical-outline'}/>;
    };

    return (
        <Layout style={{height: '100%'}}>
            <Layout style={{width: '100%'}}>
                <Header
                    navigation={navigation}
                    title={currentLanguage.profile}/>
            </Layout>
            <Layout
                level={'4'}
                style={{
                    flex: 1,
                    height: '100%',
                    padding: 5,
                }}>
                <ScrollView style={{height: '100%', backgroundColor: 'transparent'}}>
                    <Layout
                        level={'4'}
                        style={{
                            width: '100%',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            height: '100%'
                        }}>
                        <ProfileImage/>
                        <Text
                            style={{
                                fontSize: 17,
                                textAlign: 'center',
                                fontWeight: 'bold',
                                marginTop: 30,
                            }}>
                            {startCase(toLower(user.name))}
                        </Text>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>
                            {capitalize(user.role)}
                        </Text>
                        <Text style={{fontSize: 15, textAlign: 'center'}}>
                            {startCase(toLower(user.address))}
                        </Text>
                        <Layout
                            level={'4'}
                            style={{marginTop: 10, borderRadius: 10, overflow: 'hidden'}}>
                            <ListItem disabled={true} style={{justifyContent: 'flex-start'}}>
                                <Text style={{flex: 1}}>Email</Text>
                                <Text style={{flex: 1}}>{user.email}</Text>
                            </ListItem>
                            <ListItem disabled={true} style={{justifyContent: 'flex-start'}}>
                                <Text style={{flex: 1}}>Phone</Text>
                                <Text style={{flex: 1}}>{user.phoneNumber}</Text>
                            </ListItem>

                            {user.role === 'driver' ? (
                                <>
                                    <ListItem
                                        disabled={true}
                                        style={{justifyContent: 'flex-start'}}>
                                        <Text style={{flex: 1}}>License</Text>
                                        <Image
                                            source={{uri: user.licenseAndBillBook[0]}}
                                            style={{height: 150, flex: 1}}
                                        />
                                    </ListItem>

                                    <ListItem
                                        disabled={true}
                                        style={{justifyContent: 'flex-start'}}>
                                        <Text style={{flex: 1}}>BillBook</Text>
                                        <Image
                                            source={{uri: user.licenseAndBillBook[1]}}
                                            style={{height: 150, flex: 1}}
                                        />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem
                                        disabled={true}
                                        style={{justifyContent: 'flex-start'}}>
                                        <Text style={{flex: 1}}>Company Name</Text>
                                        <Text style={{flex: 1}}>{user.companyName}</Text>
                                    </ListItem>
                                </>
                            )}
                        </Layout>
                    </Layout>
                </ScrollView>
            </Layout>
        </Layout>
    );
};
export default ProfileScreen;
