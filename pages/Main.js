import React, { useEffect } from 'react';
import { Text } from 'react-native';
import axios from 'axios';

const Main = () => {
  useEffect(() => {
    const getSentences = async () => {
        try {
          const response = await axios.get('http://192.168.1.9:5023/api/MotivationSentences/getAllSentences');
          console.log('API Response:', response.data);
          return response.data;
        } catch (error) {
          console.error('API Error:', error);
          throw error;
        }
      };    
      getSentences();
  }, []); 

  return (
      <Text>Main Sayfası</Text>
  );
};

export default Main;
