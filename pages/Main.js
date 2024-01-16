import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { getMedicines, getUserId } from '../api';
import { useTheme } from '@react-navigation/native';

const Main = ({ navigation }) => {
  const [medicines, setMedicines] = useState([]);
  const { colors } = useTheme();

  const fetchData = async () => {
    const userId = await getUserId();
    if (userId) {
      try {
        const medicinesData = await getMedicines(userId);
        setMedicines(medicinesData);
        console.log(medicinesData);
      } catch (error) {
        console.error('İlaçları getirirken bir hata oluştu:', error.message);
      }
    } else {
      console.error('Kullanıcı kimliği bulunamadı.');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>Main Screen</Text>
      <Text>{medicines.name}</Text>
    </View>
  );
};

export default Main;
