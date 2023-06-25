import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';
import ImageViewer from './ImageViewer';

const PlaceholderImage = require('../assets/images/background-image.png');

const ImagePickerScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    retrieveSelectedImage();
  }, []);

  const retrieveSelectedImage = async () => {
    try {
      const imageUri = await AsyncStorage.getItem('selectedImage');
      if (imageUri !== null) {
        setSelectedImage(imageUri);
      }
    } catch (error) {
      console.log('Failed to retrieve selected image from storage:', error);
    }
  };

  const saveSelectedImage = async (uri) => {
    try {
      await AsyncStorage.setItem('selectedImage', uri);
    } catch (error) {
      console.log('Failed to save selected image to storage:', error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      saveSelectedImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
