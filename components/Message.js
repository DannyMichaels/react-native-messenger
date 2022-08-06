import { useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

export default function Message({ message, onPressMessage }) {
  const messageBodyJSX = useMemo(() => {
    const { type, text, uri, coordinate } = message;

    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.text}>{text}</Text>
          </View>
        );

      case 'image':
        return <Image style={styles.image} source={{ uri }} />;

      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}>
            {/* MapView.marker drops a pin at the coordinate in the message */}
            <MapView.Marker coordinate={coordinate} />
          </MapView>
        );

      default:
        return <></>;
    }
  }, [message]);

  return (
    <View key={message.id} style={styles.messageContainer}>
      <TouchableOpacity onPress={() => onPressMessage(message)}>
        {messageBodyJSX}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
    marginRight: 10,
    marginleft: 60,
  },

  messageBubble: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgb(16,135,255)',
    borderRadius: 20,
  },

  text: {
    fontSize: 18,
    color: '#fff',
  },

  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },

  map: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
});
