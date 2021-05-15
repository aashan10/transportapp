import Nepali from './np';
import English from './en';

export interface Language {
  appName: string;
  login: string;
  registerHere: string;
  welcome: string;
  logout: string;
  addNewRequest: string;
  verified: string;
  verifiedRequest: string;
  verifiedRequestMessage: string;
  close: string;
  pickupLocation: string;
  deliveryLocation: string;
  price: string;
  currency: string;
  changeLanguage: string;
  registerAsVendor: string;
  registerAsDriver: string;
  verifiedAccount: string;
  details: string;
  request: string;
  itemName: string;
  username: string;
  password: string;
}

const languages = {
  en: English,
  np: Nepali,
};

export default languages;
