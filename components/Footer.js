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

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const navigateToMedicines = () => {
    navigation.navigate('Medicines');
  };

  const navigateToInviteInformation = () => {
    navigation.navigate('AddMedicines');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={navigateToMain}>
        <Icon name="home" style={{color:colors.primary}} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={navigateToMedicines}>
       <Icon name="file" style={{color:colors.primary}} size={30} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.tab1} onPress={navigateToMedicines}>
       <Icon name="plus-circle" style={{color:colors.primary}} size={50} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={navigateToMedicines}>
       <Icon name="calendar" style={{color:colors.primary}} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={navigateToMedicines}>
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
  tab1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom:'6%',
  }
});

export default Footer;