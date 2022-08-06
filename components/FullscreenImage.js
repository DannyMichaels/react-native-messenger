import { useMemo, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';

export default function FullScreenImage({
  messages,
  fullscreenImageId,
  handleClose,
}) {
  const subscriptionRef = useRef(null);

  const oneMessage = useMemo(
    () => messages.find((message) => message.id === fullscreenImageId),
    [messages, fullscreenImageId]
  );

  useEffect(() => {
    // android back arrow press.
    subscriptionRef.current = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (fullscreenImageId) {
          handleClose();
          // true is for not closing app.
          return true;
        }
        return false; // false is for closing app
      }
    );
    return () => {
      subscriptionRef?.current?.remove();
    };
  }, [fullscreenImageId]);

  if (!oneMessage) return null;

  const { uri } = oneMessage;

  return (
    <TouchableHighlight style={styles.fullScreenOverlay} onPress={handleClose}>
      <Image style={styles.fullscreenImage} source={{ uri }} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
