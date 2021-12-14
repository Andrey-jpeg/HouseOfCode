import React from 'react';
import {Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export const ChatRoom: React.FC = ({route}) => {
  console.log(route.params);
  return (
    <View>
      <Text> hello from the Chat Screen</Text>
    </View>
  );
};
