import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import styles from '../styles/NotificationStyles';
import { FontAwesome } from '@expo/vector-icons';


export default function NotificationsScreen() {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

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

    const toggleReadStatus = (id) => {
        setNotifications(
            notifications.map((notif) =>
                notif.id === id ? { ...notif, read: !notif.read } : notif
            )
        );
    };

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
        <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
            <FontAwesome name="close" size={18} color="#777" />
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
