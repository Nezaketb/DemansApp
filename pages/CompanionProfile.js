import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getAllUsers } from '../api';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CompanionProfile = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState({});

  const { colors } = useTheme();

  const fetchProfile = async () => {
    try {
      const profileData = await getAllUsers(userId);
     // ID'si 1006 olan kullanıcıyı filtrele
  const targetUser = profileData.data.find(user => user.id === userId);

  if (targetUser) {
    const filteredProfile = {
   
      email: targetUser.email,
      userName:targetUser.userName,
      surname: targetUser.surname,
      phone:targetUser.phone,
      emergencyPhone:targetUser.emergencyPhone,
      sex:targetUser.sex
    };

    setProfile(targetUser);

    console.log(profile);
  } else {
    console.log('User not found');
  }
} catch (error) {
  console.error('Get profile error:', error.message);
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
        fetchProfile();
    }
  }, [userId]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      navigation.replace('Login'); 
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Profil Bilgileri</Text>
      <View style={styles.profileContainer}>
        <FlatList
          data={[profile]}
          keyExtractor={(item) => (item.id ? item.id.toString() : null)}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <InfoRow label="Ad Soyad" value={`${item.userName} ${item.surname}`} />
              <InfoRow label="Cinsiyet" value={item.sex ? 'Kadın' : 'Erkek'} />
              <InfoRow label="Telefon" value={item.phone} />
              <InfoRow label="E-posta" value={item.email} />
              <InfoRow label="Acil Durum Telefon" value={item.emergencyPhone} />
            </View>
         
          )}
        />
        <TouchableOpacity onPress={handleLogout} style={styles.outContainer}>
        <Text style={styles.out}>ÇIKIŞ YAP</Text>
      </TouchableOpacity>
      </View>
      <Footer />
    </View>
  );
          }
  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
  
  const styles = StyleSheet.create({
    profileContainer: {
      flex: 1,
      backgroundColor: '#FF7F00',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      overflow: 'hidden',
    },
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      padding: 15,
      fontFamily: 'Your-Regular-Font-Family',
    },
    itemContainer: {
      padding: 16,
      borderRadius: 10,
      margin:10,
      marginBottom:0,
      backgroundColor:'white',
      borderWidth: 1,
      borderColor: '#e0e0e0', // Açık gri çizgi rengi
    },
    out:{
        textAlign: 'center',
        margin:10,
        color:'black'
    },
    outContainer: {
        textAlign: 'center',
        height:50,
        borderRadius: 10,
        margin:10,
        marginBottom:200,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#e0e0e0', // Açık gri çizgi rengi
      },
    infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    label: {
      flex: 3,
      fontSize:12,
      color: 'black',
    },
   
    value: {
      flex: 2,
      color: 'black',
      fontWeight:'400',
      fontSize: 12,
    },
  });
  

export default CompanionProfile;
