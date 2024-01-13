import axios from 'axios';

const apiBaseUrl = 'http://192.168.1.9:5023/api/'; 

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
