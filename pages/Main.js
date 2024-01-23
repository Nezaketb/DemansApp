import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {PermissionsAndroid,Platform} from 'react-native';

import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SentenceSlider from '../components/SentenceSlider';

const Main = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
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
        } else {
          console.log("Konum izni reddedildi");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const requestCoarseLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          {
            title: "Uygulama Konum İzni",
            message: "Bu uygulama konum iznine ihtiyaç duyuyor",
            buttonNeutral: "Daha Sonra Sor",
            buttonNegative: "İptal",
            buttonPositive: "Tamam"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Coarse konum izni verildi");
        } else {
          console.log("Coarse konum izni reddedildi");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();
    requestCoarseLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>HOŞGELDİNİZ</Text>
      <Carousel/>
      <SentenceSlider/>
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
