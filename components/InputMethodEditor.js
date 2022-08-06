import { View, StyleSheet } from 'react-native';
import ImageGrid from './ImageGrid';

export default function InputMethodEditor() {
  return (
    <View style={styles.inputMethodEditor}>
      <ImageGrid />
    </View>
  );
}

const styles = StyleSheet.create({
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
