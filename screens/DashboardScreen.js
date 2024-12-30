import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/DashboardStyles.js';
import { Ionicons } from '@expo/vector-icons';

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
    // TODO: Falta lógica del refresh
    console.log('Lista de órdenes actualizada');
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Ionicons name="location-outline" size={20} color="#FF3D0A" />
        <Text style={styles.orderTitle}>Ubicación: {item.location}</Text>
      </View>
      <Text style={styles.orderText}>Tipo: {item.type}</Text>
      <Text style={styles.orderText}>Tiempo Estimado: {item.estimatedTime}</Text>
      <View style={styles.statusContainer}>
        <View style={[styles.statusIndicator, getStatusStyle(item.status)]} />
        <Text style={styles.statusText}>{capitalize(item.status)}</Text>
      </View>
    </View>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { backgroundColor: '#4CAF50' }; 
      case 'completed':
        return { backgroundColor: '#2196F3' }; 
      case 'rejected':
        return { backgroundColor: '#F44336' }; 
      default:
        return { backgroundColor: '#ffffff' }; 
    }
  };

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerLeftIcons}>
          <TouchableOpacity onPress={handleRefresh} style={styles.iconButton}>
            <Ionicons name="refresh-outline" size={24} color="#FF3D0A" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerText}>Dashboard del Conductor</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={28} color="#FF3D0A" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {[{ label: 'Activo', value: 'active' }, { label: 'Completado', value: 'completed' }, { label: 'Rechazado', value: 'rejected' }].map(status => (
          <TouchableOpacity
            key={status.value}
            onPress={() => setFilter(status.value)}
            style={[styles.filterButton, filter === status.value && styles.activeFilterButton]}
          >
            <Text
              style={[styles.filterText, filter === status.value && styles.activeFilterText]}
            >
              {status.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay órdenes para mostrar.</Text>
          </View>
        }
      />

      <View style={styles.footerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetails')}
          style={styles.footerIcon}
        >
          <Ionicons name="document-text-outline" size={32} color="#fc8404" />
          <Text style={styles.footerText}>Orden</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserManagement')}
          style={styles.footerIcon}
        >
          <Ionicons name="people-outline" size={32} color="#fc8404" />
          <Text style={styles.footerText}>Usuario</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
