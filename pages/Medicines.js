import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getMedicines } from '../api';
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
    console.log(day.dateString);
  
    const currentDate = new Date(day.dateString);
    currentDate.setDate(currentDate.getDate());
  
    const dayMedicines = medicines.filter(medicine => {
      const startDate = new Date(medicine.startDate);
      const endDate = new Date(medicine.endDate);
      
      return currentDate >= startDate && currentDate <= endDate;
    });
  
    setSelectedDayMedicines(dayMedicines);
  };
  
  const fetchMedicines = async () => {
    try {
      const medicinesData = await getMedicines(userId);
      const medicines=medicinesData.data;
      setMedicines(medicines);
      scheduleNotifications(medicines);
    } catch (error) {
      console.error('Get medicines error:', error.message);
    }
  };

  const scheduleNotifications = (medicines) => {
    console.log('Bildirimler planlanıyor...');
  
    // Tüm ilaçların kullanılması gereken saatleri bir diziye topla
    const notificationTimes = [];
  
    medicines.forEach(medicine => {
      const { startDate, endDate, afternoonTime, eveningTime, nightTime, moonTime, name } = medicine;
      const startDateTime = new Date(startDate);
      const endDateTime = new Date(endDate);
  
      for (let time = new Date(startDateTime); time <= endDateTime; time.setDate(time.getDate() + 1)) {
        // İlaç için kullanılacak günün gününü al
        const dayOfWeek = time.getDay();
  
        // İlaç için uygun olan saat dilimini belirle
        let notificationTime;
  
        switch (dayOfWeek) {
          case 0: // Pazar
            notificationTime = moonTime;
            break;
          case 1: // Pazartesi
          case 2: // Salı
          case 3: // Çarşamba
            notificationTime = afternoonTime;
            break;
          case 4: // Perşembe
            notificationTime = eveningTime;
            break;
          case 5: // Cuma
            notificationTime = nightTime;
            break;
          case 6: // Cumartesi
            notificationTime = moonTime;
            break;
          default:
            break;
        }
  
        // Bildirim saati için zamanı ayarla ve diziye ekle
        const [hours, minutes] = notificationTime.split(':');
        const notificationDateTime = new Date(time);
        notificationDateTime.setHours(parseInt(hours));
        notificationDateTime.setMinutes(parseInt(minutes));
        notificationTimes.push({ dateTime: notificationDateTime, name });
      }
    });
  
    // Toplanan bildirim zamanları üzerinde döngü yaparak bildirimleri planla
    notificationTimes.forEach(({ dateTime, name }) => {
      console.log('Planlanan Bildirim Zamanı:', dateTime);
      scheduleNotification(dateTime, name); // 'name' değişkenini burada tanımlamanız gerekebilir
    });
  };
  
  

  const scheduleNotification = (notificationTime, medicineName) => {
    console.log(medicineName);
    notifee.displayNotification({
      title: 'İlaç Kullanma Zamanı!',
      body: `${medicineName} ilacınızı kullanma zamanı geldi.`,
      android: {
        channelId: 'default',
      },
      schedule: {
        at: notificationTime.getTime(),
      },
    });
    console.log('Bildirim gönderildi:', medicineName);
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

  useEffect(() => {
   sendNotification();
  }, []);

  return (
    <View style={styles.container}>
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
  detailsLink: {
    color: 'blue',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Medicines;
