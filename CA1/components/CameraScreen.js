import React, { useState, useEffect } from 'react';
import { Button, View, Image, StyleSheet, TextInput, FlatList, TouchableOpacity, Modal, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const [photoName, setPhotoName] = useState('');
  const [photoList, setPhotoList] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const storedPhotoList = await AsyncStorage.getItem('photoList');
      if (storedPhotoList !== null) {
        setPhotoList(JSON.parse(storedPhotoList));
      }
    } catch (error) {
      console.log('Failed to retrieve data from storage:', error);
    }
  };

  const saveData = async (uri, name) => {
    try {
      const timestamp = new Date().toISOString();
      const newList = photoList.concat({ uri, name, timestamp });
      setPhotoList(newList);
      await AsyncStorage.setItem('photoList', JSON.stringify(newList));
    } catch (error) {
      console.log('Failed to save data to storage:', error);
    }
  };

  const takePhoto = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const savePhoto = () => {
    if (photoUri && photoName) {
      saveData(photoUri, photoName);
      setPhotoUri(null);
      setPhotoName('');
    } else {
      alert('Please take a photo and give it a name.');
    }
  }

  const ListItem = ({ item }) => (
    <TouchableOpacity style={styles.listItem} onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
      <Text style={styles.text}>{item.name}</Text>
      <Text style={styles.dateText}>{new Date(item.timestamp).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button title="Take Photo" onPress={takePhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}
      <TextInput
        style={styles.input}
        onChangeText={setPhotoName}
        value={photoName}
        placeholder='Enter photo name'
      />
      <Button title="Save Photo" onPress={savePhoto} />
      <FlatList
        data={photoList}
        renderItem={ListItem}
        keyExtractor={item => item.timestamp}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalView}>
          <Image source={{ uri: selectedItem?.uri }} style={styles.image} />
          <Text style={styles.modalText}>{selectedItem?.name}</Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
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
