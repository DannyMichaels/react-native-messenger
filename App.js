import { useState, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import InputMethodEditor from './components/InputMethodEditor';
import MessageList from './components/MessageList';
import Status from './components/Status';
import Toolbar from './components/Toolbar';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/messageUtils';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('hello'),
    createLocationMessage({
      latitude: 37.8825,
      longitude: -122.4324,
    }),
  ]);

  const handlePressMessage = useCallback(() => {}, []);

  return (
    <View style={styles.container}>
      <Status />
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
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
