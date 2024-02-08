import notifee from '@notifee/react-native';
import { getMedicines } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

export const checkMedicineSchedule = async () => {
    try {
      // API'den ilaçları al
      const medicines = await fetchMedicinesFromAPI();
      const now = new Date();
  
      medicines.forEach(medicine => {
        const { startDate, endDate, morningTime, eveningTime, afternoonTime, nightTime } = medicine;
        
        // Check if the current date is within the medicine's start and end date
        if (now >= new Date(startDate) && now <= new Date(endDate)) {
          const times = [morningTime, eveningTime, afternoonTime, nightTime];
          
          // Check if any of the medicine's times are approaching
          times.forEach(time => {
            const timeDate = new Date(time);
            const timeDifference = timeDate.getTime() - now.getTime();
            
            if (timeDifference > 0 && timeDifference <= (2 * 60 * 1000)) { // 30 minutes before
              scheduleNotification(timeDate," Time to take");
            }
          });
        }
      });
    } catch (error) {
      console.error('Error fetching medicines:', error);
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
  
  const fetchMedicinesFromAPI = async () => {
    // API'den ilaçları almak için gerekli kodu buraya ekleyin
    // Örnek olarak, bir API'den ilaçları çekme işlemi
    const response = await getMedicines(userId);
    const data = await response.json();
    return data.medicines;
  };
  
  const scheduleNotification = (date, message) => {
    notifee.displayNotification({
      message: message,
      date: date,
    });
  };