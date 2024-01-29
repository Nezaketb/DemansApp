import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { addLocation } from '../api';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SentenceSlider from '../components/SentenceSlider';

const Main = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [location, setLocation] = useState(null);
  const { colors } = useTheme();

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Uygulama Konum İzni",
            message: "Bu uygulama konum iznine ihtiyaç duyuyor",
            buttonNeutral: "Daha Sonra Sor",
            buttonNegative: "İptal",
            buttonPositive: "Tamam"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Konum izni verildi");
          getLocation(); 
        } else {
          console.log("Konum izni reddedildi");
          Alert.alert("Uyarı", "Konum izni reddedildi. Bazı özellikler kullanılamayabilir.");
        }
      } catch (err) {
        console.warn(err);
      }
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

 
  const handleLocation = async (location) => {
    if (location && location.coords) {
      const { latitude, longitude } = location.coords;
      //console.log('Location:', latitude,longitude);

      try {
        await addLocation(longitude, latitude, userId);
        console.log('Konum bilgisi başarıyla kaydedildi.');
      } catch (error) {
        console.error('Konum bilgisi kaydetme hatası:', error.message);
      }
    } else {
      console.warn('Geçersiz konum bilgisi:', location);
    }
  };

  useEffect(() => {
    if (userId && location) {
      handleLocation(location);
    }
  }, [userId, location]);
  


  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log("Konum bilgisi alındı:", position);
        setLocation(position);
      },
      error => {
        console.log("Konum bilgisi alınamadı:", error.code, error.message);
        setLocation(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>HOŞGELDİNİZ</Text>
      <Carousel />
      <SentenceSlider />
      <Text style={{ color: colors.primary, bottom: 220, fontSize: 20, textAlign: 'center' }}>
        Yaklaşan İlaçlarım
      </Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    marginBottom: 16,
  },
});

export default Main;
