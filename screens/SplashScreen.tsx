import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://goodkarmaofficer.dk/wp-content/uploads/house-of-code.png',
        }}
        style={{resizeMode: 'contain', width: 300, height: 200}}
      />
      <ActivityIndicator />
    </View>
  );
};
