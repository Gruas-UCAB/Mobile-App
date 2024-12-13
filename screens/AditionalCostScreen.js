import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { themeColors } from '../theme';

export default function AditionalCostScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState('pendiente');
  const navigation = useNavigation();

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = () => {
    console.log('Costos Adicionales:', {
      description,
      amount,
      image,
      status,
    });
    // TODO: Implementar lógica para enviar los costos adicionales para aprobación
    navigation.goBack();
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg, padding: 20 }}>
      <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Costos Adicionales</Text>
      
      <TextInput
        className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
        placeholder="Descripción del costo adicional"
        placeholderTextColor="#2f303d"
        value={description}
        onChangeText={setDescription}
      />
      
      <TextInput
        className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
        placeholder="Monto"
        placeholderTextColor="#2f303d"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      
      <TouchableOpacity onPress={handlePickImage} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">Adjuntar Foto</Text>
      </TouchableOpacity>
      
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 20 }} />}
      
      <TouchableOpacity onPress={handleSubmit} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">Enviar para aprobación</Text>
      </TouchableOpacity>
      
      <Text style={{ color: '#000', fontSize: 16, marginTop: 20 }}>Estado de la solicitud: {status}</Text>
    </View>
  );
}