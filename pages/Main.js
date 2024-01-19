import React, { useEffect, useState ,useRef} from 'react';
import { View, Text, FlatList, StyleSheet,Image } from 'react-native';
import { getMedicines, getPictures, getSentences } from '../api';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SentenceSlider from '../components/SentenceSlider';

const Main = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Header/>
      <Text style={styles.header}>HOŞGELDİNİZ</Text>
      <Carousel/>
      <SentenceSlider/>
      <Text style={{color:colors.primary,bottom:220,fontSize:20,textAlign:'center'}}>Yaklaşan İlaçlarım</Text>
      <Footer/>
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
    textAlign:'center'
  },
  itemContainer: {
    width: 300, 
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
 
});

export default Main;