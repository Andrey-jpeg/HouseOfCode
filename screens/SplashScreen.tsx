import React from 'react';
import {View, Text} from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text> I am a splash screen: ) </Text>
    </View>
  );
};
