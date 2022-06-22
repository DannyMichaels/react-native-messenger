import { View, Text, StyleSheet } from 'react-native';

export default function MessageList() {
  return (
    <View style={styles.content}>
      <Text>MessageList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
