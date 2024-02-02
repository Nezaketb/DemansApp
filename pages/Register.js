import { View, Text, Image, Pressable, TextInput, TouchableOpacity,ScrollView} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegisterUser, addCommands } from '../api';

const Register = ({ navigation }) => {
    const [userId, setUserId] = useState('');
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const { colors } = useTheme();

    const handleRegister = async () => {
        try {
          const success = await RegisterUser(email, userName, surname, phone, password);
    
          if (success) {
            //Alert.alert('Başarılı', 'Kayıt işlemi başarıyla tamamlandı.');
            //  await loadUserId();
            // handleAddCommands();
            navigation.navigate('AddCompanion');
            //BURAYA EKLEEEE
          } else {
            //Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
          }
        } catch (error) {
          //Alert.alert('Hata', 'Kayıt işlemi sırasında bir hata oluştu.');
          console.error('Register error:', error.message);
        }
      };

      const loadUserId = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userId');
          console.log('Stored userId:', storedUserId);
          if (storedUserId) {
            setUserId(parseInt(storedUserId, 10));
          }
        } catch (error) {
          console.error('Get userId error:', error.message);
        }
      };
      

      const handleAddCommands = async () => {
        try {
          await addCommands(userId);
        } catch (error) {
          console.error('Error in AddComands:', error);
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
                        Hesap oluştur
                    </Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8,
                        color: colors.text
                    }}>İsim</Text>

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
                        <Icon name="user" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='İsim'
                            onChangeText={(text) => setUserName(text)}
                            value={userName}   
                            placeholderTextColor={colors.text}
                            keyboardType='default'
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
                        color: colors.text
                    }}>Soyad</Text>

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
                        <Icon name="users" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Soyad'
                            onChangeText={(text) => setSurname(text)}
                            value={surname}
                            placeholderTextColor={colors.text}
                            keyboardType='default'
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
                        flexDirection:'row',
                    }}>
                        <Icon name="envelope" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='Email'
                            onChangeText={(text) => setEmail(text)}
                            value={email}
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
                        color: colors.text
                    }}>Telefon Numarası</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: colors.text,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: 5
                    }}>
                        <Icon name="phone" size={20} color="gray" style={{ marginRight: 10 }} />
                        <TextInput
                            placeholder='+90'
                            placeholderTextColor={colors.text}
                            keyboardType='numeric'
                            style={{
                                width: "12%",
                                borderRightWidth: 1,
                                borderLeftColor: colors.primary,
                                height: "100%"
                            }}
                        />
                        <TextInput
                            placeholder='Telefon numarası'
                            onChangeText={(text) => setPhone(text)}
                            value={phone}
                            placeholderTextColor={colors.text}
                            keyboardType='numeric'
                            style={{
                                width: "80%",
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
                            onChangeText={(text) => setPassword(text)}
                            value={password}
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

                <View style={{
                    flexDirection: 'row',
                    marginVertical: 6
                }}>
                    {/* <Checkbox
                        style={{ marginRight: 8 }}
                        value={isChecked}
                        onValueChange={setIsChecked}
                        color={isChecked ? colors.primary : undefined}
                    /> */}

                    <Text style={{color:colors.text}}>Kullanıcı hakları sözleşmesini okudum ve kabul ediyorum.</Text>
                </View>

                <Button
                  title="Kayıt ol"
                  loading={false}
                  onPress={handleRegister}
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
                    <Text style={{ fontSize: 16, color: colors.text }}>Zaten bir hesabınız var mı?</Text>
                    <Pressable
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontSize: 16,
                            color: colors.primary,
                            fontWeight: 'bold',
                            marginLeft: 6
                        }}>Giriş Yap</Text>
                    </Pressable>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Register;

