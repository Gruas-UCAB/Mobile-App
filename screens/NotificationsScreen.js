import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { format, isToday, isYesterday, parse } from 'date-fns';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import styles from '../styles/NotificationStyles';

const notificationsData = [
  {
    id: '1',
    user: 'Elayamani',
    message: 'Que buenas gruas manejo',
    timestamp: '2024-12-30T10:30:00',
    type: 'Global',
    read: false,
  },
  {
    id: '2',
    user: 'Arslan Ali',
    message: 'Buen trabajo',
    timestamp: '2024-12-30T08:00:00',
    type: 'Especifico',
    read: false,
  },
  {
    id: '3',
    user: 'Johny Vino',
    message: 'Se cancelan las gruas por hoy',
    timestamp: '2024-12-29T15:00:00',
    type: 'Especifico',
    read: true,
  },
  {
    id: '4',
    user: 'Brice Seraphin',
    message: 'Grua en camino',
    timestamp: '2024-12-28T18:00:00',
    type: 'Global',
    read: true,
  },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notificationsData);
  const navigation = useNavigation();
  const [groupedNotifications, setGroupedNotifications] = useState({
    today: [],
    yesterday: [],
    thisWeek: [],
  });

  useEffect(() => {
    const groupByDate = () => {
      const grouped = {
        today: [],
        yesterday: [],
        thisWeek: [],
      };

      notifications.forEach((notif) => {
        const notifDate = parse(notif.timestamp, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date());
        
        if (isToday(notifDate)) {
          grouped.today.push(notif);
        } else if (isYesterday(notifDate)) {
          grouped.yesterday.push(notif);
        } else {
          grouped.thisWeek.push(notif);
        }
      });

      setGroupedNotifications(grouped);
    };

    groupByDate();
  }, [notifications]);

  const toggleReadStatus = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: !notif.read } : notif
      )
    );
  };

  const renderNotification = ({ item }) => (
    <View style={[styles.notificationCard, item.read && styles.readNotification]}>
      <View style={styles.notificationContent}>
        <Text style={styles.user}>{item.user}</Text>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>
          {format(parse(item.timestamp, 'yyyy-MM-dd\'T\'HH:mm:ss', new Date()), 'hh:mm a')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.markAsReadButton}
        onPress={() => toggleReadStatus(item.id)}
      >
        <Text style={styles.markAsReadText}>
          {item.read ? 'Desmarcar como Leído' : 'Marcar como Leído'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ArrowLeftIcon size={24} color="#000" marginTop={20}/>
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.headerText}>Notificaciones</Text>
      </View>

      {groupedNotifications && groupedNotifications.today.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Hoy</Text>
          <FlatList
            data={groupedNotifications.today}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.notificationsList}
          />
        </View>
      )}

      {groupedNotifications && groupedNotifications.yesterday.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Ayer</Text>
          <FlatList
            data={groupedNotifications.yesterday}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.notificationsList}
          />
        </View>
      )}

      {groupedNotifications && groupedNotifications.thisWeek.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Esta Semana</Text>
          <FlatList
            data={groupedNotifications.thisWeek}
            keyExtractor={(item) => item.id}
            renderItem={renderNotification}
            contentContainerStyle={styles.notificationsList}
          />
        </View>
      )}
    </SafeAreaView>
  );
}