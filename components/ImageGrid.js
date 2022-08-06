import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import { Permissions } from 'expo';
import Grid from './Grid';

const keyExtractor = ({ uri }) => uri;

export default function ImageGrid({ onPressImage = () => {} }) {
  const [images, setImages] = useState([
    {
      uri: 'https://picsum.photos/600/600?image=10',
    },
    {
      uri: 'https://picsum.photos/600/600?image=20',
    },
    {
      uri: 'https://picsum.photos/600/600?image=30',
    },
    {
      uri: 'https://picsum.photos/600/600?image=40',
    },
  ]);

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return <Image source={{ uri }} style={style} />;
  };

  return (
    <Grid data={images} renderItem={renderItem} keyExtractor={keyExtractor} />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
