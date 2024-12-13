import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function RecoveryPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handlePasswordRecovery = () => {
    console.log('Email para recuperación de contraseña:', email);
    navigation.navigate('Login');
  };

  return (
    <View className="flex-1 border-[#2f303d]" style={{ backgroundColor: themeColors.bg2, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>
      
      <View className="flex-1 px-8 pt-8" style={{ backgroundColor: '#0f101b', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <Text className="text-white text-3xl font-bold text-center mb-5 ">Recuperar Contraseña</Text>
        <Text className="text-white mb-3 pt-4">
          Por favor, ingresa tu correo electrónico para recibir un enlace de recuperación de contraseña.
        </Text>
        <TextInput
          className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
          placeholder="Ingresa tu correo electrónico"
          placeholderTextColor="#2f303d"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={handlePasswordRecovery} className="py-3 mb-2 mt-4" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Recuperar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Welcome')} className="py-3 mt-5" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Volver al Menu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}