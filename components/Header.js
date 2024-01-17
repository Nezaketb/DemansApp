import React from 'react';
import {StyleSheet, View,Image,Text, TouchableOpacity,Alert} from 'react-native';
import { useTheme } from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

function Header() {
    const { colors } = useTheme();
    const navigation = useNavigation();

    return (
        <View style={[styles.container,{backgroundColor:colors.background}]}>
            {
                navigation.canGoBack() ?
                <TouchableOpacity style={{flex:0.1,justifyContent:'center',flexDirection:'column'}}
                    onPress={()=> navigation.goBack()}
                >
                    <Icon name='chevron-left' style={{marginLeft:10,color:colors.primary}}/>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{flex:0.1,justifyContent:'center',flexDirection:'column'}}
                    onPress={()=> 
                        Alert.alert('Çıkış', 'Oturumunuzu kapatmak istiyor musunuz?', [
                            {text: 'Evet', onPress: async () => {
                                const keys = await AsyncStorage.getAllKeys();
                                await AsyncStorage.multiRemove(keys);
                                navigation.navigate("Login");
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }],
                                });
                            }},
                            {
                              text: 'Hayır',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                          ])
                    }
                >
                    <Icon name='chevron-left' style={{marginLeft:10}}/>
                </TouchableOpacity>       
            }
            
            <View style={{flex:0.3,flexDirection:'column',justifyContent:'center'}}>
              
            </View>
            <View style={{flex:0.1}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 0.09,
        justifyContent: 'space-between',
        flexDirection:'row',
        borderBottomWidth:1,
        borderColor:'rgba(0, 0, 0, 0.1)'
    }
});

export default Header;