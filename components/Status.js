import { useMemo } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';
import useNetInfo from '../hooks/useNetInfo';

export default function Status() {
  const { isConnected } = useNetInfo();

  const backgroundColor = useMemo(
    () => (isConnected ? 'white' : 'red'),
    [isConnected]
  );

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={'none'}>
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      )}
    </View>
  );

  if (Platform.OS === 'ios') {
    return <View style={[styles.status, { backgroundColor }]}></View>;
  }

  return messageContainer;
}

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignitems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});
