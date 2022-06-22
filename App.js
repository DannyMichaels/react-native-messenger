import { StyleSheet, View } from 'react-native';
import InputMethodEditor from './components/InputMethodEditor';
import MessageList from './components/MessageList';
import Status from './components/Status';
import Toolbar from './components/Toolbar';

export default function App() {
  return (
    <View style={styles.container}>
      <Status />
      <MessageList />
      <Toolbar />
      <InputMethodEditor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
