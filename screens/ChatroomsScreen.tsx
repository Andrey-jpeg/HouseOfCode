import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import auth from '@react-native-firebase/auth';

function signOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export const ChatRoomsScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => signOut()}>
        <Text> I am the main screen! </Text>
      </TouchableOpacity>
    </View>
  );
};
