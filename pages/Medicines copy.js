import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView,PermissionsAndroid,Platform,Button } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMedicines ,medicineControl} from '../api';
import Footer from '../components/Footer';
import notifee from '@notifee/react-native';

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
  dayNames: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
  dayNamesShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
};

LocaleConfig.defaultLocale = 'tr';

const Medicines = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const { colors } = useTheme();
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDayMedicines, setSelectedDayMedicines] = useState([]);

  const ondisplayNotification = async () => {
  try{
    await notifee.createChannel({
      id:"general",
      name:"General",
    });
    await notifee.displayNotification({
      title:"hello",
      body:"world"
    });
    console.log("Bildirim")
  }
  catch
  {
    console.log("bİLDİRİM HATASI");
  }
  }
  const sendNotification = async () => {
    try {
      await notifee.displayNotification({
        title: 'Başlık',
        body: 'Bildirim içeriği',
        android: {
          channelId: 'default', 
        },
      });
      console.log('Bildirim gönderildi.');
    } catch (error) {
      console.error('Bildirim gönderme hatası:', error);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDay(day.dateString);
    const currentDate = new Date(day.dateString);
    currentDate.setDate(currentDate.getDate());

    const dayMedicines = medicines.filter((medicine) => {
      const startDate = new Date(medicine.startDate);
      const endDate = new Date(medicine.endDate);
      return currentDate >= startDate && currentDate <= endDate;
    });
    setSelectedDayMedicines(dayMedicines);
  };

  const fetchMedicines = async () => {
    try {
      const medicinesData = await getMedicines(userId);
      const medicines = medicinesData.data;
      setMedicines(medicines);
    } catch (error) {
      console.error('Get medicines error:', error.message);
    }
  };

  const fetchApi = async () => {
    try {
      const medicinesData = await medicineControl(userId);
      const medicines = medicinesData.data;
      console.log(medicines.status);
      if (medicinesData.data.status == false) {
        sendNotification();
      }
      setMedicines(medicines);
    } catch (error) {
      console.error('Get medicines control error:', error.message);
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
    sendNotification();
   }, []);
   
  useEffect(() => {
    const intervalId = setInterval(fetchApi, 40000);
    return () => clearInterval(intervalId);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchMedicines();
    }
  }, [userId]);


  return (
    <View style={styles.container}>
     <Button
                  title="Refakatçi Ekle"
                  loading={false}
                  onPress={ondisplayNotification}
                    buttonStyle={{
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                  containerStyle={{
                    height: 50,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                />
      <Text style={styles.header}>İlaçlarım</Text>
      <Calendar
        style={styles.calendar}
        markedDates={{
          [selectedDay]: { selected: true, marked: true, selectedColor: colors.primary },
        }}
        onDayPress={handleDayPress}
      />
      <ScrollView>
        <View style={styles.medicinesList}>
          {selectedDayMedicines.map((item, index) => (
            <View key={index} style={styles.medicineItem}>
              <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                <>
                  <Icon name="medkit" size={20} color={colors.primary} />
                  <Text style={{ color: colors.text, marginLeft: 5, fontWeight: '500', fontSize: 20 }}>{item.name}</Text>
                </>
              </View>
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Sabah: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.moonTime}</Text></Text>
                <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Öğle: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.afternoonTime}</Text></Text>
                <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Akşam: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.eveningTime}</Text></Text>
                <Text style={{ color: colors.primary, marginLeft: 5, fontWeight: 'bold' }}>Gece: <Text style={{ fontWeight: 'normal', color: colors.text }}>{item.nightTime}</Text></Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{padding:25}}></View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f8ff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    padding: 10,
    marginBottom: 16,
  },
  calendar: {
    marginBottom: 16,
  },
  medicinesList: {
    marginTop: 16,
  },
  medicineItem: {
    flexDirection: 'row',
    borderRadius:20,
    backgroundColor:'white',
    padding:5,
    marginBottom: 15,
  },
});

export default Medicines;
