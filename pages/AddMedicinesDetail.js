import { View, Text, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState,useEffect } from 'react'
import { useTheme } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMedicines} from '../api';
import FooterCompanion from '../components/FooterCompanion';
import Header from '../components/Header';

const AddMedicinesDetail = ({ route, navigation }) => {
    const { colors } = useTheme();
    const [name, setName] = useState('');
    const [usageDuration, setUsageduration] = useState('');
    const [usagePurpose, setUsagePurpose] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [afternoon, setAfternoon] = useState(false);
    const [evening, setEvening] = useState(false);
    const [moon, setMoon] = useState(false);
    const [night, setNight] = useState(false);
    const [moonTime, setMoonTime] = useState('');
    const [afternoonTime, setAfternoonTime] = useState('');
    const [eveningTime, setEveningTime] = useState('');
    const [nightTime, setNightTime] = useState('');
    const [selectedAfternoonTime, setSelectedAfternoonTime] = useState('');
    const [selectedEveningTime, setSelectedEveningTime] = useState('');
    const [selectedNightTime, setSelectedNightTime] = useState('');
    const [selectedMoonTime, setSelectedMoonTime] = useState('');
    const [showAfternoonTimePicker, setShowAfternoonTimePicker] = useState(false);
    const [showEveningTimePicker, setShowEveningTimePicker] = useState(false);
    const [showNightTimePicker, setShowNightTimePicker] = useState(false);
    const [showMoonTimePicker, setShowMoonTimePicker] = useState(false);
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    
 
  const openStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const openEndDatePicker = () => {
    setShowEndDatePicker(true);
  };

  const updateSelectedDate = (selectedDate, dateType) => {
    const formattedDate = selectedDate.toLocaleDateString();
    if (dateType === 'start') {
      setShowStartDatePicker(false);
      setSelectedStartDate(formattedDate);
      setStartDate(selectedDate);
    } else if (dateType === 'end') {
      setShowEndDatePicker(false);
      setSelectedEndDate(formattedDate);
      setEndDate(selectedDate);
    }
  };
  

  const onChangeStartDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowStartDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    updateSelectedDate(currentDate, 'start');
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowEndDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    updateSelectedDate(currentDate, 'end');
    setEndDate(currentDate);
  };
  const onChangeAfternoonTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowAfternoonTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    updateSelectedTime(currentTime, 'afternoon');
    };

    const onChangeEveningTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setShowEveningTimePicker(Platform.OS === 'ios');
        setTime(currentTime);
        updateSelectedTime(currentTime, 'evening');
    };

    const onChangeNightTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowNightTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
    updateSelectedTime(currentTime, 'night');
    };

    const onChangeMoonTime = (event, selectedTime) => {
      const currentTime = selectedTime || time;
      setShowMoonTimePicker(Platform.OS === 'ios');
      setTime(currentTime);
      updateSelectedTime(currentTime, 'moon');
    };

    const updateSelectedTime = (selectedTime, timeType) => {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;      
      switch (timeType) {
            case 'afternoon':
                setSelectedAfternoonTime(formattedTime);
                setAfternoonTime(formattedTime);
                break;
            case 'evening':
                setSelectedEveningTime(formattedTime);
                setEveningTime(formattedTime);
                break;
            case 'night':
                setSelectedNightTime(formattedTime);
                setNightTime(formattedTime);
                break;
            case 'moon':
                setSelectedMoonTime(formattedTime);
                setMoonTime(formattedTime);
                break;
            default:
                break;
        }
    };


    const handleAddMedicines = async () => {
        try {
          await addMedicines(name,  usageDuration, usagePurpose,startDate,  endDate, afternoon, evening, moon, moonTime,  afternoonTime, eveningTime,night, nightTime, userId);
          console.log("data");
          console.log('Data to be sent:', {
            name,
            usageDuration,
            usagePurpose,
            startDate,
            endDate,
            afternoon,
            evening,
            moon,
            moonTime,
            afternoonTime,
            eveningTime,
            night,
            nightTime,
            userId,
          });
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
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                marginVertical: 8,
                color: colors.text,
              }}
            >
              Başlangıç Tarihi
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: colors.text,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity onPress={openStartDatePicker}>
                <Icon name="calendar" size={20} color="gray" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                placeholder="Tarih"
                placeholderTextColor={colors.text}
                keyboardType="number-pad"
                value={selectedStartDate}
                style={{
                  flex: 1,
                  color: colors.text,
                }}
              />
            </View>
          </View>

          {showStartDatePicker && (
            <DateTimePicker
              testID="dateTimePickerStartDate"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeStartDate}
            />
          )}

          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                marginVertical: 8,
                color: colors.text,
              }}
            >
              Bitiş Tarihi
            </Text>
            <View
              style={{
                width: '100%',
                height: 48,
                borderColor: colors.text,
                borderWidth: 1,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
                paddingLeft: 22,
                flexDirection: 'row',
              }}
            >
              <TouchableOpacity onPress={openEndDatePicker}>
                <Icon name="calendar" size={20} color="gray" style={{ marginRight: 10 }} />
              </TouchableOpacity>
              <TextInput
                placeholder="Tarih"
                placeholderTextColor={colors.text}
                keyboardType="number-pad"
                value={selectedEndDate}
                style={{
                  flex: 1,
                  color: colors.text,
                }}
              />
            </View>
          </View>

          {showEndDatePicker && (
            <DateTimePicker
              testID="dateTimePickerEndDate"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeEndDate}
            />
          )}
    
        <Text style={{color:colors.primary}}>Moon</Text>
        <CheckBox
        disabled={false}
        value={moon}
        onValueChange={(value) => setMoon(value)}
      />

      <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8,
                            color: colors.text
                        }}>Sabah</Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.text,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 15,
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => setShowMoonTimePicker(true)}>
                                <Icon name="clock-o" size={20} color="gray" style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Saati'
                                placeholderTextColor={colors.text}
                                keyboardType='number-pad'
                                value={selectedMoonTime}
                                style={{
                                    flex: 1,
                                    color: colors.text
                                }}
                            />
                        </View>
                    </View>

                    {showMoonTimePicker && (
                        <DateTimePicker
                            testID="dateTimePickerMoonTime"
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeMoonTime}
                        />
                    )}

        <Text style={{color:colors.primary}}>Öğlen</Text>
          <CheckBox
        disabled={false}
        value={afternoon}
        onValueChange={(value) => setAfternoon(value)}
      />
      <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8,
                            color: colors.text
                        }}>Öğleden Sonra Saati</Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.text,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 15,
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => setShowAfternoonTimePicker(true)}>
                                <Icon name="clock-o" size={20} color="gray" style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Saati'
                                placeholderTextColor={colors.text}
                                keyboardType='number-pad'
                                value={selectedAfternoonTime}
                                style={{
                                    flex: 1,
                                    color: colors.text
                                }}
                            />
                        </View>
                    </View>

                    {showAfternoonTimePicker && (
                        <DateTimePicker
                            testID="dateTimePickerAfternoonTime"
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeAfternoonTime}
                        />
                    )}

        <Text style={{color:colors.primary}}>Akşam</Text>
        <CheckBox
        disabled={false}
        value={evening}
        onValueChange={(value) => setEvening(value)}
      />
      <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8,
                            color: colors.text
                        }}>Akşam Saati</Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.text,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 15,
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => setShowEveningTimePicker(true)}>
                                <Icon name="clock-o" size={20} color="gray" style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Saati'
                                placeholderTextColor={colors.text}
                                keyboardType='number-pad'
                                value={selectedEveningTime}
                                style={{
                                    flex: 1,
                                    color: colors.text
                                }}
                            />
                        </View>
                    </View>

                    {showEveningTimePicker && (
                        <DateTimePicker
                            testID="dateTimePickerEveningTime"
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeEveningTime}
                        />
                    )}
     
      <CheckBox
        disabled={false}
        value={night}
        onTintColor='#FF9900'
        onCheckColor='#FF9900'
        onValueChange={(value) => setNight(value)}
      />
      <Text style={{color:colors.primary}}>Gece</Text>

       <View style={{ marginBottom: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginVertical: 8,
                            color: colors.text
                        }}>Gece</Text>
                        <View style={{
                            width: "100%",
                            height: 48,
                            borderColor: colors.text,
                            borderWidth: 1,
                            borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingLeft: 15,
                            flexDirection: 'row'
                        }}>
                            <TouchableOpacity onPress={() => setShowNightTimePicker(true)}>
                                <Icon name="clock-o" size={20} color="gray" style={{ marginRight: 10 }} />
                            </TouchableOpacity>
                            <TextInput
                                placeholder='Saati'
                                placeholderTextColor={colors.text}
                                keyboardType='number-pad'
                                value={selectedNightTime}
                                style={{
                                    flex: 1,
                                    color: colors.text
                                }}
                            />
                        </View>
                    </View>

                    {showNightTimePicker && (
                        <DateTimePicker
                            testID="dateTimePickerNightTime"
                            value={time}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeNightTime}
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
                <View style={{padding:30}}></View>
            </View>
            </ScrollView>
            <FooterCompanion/>
        </SafeAreaView>
    )
}

export default AddMedicinesDetail;