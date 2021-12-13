import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {SocialIcon} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {onFacebookButtonPress} from '../services/Firebase';

// I'm using fontawesome icons and need to load the icons on ios or i get a font not recognized error.
Icon.loadFont();

export const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() =>
          onFacebookButtonPress().then(() =>
            console.log('Signed in with facebook!'),
          )
        }>
        <SocialIcon title="Sign In With Facebook" button type="facebook" />
      </TouchableOpacity>
      <TouchableOpacity>
        <SocialIcon title="Sign In With Google" button type="google" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
