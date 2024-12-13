import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { themeColors } from '../theme';

export default function OrderDetailsScreen({ route }) {
  const defaultOrder = {
    location: 'Calle Falsa 123',
    type: 'Accidente',
    estimatedTime: '15 minutos',
    insuredName: 'Juan Pérez',
    policyNumber: 'ABC123456',
    latitude: 37.78825,
    longitude: -122.4324,
  };

  const { order = defaultOrder } = route.params || {};
  const [orderStatus, setOrderStatus] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const navigation = useNavigation();

  console.log('Order:', order); // Agrega esta línea para verificar el contenido de order

  const handleAcceptOrder = () => {
    setOrderStatus('accepted');
  };

  const handleRejectOrder = () => {
    setOrderStatus('rejected');
  };

  const handleStartService = () => {
    console.log('Servicio iniciado');
    navigation.navigate('Dashboard');
  };

  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <View className="p-4" style={{ backgroundColor: themeColors.bg2 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Detalles de la Orden</Text>
      </View>
      <View className="p-4">
        <Text style={{ color: '#000' }}>Ubicación: {order.location}</Text>
        <Text style={{ color: '#000' }}>Tipo de Incidente: {order.type}</Text>
        <Text style={{ color: '#000' }}>Tiempo Estimado de Llegada: {order.estimatedTime}</Text>
        <Text style={{ color: '#000' }}>Nombre del Asegurado: {order.insuredName}</Text>
        <Text style={{ color: '#000' }}>Número de Póliza: {order.policyNumber}</Text>
      </View>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: order.latitude,
          longitude: order.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: order.latitude, longitude: order.longitude }}
          title="Ubicación del Incidente"
        />
      </MapView>
      {orderStatus === null && (
        <View className="p-4">
          <TouchableOpacity onPress={handleAcceptOrder} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
            <Text className="text-xl font-bold text-center text-white">Aceptar Orden</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRejectOrder} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
            <Text className="text-xl font-bold text-center text-white">Rechazar Orden</Text>
          </TouchableOpacity>
          {orderStatus === 'rejected' && (
            <TextInput
              className="p-4 border border-[#2f303d] text-gray-700 rounded-2xl mb-3 bg-transparent"
              placeholder="Explicación de por qué se rechaza"
              placeholderTextColor="#2f303d"
              value={rejectionReason}
              onChangeText={setRejectionReason}
            />
          )}
        </View>
      )}
      {orderStatus === 'accepted' && (
        <TouchableOpacity onPress={handleStartService} className="py-3 mb-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Iniciar Servicio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}