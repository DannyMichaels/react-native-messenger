import { useState } from 'react';
import Constants from 'expo-constants';
import { Platform, StyleSheet, View } from 'react-native';

export default function MeasureLayout({ children }) {
  const [layout, setLayout] = useState(null);

  const handleLayout = (event) => {
    const {
      nativeEvent: { layout },
    } = event;

    setLayout((prevState) => ({
      ...prevState,
      y: layout.y + (Platform.OS === 'android' ? Constants.statusBarHeight : 0),
    }));
  };

  if (!layout) {
    return <View onLayout={handleLayout} style={styles.container} />;
  }

  return children(layout);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
