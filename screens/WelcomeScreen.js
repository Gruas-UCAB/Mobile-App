import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: themeColors.bg}}>
        <View className="flex-1 flex justify-around my-4">
            <Text 
                className="text-white font-bold text-4xl text-center">
                Comencemos!
            </Text>
            <View className="flex-row justify-center">
                <Image source={require("../assets/images/wl.png")}
                    style={{width: 350, height: 350}} />
            </View>
            <View className="space-y-4">
                <TouchableOpacity
                    onPress={()=> navigation.navigate('Login')}
                    className="py-3 bg-blue-900 mx-7 rounded-xl">
                        <Text 
                            className="text-xl font-bold text-center text-white" >
                            Iniciar Sesion
                        </Text>
                </TouchableOpacity>
                <View className="flex-row justify-center">
                    <Text className="text-white font-semibold"> No tienes una cuenta?</Text>
                    <Text className="font-semibold text-black-500"> Contacta a tu administrador</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
  )
}