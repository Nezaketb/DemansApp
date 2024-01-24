import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const FooterCompanion = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const navigateToMain = () => {
    navigation.navigate('MainCompanion');
  };

  const navigateToUserProfie = () => {
    navigation.navigate('AddMedicinesDetail');
  };

  const navigateToMedicines = () => {
    navigation.navigate('AddMedicines');
  };

  const navigateToPicture = () => {
    navigation.navigate('AddPictures');
  };

  const navigateToLocation = () => {
    navigation.navigate('Location');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={navigateToMain}>
        <Icon name="home" style={{color:colors.primary}} size={30} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.tab} onPress={navigateToMedicines}>
       <Icon name="calendar" style={{color:colors.primary}} size={30} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.tab} onPress={navigateToLocation}>
       <Icon name="map" style={{color:colors.primary}} size={30} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.tab} onPress={navigateToPicture}>
       <Icon name="image" style={{color:colors.primary}} size={30} />
      </TouchableOpacity> 
      <TouchableOpacity style={styles.tab} onPress={navigateToUserProfie}>
        <Icon name="plus" style={{color:colors.primary}} size={30} />
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

export default FooterCompanion;