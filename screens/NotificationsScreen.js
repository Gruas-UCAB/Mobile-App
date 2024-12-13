import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { BellIcon, CheckIcon } from 'react-native-heroicons/solid';

const notificationsData = [
  { id: '1', message: 'Nueva orden asignada', type: 'specific', read: false },
  { id: '2', message: 'Recordatorio: Mantenimiento del vehículo', type: 'recurring', read: false },
  { id: '3', message: 'Actualización de la política de seguridad', type: 'specific', read: true },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notificationsData);
  const navigation = useNavigation();

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <View className="flex-row justify-between p-4" style={{ backgroundColor: themeColors.bg2 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Notificaciones</Text>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View className="p-4 m-2" style={{ backgroundColor: themeColors.bg2, borderRadius: 10 }}>
            <View className="flex-row justify-between items-center">
              <Text style={{ color: item.read ? '#aaa' : '#fff' }}>{item.message}</Text>
              {item.type === 'recurring' ? <BellIcon size="20" color="#f39d03" /> : <CheckIcon size="20" color="#f39d03" />}
            </View>
            {!item.read && (
              <TouchableOpacity onPress={() => handleMarkAsRead(item.id)} className="py-1 mt-2" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
                <Text className="text-center text-white">Marcar como leída</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
}