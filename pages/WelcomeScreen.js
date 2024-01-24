import React from 'react';
import { StyleSheet, View, Text, Pressable, Image,Dimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';

const WelcomeScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

  const styles = StyleSheet.create({
    frame: {
      position: 'absolute',
      width: windowWidth * 0.25,
      top: windowHeight * 0.01,
      right: windowWidth * 0.001,
      zIndex: 999,
    },
    centeredText: {
     flex: 1,
     marginTop: windowHeight * 0.40, 
    },
    horizontalLine: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: windowWidth * 0.02,
      padding: windowWidth * 0.02,
    },
    line: {
      flex: 1,
      height: 3,
      backgroundColor: colors.primary,
      marginHorizontal: windowWidth * 0.01,
    },
    columnContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginVertical: windowHeight * 0.03,
    },
    columnItem: {
      flexDirection: "column",
      justifyContent: "center",
      marginVertical: windowHeight * 0.03,
    },
    columnText: {
      fontSize: windowWidth * 0.045,
      color: colors.text,
      textAlign: 'center',
    },
    linkText: {
      fontSize: windowWidth * 0.05,
      color: colors.primary,
      fontWeight: '900',
      textAlign: 'center',
      marginLeft: windowWidth * 0.01,
    },
    backgroundImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray }}>
            <Image
            source={require('../assets/logo.png')}
        style={[styles.backgroundImage, { opacity: 0.6 }]} 
      />
      
      <View style={styles.centeredText}>
        <View style={styles.horizontalLine}>
          <View style={styles.line}></View>
          <Text style={{ fontSize: windowWidth * 0.1, fontWeight:'bold', color: colors.primary}}>HOŞGELDİNİZ</Text>
          <View style={styles.line}></View>
        </View>
        <View style={styles.columnContainer}>
          <View style={styles.columnItem}>
            <Text style={styles.columnText}>Kayıt olun ve hayatınızı kolaylaştırın</Text>
            <Pressable
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.linkText}>KAYIT OL</Text>
            </Pressable>
          </View>
          <View style={styles.columnItem}>
            <Text style={styles.columnText}>Refakatçi girişi</Text>
            <Pressable
              onPress={() => navigation.navigate("LoginCompanion")}
            >
              <Text style={styles.linkText}>GİRİŞ YAP</Text>
            </Pressable>
          </View>
          <View style={styles.columnItem}>
            <Text style={styles.columnText}>Kullanıcı girişi</Text>
            <Pressable
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.linkText}>GİRİŞ YAP</Text>
            </Pressable>
          </View>
          
        </View>
      </View>
      </View>
  );
};

export default WelcomeScreen;