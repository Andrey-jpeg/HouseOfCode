import React, {useEffect, useState} from 'react';
import {AuthStack, MainStack, SplashScreenNav} from './navigation/Index';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  /* since i have 2 functions that listen
  on onAuthStateChanged i need to add a guard clause.
  else it complains about memory leak :) */
  useEffect(() => {
    let mounted = true;
    auth().onAuthStateChanged(userState => {
      if (mounted) {
        setUser(userState);
      }

      if (isLoading) {
        setIsLoading(false);
      }

      return () => {
        mounted = false;
      };
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
