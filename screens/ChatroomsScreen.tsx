import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {signOut} from '../services/Firebase';

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
