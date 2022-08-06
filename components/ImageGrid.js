import React, { useState, useEffect, useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import Grid from './Grid';
import * as MediaLibrary from 'expo-media-library';

const keyExtractor = ({ uri }) => uri;

export default function ImageGrid({ onPressImage = () => {} }) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const [cursor, setCursor] = useState(null);
  const [images, setImages] = useState([
    // {
    //   uri: 'https://picsum.photos/600/600?image=10',
    // },
    // {
    //   uri: 'https://picsum.photos/600/600?image=20',
    // },
    // {
    //   uri: 'https://picsum.photos/600/600?image=30',
    // },
    // {
    //   uri: 'https://picsum.photos/600/600?image=40',
    // },
  ]);

  const getImages = useCallback(
    async (after) => {
      // if (isLoading) return;
      try {
        setIsLoading(true);

        if (status?.status === 'undetermined') {
          const response = await requestPermission();

          if (!response.granted) {
            console.log('Camera roll permission denied');
            return;
          }
        } else if (!status?.granted) {
          console.log('Camera roll permission denied');
          return;
        }

        const { assets, endCursor, hasNextPage } =
          await MediaLibrary.getAssetsAsync({
            first: 20,
            after,
            // mediaType: state.mediaType,
            // sortBy: state.sortBy,
            // album: album && album.id,
          });

        setImages(
          (prevState) => [...new Set([...prevState, ...assets])],
          () => {
            setIsLoading(false);
            setCursor(hasNextPage ? endCursor : null);
          }
        );
      } catch (err) {
        console.log('error! ', err);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, status]
  );

  const getNextImages = useCallback(() => {
    if (!cursor) return;

    getImages(cursor);
  }, [getImages, cursor]);

  useEffect(() => {
    getImages();
  }, []);

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = {
      width: size,
      height: size,
      marginLeft,
      marginTop,
    };

    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}>
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getNextImages}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
