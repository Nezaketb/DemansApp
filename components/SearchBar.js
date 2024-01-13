import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';

const SearchBar = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.frame}>
    <View style={styles.container}>
      <TextInput
        placeholder='Metni girin'
        placeholderTextColor={colors.gray}
        style={styles.input}
      />
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search" style={styles.icon} size={25} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  frame: {
    padding:8,
  },
  container: {
    height:55,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderRadius: 22,
    overflow:'hidden'
  },
  input: {
    flex: 1,
    marginLeft: 10,
    marginTop: 5,
    color:'gray'
  },
  searchButton: {
    height: 60,
    width: 40,
    borderWidth: 1,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    borderColor: '#C0C0C0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: '#C0C0C0',
  },
});

export default SearchBar;
