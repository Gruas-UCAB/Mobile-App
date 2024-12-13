import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';

export default function ServiceCompletedScreen() {
  const [arrivalConfirmed, setArrivalConfirmed] = useState(false);
  const [serviceCompleted, setServiceCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [additionalCosts, setAdditionalCosts] = useState('');
  const navigation = useNavigation();

  const handleConfirmArrival = () => {
    setArrivalConfirmed(true);
  };

  const handleConfirmServiceCompletion = () => {
    setServiceCompleted(true);
  };

  const handleSubmit = () => {
    console.log('Service Details:', {
      arrivalConfirmed,
      serviceCompleted,
      notes,
      additionalCosts,
    });
    // TODO: Implementar lógica para enviar detalles del servicio y costos adicionales para aprobación
    navigation.navigate('Dashboard');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg, padding: 20 }}>
      <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Confirmación del Servicio</Text>
      
      <TouchableOpacity onPress={handleConfirmArrival} className="py-3 mb-2" style={{ backgroundColor: arrivalConfirmed ? '#4caf50' : '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">{arrivalConfirmed ? 'Llegada Confirmada' : 'Confirmar Llegada'}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={handleConfirmServiceCompletion} className="py-3 mb-2" style={{ backgroundColor: serviceCompleted ? '#4caf50' : '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">{serviceCompleted ? 'Servicio Completado' : 'Confirmar Servicio Completado'}</Text>
      </TouchableOpacity>
      
      <TextInput
        className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
        placeholder="Notas sobre el servicio (opcional)"
        placeholderTextColor="#2f303d"
        value={notes}
        onChangeText={setNotes}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AditionalCost')} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">Costos Adicionales</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">Enviar Confirmación</Text>
      </TouchableOpacity>
    </View>
  );
}