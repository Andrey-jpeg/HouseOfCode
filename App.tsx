import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {SplashScreenNav} from './navigation/Navigation';

const App = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? (
    <>
      <SplashScreenNav />
    </>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text> Hello from my loaded app :)</Text>
    </View>
  );
};

export default App;
