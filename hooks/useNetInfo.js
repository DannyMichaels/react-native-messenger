import { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // https://github.com/react-native-netinfo/react-native-netinfo

export default function useNetInfo() {
  const [isConnected, setIsConnected] = useState(null);

  const handleChange = useCallback(
    (isConnected) => {
      setIsConnected(isConnected);

      StatusBar.setBarStyle(isConnected ? 'light-content' : 'dark-content');
    },
    [setIsConnected]
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // setTimeout(() => handleChange(false), 3000);

  return { isConnected, setIsConnected };
}
