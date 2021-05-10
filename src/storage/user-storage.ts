import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
  return await AsyncStorage.setItem('auth-token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('auth-token');
};
