import {Icon, Input, Text, Spinner, Layout} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {
  MAPBOX_API_KEY,
  MAPBOX_BBOX_NEPAL,
  MAPBOX_PLACES_API_URL,
} from '../api/constants';

const LocationPicker = ({
  onItemPress,
  onChangeText,
}: {
  onItemPress: CallableFunction;
  onChangeText: CallableFunction;
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [locationName, setLocationName] = useState<string>('');

  useEffect(() => {
    const urlParams: {[key: string]: string} = {
      bbox: MAPBOX_BBOX_NEPAL,
      access_token: MAPBOX_API_KEY,
    };
    let url = MAPBOX_PLACES_API_URL + '/' + locationName + '.json?';
    for (let param in urlParams) {
      url += param + '=' + urlParams[param] + '&';
    }

    fetch(url)
      .then(response => response.json())
      .then(response => {
        setData(response.features);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [locationName]);

  return (
    <View style={{position: 'relative'}}>
      <Input
        onChangeText={text => {
          onChangeText(text);
          setLocationName(text);
          if (text === '') {
            setLoading(false);
          } else {
            setLoading(true);
          }
        }}
        placeholder={'Search for a place'}
        style={{borderWidth: 0, marginBottom: 5}}
        accessoryLeft={props => {
          // @ts-ignore
          let styles = {...props?.style, height: 40};
          return <Icon {...props} style={styles} name="search" />;
        }}
        accessoryRight={props => {
          if (!isLoading) {
            return <></>;
          }
          // @ts-ignore
          return <Spinner />;
        }}
      />

      <Layout
        style={{position: 'absolute', top: 50, zIndex: 100, width: '100%'}}>
        <FlatList
          keyboardShouldPersistTaps="handled"
          data={data}
          renderItem={rowData => {
            const {item} = rowData;
            return (
              <TouchableOpacity
                style={{
                  zIndex: 100,
                  paddingVertical: 15,
                  paddingHorizontal: 10,
                }}
                onPress={() => {
                  onItemPress(item);
                  setData([]);
                  setLoading(false);
                }}>
                <Text style={{fontWeight: 'bold'}}>{item.place_name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </Layout>
    </View>
  );
};

export default LocationPicker;
