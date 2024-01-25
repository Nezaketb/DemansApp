import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView,StyleSheet,Modal} from 'react-native'
import React, { useState,useEffect } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { addMedicines,getMedicines} from '../api';
import FooterCompanion from '../components/FooterCompanion';

const AddMedicines = ({ navigation }) => {
    const [medicines, setMedicines] = useState('');
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
    const [selectedDay, setSelectedDay] = useState('');
    const [selectedDayMedicines, setSelectedDayMedicines] = useState([]);
    
  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    const currentDate = new Date(day.dateString);
    currentDate.setDate(currentDate.getDate() +1);
  
    const dayMedicines = medicines.filter(medicine => {
    const startDate = new Date(medicine.startDate);
    const endDate = new Date(medicine.endDate);
      
    return currentDate >= startDate && currentDate <= endDate;
    });
  
    setSelectedDayMedicines(dayMedicines);
  };

  const fetchMedicines = async () => {
    try {
      const medicinesData = await getMedicines(userId);
      setMedicines(medicinesData.data);
      console.log(medicinesData);
    } catch (error) {
      console.error('Get medicines error:', error.message);
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
      
      useEffect(() => {
        if (userId) {
          fetchMedicines();
        }
      }, [userId]);
      
      return (
        <View style={styles.container}>
        <Header/>
          <Text style={styles.header}>İlaçlarım</Text>
          <Calendar
            style={styles.calendar}
            markedDates={{
              [selectedDay]: { selected: true, marked: true, selectedColor: colors.primary },
            }}
            onDayPress={handleDayPress}
          />
          <ScrollView>
         <View style={styles.medicinesList}>
      {selectedDayMedicines.map((item, index) => (
        <View key={index} style={styles.medicineItem}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
          <>
            <Icon name="medkit" size={20} color={colors.primary} />
            <Text style={{ color: colors.text, marginLeft: 5, fontWeight: '500', fontSize: 20 }}>{item.name}</Text>
          </>
        </View>
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Sabah: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.moonTime}</Text></Text>
            <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Öğle: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.afternoonTime}</Text></Text>
            <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Akşam: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.eveningTime}</Text></Text>
            <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Gece: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.nightTime}</Text></Text>
          </View>
        </View>
      ))}
    </View>
    <View style={{padding:25}}></View>
    </ScrollView>
          <FooterCompanion/>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f8ff',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        padding: 10,
        marginBottom: 16,
      },
      calendar: {
        marginBottom: 16,
      },
      medicinesList: {
        marginTop: 16,
      },
      medicineItem: {
        flexDirection: 'row',
        borderRadius:20,
        backgroundColor:'white',
        padding:5,
        marginBottom: 15,
      },
      detailsLink: {
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
        marginTop: 16,
      },
    });

export default AddMedicines;