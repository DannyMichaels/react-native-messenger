import { View, StyleSheet } from 'react-native';
import ImageGrid from './ImageGrid';

export default function InputMethodEditor({ handlePressImage }) {
  return (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={handlePressImage} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
