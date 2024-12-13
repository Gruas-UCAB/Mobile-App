import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {ArrowLeftIcon} from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function LoginScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white" style={{backgroundColor: themeColors.bg}}>
      <SafeAreaView  className="flex ">
        <View className="flex-row justify-start">
          <TouchableOpacity onPress={()=> navigation.goBack()} 
          className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View  className="flex-row justify-center">
          <Image source={require('../assets/images/loginimg.png')} 
          style={{width: 220, height: 200}} />
        </View>

      </SafeAreaView>
      <View 
        className="flex-1 px-8 pt-8"
        style={{ backgroundColor: themeColors.bg2, borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
          <View className="form space-y-2">
            <Text className="text-white ml-4">Correo</Text>
            <TextInput 
              className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
              placeholder="Correo"
              placeholderTextColor="#2f303d"
              // value="" 
            />
            <Text className="text-white ml-4">Contraseña</Text>
            <TextInput 
              className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
              secureTextEntry
              placeholder="Contraseña"
              placeholderTextColor="#2f303d"
              // value="" 
            />
            <TouchableOpacity 
            onPress={()=> navigation.navigate('RecoveryPassword')}
            className="flex items-end">
              <Text className="text-white mb-5">Olvidó su Constraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=> navigation.navigate('Dashboard')}
              className="py-3"
              style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
                <Text 
                    className="text-xl font-bold text-center text-white"
                >
                        Iniciar Sesion
                </Text>
             </TouchableOpacity>
            
          </View>

      </View>
    </View>
    
  )
}