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
        style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}} 
        className="flex-1 bg-white px-8 pt-8">
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Correo</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Correo"
              // value="" 
            />
            <Text className="text-gray-700 ml-4">Contraseña</Text>
            <TextInput 
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry
              placeholder="Contraseña"
              // value="" 
            />
            <TouchableOpacity className="flex items-end">
              <Text className="text-gray-700 mb-5">Olvidó su Constraseña?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="py-3 bg-blue-500 rounded-xl">
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