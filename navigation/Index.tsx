import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import linking from '../services/Linking';

import {SplashScreen} from '../screens/SplashScreen';

import {LoginScreen} from '../screens/LoginScreen';
import {ChatRoomsScreen} from '../screens/ChatroomsScreen';
import {ChatRoom} from '../screens/ChatRoom';
import {Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {signOut} from '../services/Firebase';

const Stack = createStackNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const SplashScreenNav: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const AuthStack: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const MainStack: React.FC = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen
          name="Chat rooms"
          component={ChatRoomsScreen}
          options={{
            headerRight: () => (
              <TouchableOpacity onPress={() => signOut()}>
                <Text> Log out </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Chat room" component={ChatRoom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
