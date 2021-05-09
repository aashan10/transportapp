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
}

export const english: Language = require('./en.json');
export const nepali: Language = require('./np.json');

const languages = {
  en: english,
  np: nepali,
};

export default languages;
