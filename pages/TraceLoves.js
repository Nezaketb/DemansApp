import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../components/Header';
import { getTraceOfLoves } from '../api';

const TraceLoves = () => {
  const [loves, setLovesData] = useState([]);
  const { colors } = useTheme();

  useEffect(() => {
    const fetchtraceOfLoves = async () => {
        try {
          const lovesData = await getTraceOfLoves();
          setLovesData(lovesData.data);
          console.log(lovesData);
        } catch (error) {
          console.error('Get TarceOfLoves error:', error.message);
        }
      };

      fetchtraceOfLoves();
  }, []);

  return (
    <View style={styles.container}>
    <Header/>
      <Text style={{ color: colors.primary, fontSize: 30,textAlign:'center', marginVertical: 15 }}>Sevgi İzi Noktaları</Text>

      {loves.length === 0 ? (
        <Text style={{ color: colors.text }}>Veriler yükleniyor...</Text>
      ) : (
        <FlatList
          data={loves}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.placeName}</Text>
              <Text style={styles.addrestext}>{item.adress}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'lightgray',
    width: '100%',
  },
  itemText: {
    fontSize: 18,
    fontWeight:'bold',
    color: 'black',
  },
  addrestext: {
    fontSize: 15,
    color: 'black',
  },
});

export default TraceLoves;
