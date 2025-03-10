import {
  BASE_URL,
  DRIVER_DELIVERY_ACCEPT,
  DRIVER_DELIVERY_DETAIL,
  DRIVER_EXPLORE,
  DRIVER_ITEM_ACCEPTED_LIST,
  DRIVER_ITEM_REACHED,
  DRIVER_REGISTER,
  MAIL_RESEND,
  MAIL_VERIFICATION,
  PROFILE_FORGET_PASSWORD,
  PROFILE_NEW_PASSWORD,
  USER_LOGIN,
  USER_PROFILE,
  VENDOR_ITEM_DETAIL,
  VENDOR_ITEM_UPLOAD,
  VENDOR_REGISTER,
  DRIVER_DELIVERY_CANCEL,
  VENDOR_VENDOR_CANCEL,
  DRIVER_NEAR_YOU,
  DRIVER_CURRENT_ADDRESS,
} from './constants';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {requestLocationPermission} from '../helpers/functions';
import Geolocation from '@react-native-community/geolocation';
import {Coordinates} from '@mapbox/mapbox-sdk';

export const get = async (url: string, auth: boolean = true) => {
  const payload = {
    headers: getHeaders({'Content-Type': 'application/json'}),
    method: 'GET',
  };
  const userContext = await import('../contexts/user-context');
  if (auth) {
    payload.headers = getHeaders({
      ...payload.headers,
      'auth-token': userContext.sharedData.user.token,
    });
  }

  const response = await fetch(getUrl(url), payload);
  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const post = async (url: string, data: any, auth: boolean = true) => {
  const userContext = await import('../contexts/user-context');
  const payload = {
    headers: getHeaders({'Content-Type': 'application/json'}),
    method: 'POST',
    body: JSON.stringify(data),
  };

  if (auth) {
    payload.headers = getHeaders({
      ...payload.headers,
      'auth-token': userContext.sharedData.user.token,
    });
  }

  const response = await fetch(getUrl(url), payload);
  if (response.ok) {
    return await response.json();
  }
  throw new Exception(response);
};

export const getUrl = (path: string) => {
  return BASE_URL + path;
};

const getHeaders = (headers: {[text: string]: string}) => {
  return {
    'Content-Type': 'application/json',
    ...headers,
  };
};

export const userLogin = async (credentials: {
  phoneNumber: string;
  password: string;
  deviceId: string;
}) => {
  return await post(USER_LOGIN, credentials, false);
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
  name: string;
  from: {coords: Coordinates; name: string};
  to: {coords: Coordinates; name: string};
  description: string;
}) => {
  const data = {
    itemName: props.name,
    deliveryTo: props.to.name,
    deliveryFrom: props.from.name,
    quantity: props.quantity,
    deliveryPriceByVendor: props.price,
    itemDescription: props.description,
    latitudeOfDeliveryFrom: props.from.coords[1],
    longitudeOfDeliveryFrom: props.from.coords[0],
    latitudeOfDeliveryTo: props.to.coords[1],
    longitudeOfDeliveryTo: props.to.coords[0],
  };
  return await post(VENDOR_ITEM_UPLOAD, data);
};

export const getDriverFeeds = async () => {
  return await get(DRIVER_EXPLORE);
};

export const getVendorItemsDetail = async () => {
  return await get(VENDOR_ITEM_DETAIL);
};
export const getDeliveryitemDetail = async () => {
  return await get(DRIVER_DELIVERY_DETAIL);
};
export const getDrivercancel = async () => {
  return await get(DRIVER_DELIVERY_CANCEL);
};
export const getVendorCancel = async () => {
  return await get(VENDOR_VENDOR_CANCEL);
};
export const getDeliveryItemList = async () => {
  return await get(DRIVER_ITEM_ACCEPTED_LIST);
};
export const getNearYouItem = async ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return await get(DRIVER_NEAR_YOU + `?lat=${latitude}&lng=${longitude}`);
};

export const registerDriver = async (props: {
  name: string;
  ownerName: string;
  ownerPhone: string;
  licenseNumber: string;
  phone: string;
  email: string;
  password: string;
  vehicleType: string;
  address: string;
  deviceId: string;
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
  formData.append('ownerName', props.ownerName);
  formData.append('ownerPhone', props.ownerPhone);
  formData.append('licenseNumber', props.licenseNumber);
  formData.append('email', props.email);
  formData.append('address', props.address);
  formData.append('currentAddress', props.address);
  formData.append('phoneNumber', props.phone);
  formData.append('password', props.password);
  formData.append('driverVehicleType', props.vehicleType);
  formData.append('deviceId', props.deviceId);
  try {
    if (await requestLocationPermission()) {
      Geolocation.getCurrentPosition(coordinates => {
        formData.append('driverCurrentLat', coordinates.coords.latitude);
        formData.append('driverCurrentLng', coordinates.coords.longitude);
      });
    } else {
      throw new Error();
    }
  } catch (e) {
    formData.append('driverCurrentLat', '');
    formData.append('driverCurrentLng', '');
  }
  formData.append('impDocs', {
    type: props.licensePhoto?.mime,
    uri: props.licensePhoto?.path,
    name: filename(props.licensePhoto?.path),
  });
  formData.append('impDocs', {
    type: props.blueBookPhoto?.mime,
    uri: props.blueBookPhoto?.path,
    name: filename(props.blueBookPhoto?.path),
  });

  const response = await fetch(getUrl(DRIVER_REGISTER), {
    method: 'POST',
    body: formData,
    headers: getHeaders({
      'Content-Type': 'multipart/form-data',
    }),
  });
  if (response.ok) {
    return await response.json();
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
  panNumber: string;
  deviceId: string;
}) => {
  return await post(VENDOR_REGISTER, data);
};

export const currentAddress = async (data: {
  driverCurrentLng: string | number;
  driverCurrentLat: string | number;
}) => {
  return await post(DRIVER_CURRENT_ADDRESS, data);
};

export const acceptDeliveryRequest = async (payload: {
  itemId: string;
  vendorId: string;
}) => {
  return await post(DRIVER_DELIVERY_ACCEPT, payload, true);
};

export const forgotPassword = async (email: string) => {
  return await post(PROFILE_FORGET_PASSWORD, {email: email});
};

export const resendVerificationEmail = async ({email}: {email: string}) => {
  return await post(MAIL_RESEND, {email: email});
};

export const changePassword = async (data: {
  newPassword: string;
  confirmPassword: string;
  token: string;
}) => {
  return await post(PROFILE_NEW_PASSWORD, data);
};

export const verifyAccount = async ({token}: {token: string}) => {
  return await post(MAIL_VERIFICATION, {token: token});
};

export const itemReached = async (payload: {
  itemId: string;
  vendorId: string;
}) => {
  return await post(DRIVER_ITEM_REACHED, payload);
};

export const cancelDelivery = async (payload: {
  vendorId: string;
  itemId: string;
}) => {
  return await post(DRIVER_DELIVERY_CANCEL, payload);
};

export const deleteRequest = async (payload: {
  itemId: string;
  vendorId: string;
}) => {
  return await post(VENDOR_VENDOR_CANCEL, payload);
};

export class Exception {
  constructor(public response: Response) {}
}
