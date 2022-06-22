import { View, Text, StyleSheet } from 'react-native';

export default function InputMethodEditor() {
  return (
    <View style={styles.inputMethodEditor}>
      <Text>InputMethodEditor</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
