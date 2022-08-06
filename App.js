import { useState, useCallback } from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import InputMethodEditor from './components/InputMethodEditor';
import MessageList from './components/MessageList';
import Status from './components/Status';
import Toolbar from './components/Toolbar';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/messageUtils';

const initialMessages = [
  createImageMessage('https://unsplash.it/300/300'),
  createTextMessage('World'),
  createTextMessage('hello'),
  createLocationMessage({
    latitude: 37.8825,
    longitude: -122.4324,
  }),
];

export default function App() {
  const [messages, setMessages] = useState(initialMessages);

  const handlePressMessage = useCallback(
    (message) => {
      const { id, type } = message;

      switch (type) {
        case 'text':
          Alert.alert(
            'Delete message?',
            'Are you sure you want to permanently delete this message?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                  setMessages((prevState) =>
                    prevState.filter((message) => message.id !== id)
                  );
                },
              },
            ]
          );
          break;
        default:
          break;
      }
    },
    [setMessages]
  );

  return (
    <View style={styles.container}>
      <Status />
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
      <Toolbar />
      <InputMethodEditor />
      {/* <Button onPress={() => setMessages(initialMessages)} title="Reset" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
