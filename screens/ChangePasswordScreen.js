import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Contraseña cambiada exitosamente');
      navigation.navigate('Welcome');
    } else {
      console.log('Las contraseñas no coinciden');
    }
  };

  return (
    <View className="flex-1 border-[#2f303d]" style={{ backgroundColor: themeColors.bg2, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
      <View className="flex-row justify-start">
        <TouchableOpacity onPress={()=> navigation.goBack()} 
        className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
          <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
      </View>
      <View className="flex-1 px-8 pt-8" style={{ backgroundColor: '#0f101b', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <Text className="text-white text-3xl font-bold text-center mb-5">Cambiar Contraseña</Text>
        <TextInput
          className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
          placeholder="Contraseña Actual"
          placeholderTextColor="#2f303d"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
        />
        <TextInput
          className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
          placeholder="Nueva Contraseña"
          placeholderTextColor="#2f303d"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
        />
        <TextInput
          className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
          placeholder="Confirmar Nueva Contraseña"
          placeholderTextColor="#2f303d"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleChangePassword} className="py-3 mb-2 mt-4" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Cambiar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}