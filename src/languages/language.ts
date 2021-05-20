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
  verifyEmail: string;
  forgotPassword: string;
  loginAlert: string;
  containerType: string;
  containerSize: string;
  pickUp: string;
  Drop: string;
  quantity: string;
  Price: string;
  phone: string;
  location: string;
  yourLocation: string;
  cancel: string;
  pending: string;
  createItems: string;
  detail: string;
  requestDetail: string;
  itemsToDelivery: string;
  language: string;
  night: string;
  setting: string;
  vendorHome: string;
  driverHome: string;
  myPickups: string;
  alreadyRegister: string;
  name: string;
  email: string;
  address: string;
  cPassword: string;
  attachement: string;
  blueBook: string;
  license: string;
  register: string;
  rBluebook: string;
  rlicense: string;
  company: string;
  recoverMessage: string;
  eid: string;
  haveCode: string;
  continue: string;
  recoverAccount: string;
  eSent: string;
  eContent: string;
  chnageAcPass: string;
  newPass: string;
  confirmCode: string;
  changeAccDes: string;
  verifyAc: string;
  verifyDes: string;
  accountOTP: string;
  otpMessage: string;
  truck: string;
  otruck: string;
  container: string;
  tripper: string;
  pickup: string;
  registerDriver: string;
  registerVendor: string;
  
}

const languages = {
  en: English,
  np: Nepali,
};

export default languages;
