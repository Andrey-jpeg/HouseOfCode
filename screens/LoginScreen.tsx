import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import React from 'react';
import {SafeAreaView, TouchableOpacity, Alert, Image, View} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {onFacebookButtonPress, onGoogleButtonPress} from '../services/Firebase';

// I'm using fontawesome icons and need to load the icons on ios or i get a font not recognized error.
Icon.loadFont();

export const LoginScreen: React.FC = () => {
  const signInErrorHandler = (
    callback: Promise<FirebaseAuthTypes.UserCredential>,
  ) => {
    callback.catch(_error => Alert.alert('whoops something went wrong!'));
  };

  return (
    <SafeAreaView>
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
      <TouchableOpacity
        onPress={() => signInErrorHandler(onFacebookButtonPress())}>
        <SocialIcon title="Sign In With Facebook" button type="facebook" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => signInErrorHandler(onGoogleButtonPress())}>
        <SocialIcon title="Sign In With Google" button type="google" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
