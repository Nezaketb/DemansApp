import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import Header from '../components/Header';
import Footer from '../components/Footer';

const EditMedicinesInformation = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [editing, setEditing] = useState(true); 
  const { colors } = useTheme();
  const [buttonText, setButtonText] = useState('Düzenle'); 

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(Platform.OS === 'ios');
    setDate(currentDate);
    updateSelectedDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(Platform.OS === 'ios');
    setTime(currentTime);
    updateSelectedTime(currentTime);
  };

  const showDatePicker = () => {
    if (!editing) {
      setShowDate(true);
    }
  };

  const showTimePicker = () => {
    if (!editing) {
      setShowTime(true);
    }
  };

  const updateSelectedDate = (selectedDate) => {
    const formattedDate = selectedDate.toLocaleDateString();
    setSelectedDate(formattedDate);
  };

  const updateSelectedTime = (selectedTime) => {
    const formattedTime = selectedTime.toLocaleTimeString();
    setSelectedTime(formattedTime);
  };

  const handleSavePress = () => {
    setEditing(!editing);
    setButtonText(editing ? 'Kaydet' : 'Düzenle');
  };

  return (
    <View style={{ flex: 1 }}>
    <Header/>
    <View style={{padding:10}}>
    <Text style={{ color: colors.primary, ...styles.text }}>Davet Bilgileri</Text>
      <View style={{ marginBottom: 12 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '400',
          marginVertical: 8,
          color: colors.text
        }}>Davet Tarihi</Text>
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
            editable={false}
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

      <View style={{ marginBottom: 12 }}>
        <Text style={{
          fontSize: 16,
          fontWeight: '400',
          marginVertical: 8,
          color: colors.text
        }}>Davet Saati</Text>

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
          <TouchableOpacity onPress={showTimePicker}>
            <Icon name="clock-o" size={20} color="gray" style={{ marginRight: 10 }} />
          </TouchableOpacity>
          <TextInput
            placeholder='Saat'
            placeholderTextColor={colors.text}
            keyboardType='number-pad'
            editable={false}
            value={selectedTime}
            style={{
              flex: 1,
              color: colors.text
            }}
          />
        </View>
      </View>

      {showTime && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}

<View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color: colors.text
                    }}>Davet Adresi</Text>

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
                        <Icon name="map" size={20} color="gray" style={{ marginRight: 10,marginLeft:40 }} />
                        <TextInput
                            placeholder='Adres'
                            placeholderTextColor={colors.text}
                            keyboardType='default'
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />
                    </View>
                </View>

      <Button
        title={buttonText}
        onPress={handleSavePress}
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
    <Footer/>
</View>    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 10,
  },
  text: {
    fontSize:20,
    padding:5,
    textAlign:'center'
  }
});

export default EditMedicinesInformation;
