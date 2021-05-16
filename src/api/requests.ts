import {
  BASE_URL,
  DRIVER_EXPLORE,
  USER_LOGIN,
  USER_PROFILE,
  VENDOR_ITEM_UPLOAD,
  VENDOR_REGISTER,
  DRIVER_DELIVERY_ACCEPT,
  VENDOR_ITEM_DETAIL,
  MAIL_RESEND,
  PROFILE_NEW_PASSWORD,
  PROFILE_FORGET_PASSWORD,
  MAIL_VERIFICATION,
  DRIVER_REGISTER,
} from './constants';
import {sharedData} from '../contexts/user-context';
import axios, {AxiosResponse} from 'axios';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {requestLocationPermission} from '../helpers/functions';
import Geolocation from '@react-native-community/geolocation';

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
  type: string;
  size: string;
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
      deliveryPriceByVendor: props.price,
      containerType: props.type,
      containerSize: props.size,
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

export const getVendorItemsDetail = async () => {
  const response = await fetch(getUrl(VENDOR_ITEM_DETAIL), {
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
  vehicleSize: string;
  vehicleType: string;
  address: string;
  blueBookPhoto: ImageOrVideo | undefined;
  licensePhoto: ImageOrVideo | undefined;
}) => {
  const filename = (fullPath: string | undefined) => {
    if (fullPath === undefined) {
      return '';
    }
    const path = fullPath.split('/');
    return path[path.length - 1];
  };

  const formData = new FormData();
  formData.append('name', props.name);
  formData.append('phone', props.phone);
  formData.append('email', props.email);
  formData.append('password', props.password);
  try {
    await requestLocationPermission();
    Geolocation.getCurrentPosition(coordinates => {
      formData.append('driverCurrentLat', coordinates.coords.latitude);
      formData.append('driverCurrentLng', coordinates.coords.longitude);
    });
  } catch (e) {
    formData.append('driverCurrentLat', '');
    formData.append('driverCurrentLng', '');
  }
  formData.append('impDocs[0]', {
    type: props.licensePhoto?.mime,
    uri: props.licensePhoto?.path,
    name: filename(props.licensePhoto?.path),
  });
  formData.append('impDocs[1]', {
    type: props.blueBookPhoto?.mime,
    uri: props.blueBookPhoto?.path,
    name: filename(props.blueBookPhoto?.path),
  });

  // const response = await fetch(getUrl(DRIVER_REGISTER), {
  //   headers: getHeaders({'Content-Type': 'multipart/form-data'}),
  //   method: 'POST',
  //   body: formData,
  // });
  // if (response.ok) {
  //   return await response.json();
  // } else {
  //   throw new Exception(response);
  // }

  const response = await axios.post(getUrl(DRIVER_REGISTER), formData);
  if (response.status === 200) {
    return response.data;
  }
  throw new Exception(response);
};

export const registerVendor = async (data: {
  name: string;
  companyName: string;
  address: string;
  password: string;
  email: string;
  phoneNumber: string;
}) => {
  const response = await fetch(getUrl(VENDOR_REGISTER), {
    headers: getHeaders({'auth-token': sharedData.user.token}),
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (response.ok) {
    return response;
  } else {
    throw new Exception(response);
  }
};

export const acceptDeliveryRequest = async (payload: {
  itemId: string;
  vendorId: string;
}) => {
  const response = await fetch(getUrl(DRIVER_DELIVERY_ACCEPT), {
    headers: getHeaders({'auth-token': sharedData.user.token}),
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const forgotPassword = async (email: string) => {
  const response = await fetch(getUrl(PROFILE_FORGET_PASSWORD), {
    headers: getHeaders({}),
    body: JSON.stringify({email: email}),
    method: 'POST',
  });

  if (response.ok) {
    return response;
  }
  throw new Exception(response);
};

export const resendVerificationEmail = async ({email}: {email: string}) => {
  const response = await fetch(getUrl(MAIL_RESEND), {
    headers: getHeaders({}),
    method: 'POST',
    body: JSON.stringify({email: email}),
  });

  if (response.ok) {
    return await response.text();
  }
  throw new Exception(response);
};

export const changePassword = async (data: {
  newPassword: string;
  confirmPassword: string;
  token: string;
}) => {
  const response = await fetch(getUrl(PROFILE_NEW_PASSWORD), {
    headers: getHeaders({}),
    body: JSON.stringify(data),
    method: 'POST',
  });

  if (response.ok) {
    return response;
  }
  throw new Exception(response);
};

export const verifyAccount = async ({token}: {token: string}) => {
  const response = await fetch(getUrl(MAIL_VERIFICATION), {
    headers: getHeaders({}),
    body: JSON.stringify({token: token}),
    method: 'POST',
  });

  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export class Exception {
  constructor(public response: Response | AxiosResponse<any>) {}
}
