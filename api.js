import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const apiBaseUrl = 'http://192.168.1.9:5023/api/'; 

export const LoginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Users/Login`,
      {
        email: email,
        password: password,
      },
    );
    const userId = response.data;
    console.log("Id",userId);
    await AsyncStorage.setItem('userId', JSON.stringify(userId));
    console.error('Giriş başarılı:', response.data);
    return true;
  } catch (error) {
    console.error('Giriş başarısız:', error.message);
    throw error;
  }
};

export const getUserId = async () => {
  try {
    const userIdString = await AsyncStorage.getItem('userId');
    if (userIdString) {
      const userId = JSON.parse(userIdString);
      return userId;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Kullanıcı kimliği alınırken bir hata oluştu:', error);
    throw error;
  }
};

export const RegisterUser = async (email,userName,surname,phone, password) => {
  try {
    const response = await axios.post(
      `${apiBaseUrl}Users/Register`,
      {
        email: email,
        userName:userName,
        surname:surname,
        phone:phone,
        password: password,
      },
    );

    console.error('Kayıt başarılı:', response.data);
    return true;
  } catch (error) {
    console.error('Kayıt başarısız:', error.message);
    throw error;
  }
};

export const getSentences = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}MotivationSentences/getAllSentences`);
    console.log('API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const getMedicines = async (userId) => {
  try {
    const response = await axios.get(`${apiBaseUrl}Medicines/getMedicines/${userId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Get medicines error:', error.message);
    throw error;
  }
};