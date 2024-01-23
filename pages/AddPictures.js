import React, { useState, useEffect } from 'react';
import { View, Text, Image,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';
import { addPictures } from '../api';

const AddPictures = ({ navigation }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState('');

  const { colors } = useTheme();

  
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        handleImagePick(response);
      }
    });
  };

  const handleImagePick = async (response) => {
    try {
      if (response && response.assets && response.assets.length > 0) {
        const firstAsset = response.assets[0];
        const fileName = firstAsset.fileName;

        // Resmi göster
        setUrl(firstAsset.uri);

        // Resmi sunucuya yükle
        await uploadImageToServer(firstAsset);

        // Resim bilgisini kullanıcının profiline kaydet
        await saveImageToUserProfile(fileName);
      } else {
        console.warn('Invalid response format or no assets selected.');
      }
    } catch (error) {
      console.error('Error in handleImagePick:', error);
    }
  };

  const uploadImageToServer = async (image) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: image.uri,
        type: image.type,
        name: image.fileName,
      });

      await addPictures(text, image.fileName, userId);
     
    } catch (error) {
      console.error('Error in uploadImageToServer:', error);
    }
  };

  
 
  

  

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(parseInt(storedUserId, 10));
        }
      } catch (error) {
        console.error('Get userId error:', error.message);
      }
    };

    loadUserId();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Resim Ekleme</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {url ? (
          <Image source={{ uri: url.uri }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Resim Seç</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Metin</Text>
      <TextInput
        style={styles.input}
        placeholder="Metin"
        value={text}
        onChangeText={(tex) => setText(tex)}
      />
      <TouchableOpacity style={styles.button} onPress={handleImagePick}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageContainer: {
    width: 200,
    height: 200,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    fontSize: 16,
    color: '#555',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    color:'black',
    marginBottom: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddPictures;