import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { themeColors } from '../theme';

const ordersData = [
  { id: '1', location: 'Ubicación 1', type: 'Incidente 1', estimatedTime: '10 mins', status: 'active' },
  { id: '2', location: 'Ubicación 2', type: 'Incidente 2', estimatedTime: '20 mins', status: 'completed' },
  { id: '3', location: 'Ubicación 3', type: 'Incidente 3', estimatedTime: '15 mins', status: 'rejected' },
];

export default function DashboardScreen() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('active');
  const navigation = useNavigation();

  useEffect(() => {
    const filteredOrders = ordersData.filter(order => order.status === filter);
    setOrders(filteredOrders);
  }, [filter]);

  const handleRefresh = () => {
    // TODO: Falta implementar la lógica para actualizar la lista de órdenes
    console.log('Lista de órdenes actualizada');
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <View className="flex-row justify-between p-4" style={{ backgroundColor: themeColors.bg2 }}>
        <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          {/* TODO: Hacer la logica del menu */}
          <Text style={{ color: '#fff' }}>Menú</Text>
        </TouchableOpacity>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Dashboard del Conductor</Text>
        <TouchableOpacity onPress={handleRefresh}>
          <Text style={{ color: '#fff' }}>Actualizar</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around p-4">
        <TouchableOpacity onPress={() => setFilter('active')}>
          <Text style={{ color: filter === 'active' ? '#f39d03' : '#000' }}>Activas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('completed')}>
          <Text style={{ color: filter === 'completed' ? '#f39d03' : '#000' }}>Completadas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter('rejected')}>
          <Text style={{ color: filter === 'rejected' ? '#f39d03' : '#000' }}>Rechazadas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="p-4 m-2" style={{ backgroundColor: themeColors.bg2, borderRadius: 10 }}>
            <Text style={{ color: '#fff' }}>Ubicación: {item.location}</Text>
            <Text style={{ color: '#fff' }}>Tipo: {item.type}</Text>
            <Text style={{ color: '#fff' }}>Tiempo Estimado: {item.estimatedTime}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('ServiceCompleted')}
        className="py-3 mx-7 mb-10"
        style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">
          Confirmar Orden
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails')}
        className="py-3 mx-7 mb-10"
        style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">
          Detalles de Ordenes
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate('UserManagement')}
        className="py-3 mx-7 mb-10"
        style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
        <Text className="text-xl font-bold text-center text-white">
          Detalles de Usuario
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}