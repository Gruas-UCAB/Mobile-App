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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import moment from 'moment';
import { FontAwesome } from '@expo/vector-icons';
import { API_KEY } from '../../enviroments';

// TODO: Agregar Filtrado

export default function HistoricOrderScreen() {
    const [orders, setOrders] = useState([]);
    const [filter, setFilter] = useState('active');
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUserData = async () => {
            const id = await AsyncStorage.getItem('userId');
            const name = await AsyncStorage.getItem('name');
            const userToken = await AsyncStorage.getItem('userToken');
            if (id) {
                setUserId(id);
                setToken(userToken);
                fetchOrders(id, userToken);
            }
            if (name) {
                setUserName(name);
            }
        };

        const fetchOrders = async (id, userToken) => {
            try {
                console.log('Fetching orders with token:', userToken);
                const response = await axios.get(`${API_KEY}/orders-ms/order/all-orders-by-conductor/${id}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    setOrders(response.data);
                } else {
                    console.error('Error fetching orders:', response.status);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleRefresh = () => {
        if (userId && token) {
            fetchOrders(userId, token);
        }
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
                <Ionicons name="document-text-outline" size={20} color="#FF3D0A" />
                <Text style={styles.orderTitle}>Orden: {item.orderNumber}</Text>
            </View>
            <Text style={styles.orderText}>Fecha: {moment(item.orderDate).format('DD/MM/YYYY')}</Text>
            <Text style={styles.orderText}>Estado: {item.orderStatus}</Text>
            <Text style={styles.orderText}>Tipo de Incidente: {item.incidentType}</Text>
            <Text style={styles.orderText}>Costo: ${item.cost}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="close" size={18} color="#777" />
            </TouchableOpacity>
                <View style={styles.headerLeftIcons}>
                </View>
                <Text style={styles.headerText}>Historial de Ordenes</Text>
                <View style={styles.headerRightIcons}>
                </View>
            </View>

            <FlatList
                data={orders}
                keyExtractor={item => item.orderNumber}
                renderItem={renderOrder}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No hay órdenes para mostrar.</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
