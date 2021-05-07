import {BASE_URL, USER_LOGIN, VENDOR_REGISTER} from './constants';

export const getUrl = (path: string) => {
  return BASE_URL + path;
};

const getHeaders = (headers: {[text: string]: string}) => {
  return {
    'Content-Type': 'application/json',
    ...headers,
  };
};

const parseResponse = async (response: Response) => {
  return await response.json();
};

export const registerVendor = async (payload: any) => {
  const response = await fetch(getUrl(VENDOR_REGISTER), {
    headers: getHeaders({}),
    body: JSON.stringify(payload),
  });

  return await parseResponse(response);
};

export const userLogin = async (params: {
  username: string;
  password: string;
}) => {
  const response = await fetch(getUrl(USER_LOGIN), {
    headers: getHeaders({}),
    method: 'POST',
    body: JSON.stringify({
      phoneNumber: params.username,
      password: params.password,
    }),
  });

  const json = await parseResponse(response);
  return await parseResponse(await getUserInfo(json.token));
};

export const getUserInfo = async (token: string) => {
  const response = await fetch(getUrl('user'), {
    headers: getHeaders({
      Authorization: 'Bearer ' + token,
    }),
    method: 'GET',
  });

  if (response.status === 200) {
    try {
      const json = await response.json();
      json.token = token;

      return json;
    } catch (err) {}
  } else {
    throw new (class Exception {
      constructor(public fetchResponse: Response) {}
    })(response);
  }
};
