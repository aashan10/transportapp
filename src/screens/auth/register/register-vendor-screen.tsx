import React from 'react';
import {Layout} from '@ui-kitten/components';
import Header from '../../../components/header';

const RegisterVendorScreen = (props: any) => {
  return (
    <Layout style={{height: '100%'}} level={'1'}>
      <Header title={'Register as Vendor'} navigation={props.navigation} />
        <Layout style={{height: '100%'}} level={'4'}>

        </Layout>
    </Layout>
  );
};

export default RegisterVendorScreen;
