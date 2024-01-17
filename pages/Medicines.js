import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getMedicines } from '../api';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Medicines = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const { colors } = useTheme();

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
      <Text style={styles.header}>İlaç Listesi</Text>
      <FlatList
        data={medicines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>İlaç Adı: {item.name}</Text>
            <Text style={styles.itemText}>Başlangıç Tarihi: {item.startDate}</Text>
            <Text style={styles.itemText}>Bitiş Tarihi: {item.endDate}</Text>
          </View>
        )}
      />
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
    textAlign:'center',
    padding:10,
    marginBottom: 16,
  },
  itemContainer: {
    backgroundColor: '#e0e0e0', 
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    color: 'black', 
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Medicines;
