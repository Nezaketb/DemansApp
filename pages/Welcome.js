import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addPictures} from '../api';

const Welcome = ({ navigation }) => {

      
      
      
    return (
    <Text>Resim Ekleme</Text>
    )
}

export default Welcome;