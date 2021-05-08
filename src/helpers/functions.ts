import {check, PERMISSIONS, request} from 'react-native-permissions';

export const isEmpty = (obj: any) => {
  if (obj === null || obj === undefined || obj === '') {
    return true;
  }
  return obj === {};
};

export const requestLocationPermission = async () => {
  const response = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  if (response === 'granted') {
    return true;
  } else {
    const ask = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    return ask === 'granted';
  }
};
