import {
  BASE_URL,
  DRIVER_EXPLORE,
  USER_LOGIN,
  USER_PROFILE,
  VENDOR_ITEM_UPLOAD,
} from './constants';
import {sharedData} from '../contexts/user-context';
import RNFS from 'react-native-fs';

export const getUrl = (path: string) => {
  return BASE_URL + path;
};

const getHeaders = (headers: {[text: string]: string}) => {
  return {
    'Content-Type': 'application/json',
    ...headers,
  };
};

export const userLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(getUrl(USER_LOGIN), {
    method: 'POST',
    headers: getHeaders({}),
    body: JSON.stringify({
      phoneNumber: username,
      password: password,
    }),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Exception(response);
  }
};

export const userInfo = async (token: string) => {
  const response = await fetch(getUrl(USER_PROFILE), {
    method: 'GET',
    headers: getHeaders({'auth-token': token}),
  });
  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const createNewItemRequest = async (props: {
  quantity: number;
  price: number;
  latitude: number;
  name: string;
  from: string;
  to: string;
  longitude: number;
}) => {
  const response = await fetch(getUrl(VENDOR_ITEM_UPLOAD), {
    headers: getHeaders({
      'auth-token': sharedData.user.token,
    }),
    method: 'POST',
    body: JSON.stringify({
      latitudeOfDeliveryFrom: props.latitude,
      longitudeOfDeliveryFrom: props.longitude,
      itemName: props.name,
      deliveryFrom: props.from,
      deliveryTo: props.to,
      quantity: props.quantity,
      deliveryPrice: props.price,
    }),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const getDriverFeeds = async () => {
  const response = await fetch(getUrl(DRIVER_EXPLORE), {
    headers: getHeaders({'auth-token': sharedData.user.token}),
    method: 'GET',
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const registerDriver = async (props: {
  name: string;
  phone: string;
  email: string;
  password: string;
  address: string;
  blueBookPhoto: string;
  licensePhoto: string;
}) => {
  console.log(RNFS.DownloadDirectoryPath + '/request.json');
  RNFS.writeFile(
    RNFS.DownloadDirectoryPath + '/request.json',
    JSON.stringify(props),
    'utf8',
  )
    .then(() => {
      console.log('Logged Request');
    })
    .catch(e => {
      console.log('Logging error', e);
    });
  const response = await fetch(getUrl(''), {
    headers: getHeaders({'auth-token': sharedData.user.token}),
    method: 'POST',
    body: JSON.stringify(props),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Exception(response);
  }
};

export class Exception {
  constructor(public response: Response) {}
}
