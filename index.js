/**
 * @format
 */

import {AppRegistry, Linking, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    Linking.openURL(notification?.message);
  },
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: 'test-channel',
  channelName: 'test-channel',
});

AppRegistry.registerComponent(appName, () => App);
