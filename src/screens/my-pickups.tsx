import React from 'react';
import {Text, Layout} from '@ui-kitten/components';
import Header from '../components/header';

const MyPickups = ({navigation}: any) => {
  return (
    <Layout style={{height: '100%'}} level={'4'}>
      <Layout>
        <Header title={'My Pickups'} navigation={navigation} />
      </Layout>
      <Layout
        style={{
          flex: 1,
          borderRadius: 10,
          margin: 5,
          padding: 10,
          overflow: 'hidden',
        }}
        level={'1'}>
        <Text style={{fontWeight: 'bold'}}>My Pickups</Text>
      </Layout>
    </Layout>
  );
};

export default MyPickups;
