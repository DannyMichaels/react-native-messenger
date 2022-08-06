import { useState, useCallback } from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import InputMethodEditor from './components/InputMethodEditor';
import MessageList from './components/MessageList';
import Status from './components/Status';
import Toolbar from './components/Toolbar';
import FullscreenImage from './components/FullscreenImage';
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
  const [fullscreenImageId, setFullscreenImageId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

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
        case 'image':
          setFullscreenImageId(id);
          setIsInputFocused(false);
          break;
        default:
          break;
      }
    },
    [setMessages, setFullscreenImageId, setIsInputFocused]
  );

  const dismissFullscreenImage = useCallback(() => {
    setFullscreenImageId(null);
  }, [setFullscreenImageId]);

  const handlePressToolbarCamera = useCallback(() => {}, []);

  const handlePressToolbarLocation = useCallback(() => {}, []);

  const handleChangeFocus = useCallback(
    (newValue) => {
      setIsInputFocused(newValue);
    },
    [setIsInputFocused]
  );

  const handleSubmit = useCallback((text) => {
    setMessages((prevState) => [createTextMessage(text), ...prevState]);
  }, []);

  return (
    <View style={styles.container}>
      <Status />
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
      <Toolbar
        isFocused={isInputFocused}
        onChangeFocus={handleChangeFocus}
        onSubmit={handleSubmit}
        onPressCamera={handlePressToolbarCamera}
        onPressLocation={handlePressToolbarLocation}
      />
      <InputMethodEditor />
      <FullscreenImage
        messages={messages}
        fullscreenImageId={fullscreenImageId}
        handleClose={dismissFullscreenImage}
      />
      <Button onPress={() => setMessages(initialMessages)} title="Reset" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
