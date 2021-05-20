/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
if (__DEV__) {
  const LogBox = require('react-native/Libraries/LogBox/LogBox');
  LogBox.ignoreLogs(['Reanimated']);
}
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
