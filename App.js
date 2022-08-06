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
import useNativeGeoLocation from './hooks/useNativeGeoLocation';
import MeasureLayout from './components/MeasureLayout';
import KeyboardState from './components/KeyboardState';
import MessagingContainer from './components/MessagingContainer';
import { INPUT_METHOD } from './utils/constants';

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
  const { geo } = useNativeGeoLocation();
  const [messages, setMessages] = useState(initialMessages);
  const [fullscreenImageId, setFullscreenImageId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputMethod, setInputMethod] = useState(INPUT_METHOD.NONE);

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

  const handlePressToolbarCamera = useCallback(() => {
    setIsInputFocused(false);
    setInputMethod(INPUT_METHOD.CUSTOM);
  }, []);

  const handlePressToolbarLocation = useCallback(() => {
    const { latitude, longitude } = geo;

    setMessages((prevState) => [
      createLocationMessage({
        latitude,
        longitude,
      }),
      ...prevState,
    ]);
  }, [geo, setMessages]);

  const handleChangeFocus = useCallback(
    (newValue) => {
      setIsInputFocused(newValue);
    },
    [setIsInputFocused]
  );

  const handleSubmit = useCallback((text) => {
    setMessages((prevState) => [createTextMessage(text), ...prevState]);
  }, []);

  const handlePressImage = useCallback(
    (uri) => {
      setMessages((prevState) => [createImageMessage(uri), ...prevState]);
    },
    [setMessages]
  );

  const handleChangeInputMethod = useCallback(
    (newValue) => {
      setInputMethod(newValue);
    },
    [setInputMethod]
  );

  return (
    <View style={styles.container}>
      <Status />
      {/* <MeasureLayout>
        {(layout) => (
          <KeyboardState layout={layout}>
            {(keyboardInfo) => (
              <MessagingContainer
                {...keyboardInfo}
                inputMethod={inputMethod}
                onChangeInputMethod={handleChangeInputMethod}
                handlePressImage={handlePressImage}>
                <MessageList
                  messages={messages}
                  onPressMessage={handlePressMessage}
                />
                <Toolbar
                  isFocused={isInputFocused}
                  onChangeFocus={handleChangeFocus}
                  onSubmit={handleSubmit}
                  onPressCamera={handlePressToolbarCamera}
                  onPressLocation={handlePressToolbarLocation}
                />
              </MessagingContainer>
            )}
          </KeyboardState>
        )}
      </MeasureLayout> */}

      <MessageList messages={messages} onPressMessage={handlePressMessage} />
      <Toolbar
        isFocused={isInputFocused}
        onChangeFocus={handleChangeFocus}
        onSubmit={handleSubmit}
        onPressCamera={handlePressToolbarCamera}
        onPressLocation={handlePressToolbarLocation}
      />
      <InputMethodEditor handlePressImage={handlePressImage} />
      <FullscreenImage
        messages={messages}
        fullscreenImageId={fullscreenImageId}
        handleClose={dismissFullscreenImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
