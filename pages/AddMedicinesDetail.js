import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMedicines} from '../api';
import FooterCompanion from '../components/FooterCompanion';

const AddMedicinesDetail = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [usageDuration, setUsageduration] = useState('');
    const [usagePurpose, setUsagePurpose] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [afternoon, setAfternoon] = useState('');
    const [evening, setEvening] = useState('');
    const [moon, setMoon] = useState('');
    const [night, setNight] = useState('');
    const [moonTime, setMoonTime] = useState('');
    const [afternoonTime, setAfternoonTime] = useState('');
    const [eveningTime, setEveningTime] = useState('');
    const [nightTime, setNightTime] = useState('');
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);    
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    const showDatePicker = () => {
        setShowDate(true);
    };

    const showTimePicker = () => {
        setShowTime(true);
    };

    const updateSelectedDate = (selectedDate) => {
        const formattedDate = selectedDate.toLocaleDateString();
        setSelectedDate(formattedDate);
      };
    
      const updateSelectedTime = (selectedTime) => {
        const formattedTime = selectedTime.toLocaleTimeString();
        setSelectedTime(formattedTime);
      };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
        updateSelectedDate(currentDate);
        setStartDate(currentDate); 
      };
    
      const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowTime(Platform.OS === 'ios');
        setTime(currentTime);
        updateSelectedTime(currentTime);
      };

    const { colors } = useTheme();

    const handleAddMedicines = async () => {
        try {
          await addMedicines(name,  usageDuration, usagePurpose,startDate,  endDate, afternoon, evening, moon, moonTime,  afternoonTime, eveningTime,night, nightTime, userId);
          console.log("data")
        } catch (error) {
          console.error('Error in AddMedicines:', error);
        }
      };
      
    //   useEffect(() => {
    //     const { setStartDate, selectedDate } = route.params;
      
    //     console.log("setStartDate:", setStartDate);
    //     console.log("selectedDate:", selectedDate);
      
    //     const startDateFunction = setStartDate; 
    //     if (startDateFunction && selectedDate) {
    //       startDateFunction(selectedDate); 
    //     }
    // }, [route.params]);
    
    
      

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
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: colors.text
                    }}>
                        İlaç ekleyin
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color: colors.text
                    }}>İlaç adı</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection:'row'
                    }}>
                        <Icon name="envelope" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='İlaç adı'
                            value={name}
                            onChangeText={(text) => setName(text)}
                            placeholderTextColor={colors.text}
                            keyboardType='default'
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color:colors.text
                    }}>Kullanım amacı</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection:'row'
                    }}>
                        <Icon name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Kullanım amacı'
                            value={usagePurpose}
                            onChangeText={(text) => setUsagePurpose(text)}
                            placeholderTextColor={colors.text}
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />

                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color:colors.text
                    }}>Kullanım sıklığı</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection:'row'
                    }}>
                        <Icon name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Kullanım sıklığı'
                            value={usageDuration}
                            onChangeText={(text) => setUsageduration(text)}
                            placeholderTextColor={colors.text}
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />

                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                    fontSize: 16,
                    fontWeight: '400',
                    marginVertical: 8,
                    color: colors.text
                    }}>Bitiş Tarihi</Text>
                    <View style={{
                    width: "100%",
                    height: 48,
                    borderColor: colors.text,
                    borderWidth: 1,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 22,
                    flexDirection: 'row'
                    }}>
                    <TouchableOpacity onPress={showDatePicker}>
                        <Icon name="calendar" size={20} color="gray" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Tarih'
                        placeholderTextColor={colors.text}
                        keyboardType='number-pad'
                        value={selectedDate}
                        style={{
                        flex: 1,
                        color: colors.text
                        }}
                    />
                    </View>
                </View>

                {showDate && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                    />
                )}
                <Button
                  title="İlacı Kaydet"
                  loading={false}
                  onPress={handleAddMedicines}
                  buttonStyle={{
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                  containerStyle={{
                    height: 50,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                />
            </View>
            </ScrollView>
            <FooterCompanion/>
        </SafeAreaView>
    )
}

export default AddMedicinesDetail;