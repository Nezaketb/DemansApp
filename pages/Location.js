import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useState,useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocation } from '../api';
import FooterCompanion from '../components/FooterCompanion';

const Location = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [location, setLocation] = useState(null);  
  const {colors}=useTheme();
  


  const getlocation = async () => {
    try {
      const locationData = await getLocation(userId);
      setLocation({
        coords: {
          latitude: locationData.data.lat, 
          longitude: locationData.data.lng, 
        },
      });
      console.log(locationData);
    } catch (error) {
      console.error('Get location error:', error.message);
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
      getlocation();
    }
  }, [userId]);

  return (
    <View style={styles.container}>
      {location && location.coords && ( 
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.coords.longitude,
            longitude: location.coords.latitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.001,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.longitude,
              longitude: location.coords.latitude,
            }}
            title="Konumunuz"
            description="Buradasınız"
          />
        </MapView>
      )}
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
