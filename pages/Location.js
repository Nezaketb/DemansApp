import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FooterCompanion from '../components/FooterCompanion';

const Location = ({ navigation }) => {
  const [location, setLocation] = useState(null);  
  const {colors}=useTheme();
  
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Uygulama Konum İzni',
            message: 'Bu uygulama konum iznine ihtiyaç duyuyor',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'İptal',
            buttonPositive: 'Tamam',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Konum izni verildi');
          return true; // İzin verildiyse true döner
        } else {
          console.log('Konum izni reddedildi');
          return false; // İzin reddedildiyse false döner
        }
      } catch (err) {
        console.warn(err);
        return false; // Hata oluştuysa false döner
      }
    }
    return true; // Android dışındaki platformlarda true döner
  };

  const getLocation = async () => {
    const permissionGranted = await requestLocationPermission();

    if (permissionGranted) {
      Geolocation.getCurrentPosition(
        position => {
          console.log(position);
          setLocation(position);
        },
        error => {
          console.log(error.code, error.message);
          setLocation(null); // Hata durumunda location'ı null yap
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      console.log('Konum izni verilmedi');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hoş geldiniz!</Text>
      {location && location.coords && ( // location ve location.coords var mı kontrolü
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Konumunuz"
            description="Buradasınız"
          />
        </MapView>
      )}
      <Button title="Konumu Al" onPress={getLocation} />
      <Text style={{ color: colors.text }}>
        Enlem: {location && location.coords ? location.coords.latitude : null}
      </Text>
      <Text style={{ color: colors.text }}>
        Boylam: {location && location.coords ? location.coords.longitude : null}
      </Text>
      <FooterCompanion/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map:{
    width:'100%',
    height:'100%'
  }
});

export default Location;
