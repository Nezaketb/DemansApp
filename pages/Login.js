import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginUser,getCompanionById } from '../api';

const Login = ({ navigation }) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { colors } = useTheme();

    const handleLogin = async () => {
        try {
          const response = await LoginUser(email, password);
      
          if (response && response.userId !== null && response.userId !== undefined) {
            console.log("Giriş başarılı. userId:", response.userId);
      
            await AsyncStorage.setItem('userId', JSON.stringify(response.userId ));
      
            const companion = await getCompanionById(response.userId);

            if (companion) {
                console.log("Kullanıcıya ait companion bilgileri:", companion);
                navigation.navigate('Main');
                if (companion.data.length === 0) {
                  console.log("Kullanıcının companion bilgisi bulunamadı.");
                  navigation.navigate('AddCompanion');
                } else {
                  console.log('nothing');
                }
              } else {
                console.log("Kullanıcının companion bilgisi bulunamadı.");
                // İlerleyen işlemler...
              }
          } else {
            console.log("Giriş başarısız. Yanıtta beklenen bilgiler bulunamadı.");
          }
        } catch (error) {
          console.error('Login error:', error.message);
        }
      };
      
      
      
      
      
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flex: 1, marginHorizontal: 22 }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: colors.text
                    }}>
                        Kullanıcı Girişi
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color: colors.text
                    }}>Email</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection:'row'
                    }}>
                        <Icon name="envelope" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholderTextColor={colors.text}
                            keyboardType='email-address'
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />
                    </View>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color:colors.text
                    }}>Şifre</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22,
                        flexDirection:'row'
                    }}>
                        <Icon name="lock" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Şifre'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholderTextColor={colors.text}
                            secureTextEntry={isPasswordShown}
                            style={{
                                width: "100%",
                                color:colors.text
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                            style={{
                                position: "absolute",
                                right: 12
                            }}
                        >
                            {
                                isPasswordShown == true ? (
                                    <Icon name="eye-slash" size={24} color={colors.gray} />
                                ) : (
                                    <Icon name="eye" size={24} color={colors.gray} />
                                )
                            }

                        </TouchableOpacity>
                    </View>
                </View>

                <Button
                  title="Giriş Yap"
                  loading={false}
                  onPress={handleLogin}
                  buttonStyle={{
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                  }}
                  titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                  containerStyle={{
                    height: 50,
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}
                />
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 22
                }}>
                    <Text style={{ fontSize: 16, color: colors.text }}>Hesabınız yok mu?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: colors.primary,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }}>Hesap oluşturun</Text>
                    </Pressable>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Login;