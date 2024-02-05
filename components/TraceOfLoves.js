import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { get3TraceOfLoves } from '../api';

const TraceOfLoves = () => {
  const [loves, setLoves] = useState([]);
  const {colors}=useTheme();
  useEffect(() => {
    const fetchtraceOfLoves = async () => {
        try {
          const lovesData = await get3TraceOfLoves();
          setLoves(lovesData.data);
          console.log(lovesData);
        } catch (error) {
          console.error('Get TarceOfLoves error:', error.message);
        }
      };

      fetchtraceOfLoves();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.primary,fontSize: 20,padding:5, textAlign: 'center' }}>
        Sevgi İzi Noktaları
      </Text>
      {loves.map((kisi) => (
        <TouchableOpacity key={kisi.id} style={styles.card}>
          <Text style={styles.kisiText}>{kisi.placeName}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop:-100,
    backgroundColor: '#f0f0f0',
    height:220
  },
  card: {
    backgroundColor: '#fff',
    padding: 5,
    marginBottom: 10,
    borderRadius: 8,
  },
  kisiText: {
    fontSize: 16,
    color:'#000000'
  },
});

export default TraceOfLoves;
