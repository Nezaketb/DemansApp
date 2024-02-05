import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const Footer = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToMain = () => {
    navigation.navigate('Main');
  };

  const navigateToUserProfie = () => {
    navigation.navigate('UserProfile');
  };


  const navigateToMedicines = () => {
    navigation.navigate('Medicines');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={navigateToMain}>
        <Icon name="home" style={{color:colors.primary}} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={navigateToMedicines}>
       <Icon name="file" style={{color:colors.primary}} size={30} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.tab} onPress={navigateToUserProfie}>
        <Icon name="user" style={{color:colors.primary}} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    bottom:10,
    left:20,
    right:20,
    borderRadius:20,
    height:'7%',
    backgroundColor: 'lightgray', 
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Footer;