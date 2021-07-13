import { Layout, ListItem, Spinner, Text } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { request } from 'react-native-permissions';
import { Header } from 'react-native/Libraries/NewAppScreen';
import LocalizationContext from '../contexts/localization-context';
interface profileDetailPros {
    navigation: any;
    item: any;
    route: any;
}
interface RequestInterface {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
    profileImg: string;
    licenseAndBillBook: string;
    drivervehicleType: string;


}
const profile = ({ navigation }: profileDetailPros) => {
    const { currentLanguage } = useContext(LocalizationContext);

    const [request, setRequest] = useState<RequestInterface>({
        name: '',
        email: '',
        drivervehicleType: '',
        phoneNumber: '',
        address: '',
        profileImg:'',
        licenseAndBillBook:'',

    });
    return (
        <Layout level={'4'} style={{ height: '100%' }}>
            <Layout style={{ width: '100%' }}>
                <Header
                    back={true}
                    navigation={navigation}
                    title={currentLanguage.profile}
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
                <ScrollView>
                    <ListItem
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
                            {currentLanguage.name}
                        </Text>
                        <Text style={{ flex: 2 }}>{request.name}</Text>
                    </ListItem>
                    <ListItem
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
                            {currentLanguage.email}
                        </Text>
                        <Text style={{ flex: 2 }}>{request.email}</Text>
                    </ListItem>
                    <ListItem
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
                            {currentLanguage.phone}
                        </Text>
                        <Text style={{ flex: 2 }}>{request.phoneNumber}</Text>
                    </ListItem>
                    <ListItem
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', flex: 1 }} status={'primary'}>
                            {currentLanguage.containerType}
                        </Text>
                        <Text style={{ flex: 2 }}>{request.drivervehicleType}</Text>
                    </ListItem>
                </ScrollView>
                <Layout
                    style={{
                        height: 370,
                        width: '100%',
                        borderRadius: 10,
                        bottom: 0,
                        overflow: 'hidden',
                    }}
                />
            </Layout>
        </Layout>
    );
};
export default profile;
