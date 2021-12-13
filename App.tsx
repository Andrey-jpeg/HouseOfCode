import React, {useEffect, useState} from 'react';
import {AuthStack, MainStack, SplashScreenNav} from './navigation/Index';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (isLoading) {
        setIsLoading(false);
      }
    });
  }, [isLoading]);

  return (
    /* I am using react-native-elements for common elements.
    it is required that you wrap your app in a safe area provider.
    Also doing some conditional rendering of different navigations.
    Wrapping with react fragments to provide parent elements.
    */
    <SafeAreaProvider>
      {isLoading ? (
        <>
          <SplashScreenNav />
        </>
      ) : !user ? (
        <>
          <AuthStack />
        </>
      ) : (
        <>
          <MainStack />
        </>
      )}
    </SafeAreaProvider>
  );
};

export default App;
