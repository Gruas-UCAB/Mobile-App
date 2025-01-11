import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import styles from '../styles/NotificationStyles';

export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    // Obtener las notificaciones ordenadas por timestamp desde Firebase
    useEffect(() => {
        const q = query(collection(db, 'notification'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notificationsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNotifications(notificationsData);
        });

        return () => unsubscribe();
    }, []);

    // Cambiar el estado de "leído"
    const toggleReadStatus = (id) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
    };

    // Renderizar una notificación
    const renderNotification = ({ item }) => {
        return (
            <View style={[styles.notificationCard, item.read && styles.readNotification]}>
                <View style={styles.notificationContent}>
                    <Text style={styles.user}>{item.recipient}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                    <Text style={styles.timestamp}>{item.timestamp}</Text>
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
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <ArrowLeftIcon size={24} color="#000" marginTop={20} />
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            <View style={styles.header}>
                <Text style={styles.headerText}>Notificaciones</Text>
            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderNotification}
                contentContainerStyle={styles.notificationsList}
            />
        </SafeAreaView>
    );
}
