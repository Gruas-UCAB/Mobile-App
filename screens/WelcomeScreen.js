import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';


export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <LinearGradient 
    colors={[
        '#1D1E28',
        '#1D1E28',
        '#0f101b',
        '#0f101b',
        '#0f101b']}
    style={{flex: 1}}
    >
        <SafeAreaView className="flex-1">
            <View className="flex-1 flex justify-around my-12">
                <Text 
                    className="text-black font-bold text-5xl text-center"
                    style={{ color: '#fff' }}>
                    Bienvenido
                </Text>
                <View className="flex-row justify-center">
                    <Image source={require("../assets/images/wl.png")}
                        style={{width: 350, height: 350}} />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={()=> navigation.navigate('Login')}
                        className="py-3 mx-7"
                        style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
                            <Text 
                                className="text-xl font-bold text-center text-white">
                                Iniciar Sesion
                            </Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-light"> No tienes una cuenta?</Text>
                        
                        <Text className="font-medium" style={{ color: '#f39d03' }}> Contacta a tu administrador</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    </LinearGradient>
  )
}