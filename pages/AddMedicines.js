import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMedicines} from '../api';

const AddMedicines = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [usageDuration, setUsageduration] = useState('');
    const [usagePurpose, setUsagePurpose] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [afternoon, setAfternoon] = useState('');
    const [evening, setEvening] = useState('');
    const [moon, setMoon] = useState('');
    const [night, setNight] = useState('');
    const [moonTime, setMoonTime] = useState('');
    const [afternoonTime, setAfternoonTime] = useState('');
    const [eveningTime, setEveningTime] = useState('');
    const [nightTime, setNightTime] = useState('');
    const [status, setStatus] = useState('');
    const [userId, setUserId] = useState('');


    const { colors } = useTheme();

    const handleAddMedicines = async () => {
        try {
          await addMedicines(name,  usageDuration,  status, usagePurpose,startDate,  endDate, afternoon, evening, moon, moonTime,  afternoonTime, eveningTime,night, nightTime, userId);
        } catch (error) {
          console.error('Error in AddMedicines:', error);
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
    <Text>İlaç Ekleme</Text>
    )
}

export default AddMedicines;