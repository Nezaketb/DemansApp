import React, { useState, useEffect } from 'react';
import { View, Text, Image,TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { addPictures } from '../api';
import FooterCompanion from '../components/FooterCompanion';

const options ={
  title:'Select Image',
  type:'library',
  options:{
  maxWidth:'200',
  maxHeight:'200',
  selectionLimit:1,
  mediaType:'photo',
  includeBase64:false
  }
}

const AddPictures = ({ navigation }) => {
  const [text, setText] = useState('');
  const [url, setUrl] = useState();
  const [userId, setUserId] = useState('');
  
  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    console.log(images.assets[0]);
    setUrl(images.assets[0]?.uri); // Seçilen resmin URL'sini setUrl ile güncelle
  }

  // handleImagePick fonksiyonu düzenlendi ve addPictures çağrıldı
  const handleImagePick = async () => {
    try {
      if (url && text && userId) {
        await addPictures(text, url, userId);
        console.log('Resim başarıyla kaydedildi.');
      } else {
        console.warn('Lütfen bir resim seçin ve metin girin.');
      }
    } catch (error) {
      console.error('Resim kaydetme hatası:', error.message);
    }
  };

  // useEffect içinde AsyncStorage ile userId'i set etme işlemi düzenlendi
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
      <TouchableOpacity onPress={openGallery} style={styles.imageContainer}>
        {url ? (
          <Image source={{ uri: url }} style={styles.image} />
        ) : (
          <Text style={styles.imagePlaceholder}>Resim Seç</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.label}>Metin</Text>
      <TextInput
        style={styles.input}
        placeholder="Metin"
        value={text}
        onChangeText={(text) => setText(text)}
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