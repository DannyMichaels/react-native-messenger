import { View, Text, StyleSheet } from 'react-native';

export default function Toolbar() {
  return (
    <View style={styles.toolbar}>
      <Text>Toolbar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#fff',
  },
});
