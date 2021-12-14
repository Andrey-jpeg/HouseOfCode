import React from 'react';
import {View} from 'react-native';

export const SplashScreen: React.FC = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <Image
        source={{
          uri: 'https://goodkarmaofficer.dk/wp-content/uploads/house-of-code.png',
        }}
        style={{resizeMode: 'contain', width: 300, height: 200}}
      />
    </View>
  );
};
