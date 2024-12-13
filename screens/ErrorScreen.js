import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function ErrorScreen() {
  const navigation = useNavigation();

  const handleRetry = () => {
    // TODO: Implementar lógica para reintentar la conexión
    console.log('Reintentar conexión');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg, justifyContent: 'center', alignItems: 'center', padding: 30 }}>
    <TouchableOpacity onPress={()=> navigation.goBack()} 
    className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
    <ArrowLeftIcon size="20" color="black" />
    </TouchableOpacity>
      <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Sin conexión a internet</Text>
      
      <TouchableOpacity onPress={handleRetry} className="p-4 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">Reintentar</Text>
      </TouchableOpacity>
    </View>
  );
}