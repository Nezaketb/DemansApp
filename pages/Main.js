import React, { useEffect,useState } from 'react';
import { Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { getSentences } from '../api';

const Main = () => {

  const [text, setText] = useState('');
  const {colors}=useTheme();
  useEffect(() => {
    getSentences()
      .then(response => {
        if (response && response.data && response.data.length > 0 && response.data[0].text) {
          setText(response.data[0].text);
        } else {
          setText('API\'den geçerli bir isim alınamadı.');
        }
      })
      .catch(error => {
        setText('API isteği sırasında bir hata oluştu: ' + error.message);
      });
  }, []);

  return (
    <Text style={{ color: colors.primary}}>{text}</Text>
  );
};
export default Main;
