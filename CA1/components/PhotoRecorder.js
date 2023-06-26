import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, FlatList, Text, TouchableOpacity, Modal, Button as RNButton } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageViewer from './ImageViewer';
import Button from './Button';

const PlaceholderImage = require('../assets/images/background-image.png');

const ImagePickerScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [imageList, setImageList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedImageList = await AsyncStorage.getItem('imageList');
      if (storedImageList !== null) {
        setImageList(JSON.parse(storedImageList));
      }
    } catch (error) {
      console.log('Failed to retrieve data from storage:', error);
    }
  };

  const saveData = async (uri, desc) => {
    try {
      const timestamp = new Date().toISOString();
      const newList = imageList.concat({uri, desc, timestamp});
      setImageList(newList);
      await AsyncStorage.setItem('imageList', JSON.stringify(newList));
    } catch (error) {
      console.log('Failed to save data to storage:', error);
    }
  };

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    } else {
      alert('You did not select any image.');
    }
  };

  const handleSaveButtonPress = () => {
    if (selectedImage && description) {
      saveData(selectedImage, description);
      setSelectedImage(null);
      setDescription('');
    } else {
      alert('Please select an image and provide a description.');
    }

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      saveData(result.uri, description);
    } else {
      alert('You did not select any image.');
    }
  };

  const deleteItem = async (timestamp) => {
    const newList = imageList.filter(item => item.timestamp !== timestamp);
    setImageList(newList);
    await AsyncStorage.setItem('imageList', JSON.stringify(newList));
    setModalVisible(false);
  };

  const ListItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
      <Text style={styles.text}>{item.desc}</Text>
      <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <TextInput 
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder='Enter description'
      />
      <View style={styles.buttonContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Save this photo" onPress={handleSaveButtonPress} />
      </View>
      <FlatList
        data={imageList}
        renderItem={ListItem}
        keyExtractor={item => item.timestamp}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar style="auto" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <ImageViewer
            selectedImage={selectedItem?.uri}
          />
          <Text style={styles.modalText}>{selectedItem?.desc}</Text>
          <RNButton title="Delete" onPress={() => deleteItem(selectedItem?.timestamp)} color="#ff0000" />
          <RNButton title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

export default ImagePickerScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    color: 'white',
    borderColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  listItem: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
});
