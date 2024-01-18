import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPictures} from '../api';

const AddMedicines = ({ navigation }) => {
    const [name, setName] = useState('');
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState('');
    const [userId, setUserId] = useState('');


    const { colors } = useTheme();

    const handleAddPictures = async () => {
        try {
          await addPictures(text,url,status,userId);
        } catch (error) {
          console.error('Error in AddPictures:', error);
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
    <Text>Resim Ekleme</Text>
    )
}

export default AddMedicines;