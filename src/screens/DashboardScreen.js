import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
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
import * as Location from 'expo-location';

export default function DashboardScreen() {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [token, setToken] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const navigation = useNavigation();

    const fetchOrders = async (id, userToken) => {
        try {
            console.log('Fetching orders with token:', userToken);
            const response = await axios.get(`${API_KEY}/orders-ms/order/current-order-by-conductor/${id}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                console.log('Orders fetched successfully:', response.data);
                const ordersData = Array.isArray(response.data) ? response.data : [response.data];
                setOrders(ordersData);
            } else {
                console.error('No hay ordenes Dispoibles:', response.status);
            }
        } catch (error) {
            console.error('No hay ordenes disponibles:', error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const id = await AsyncStorage.getItem('userId');
            const name = await AsyncStorage.getItem('name');
            const userToken = await AsyncStorage.getItem('userToken');
            console.log('User data:', { id, name, userToken });
            if (id) {
                setUserId(id);
                setToken(userToken);
                fetchOrders(id, userToken);
            }
            if (name) {
                setUserName(name);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (userId && token) {
                fetchOrders(userId, token);
            }
        }, 360000);

        return () => clearInterval(intervalId);
    }, [userId, token]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            handleRefreshLocation();
        }, 600000);

        return () => clearInterval(intervalId);
    }, [userId, token]);

    const handleRefreshLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Error', 'Se requiere permiso para acceder a la ubicación.');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            const locationData = `${loc.coords.latitude},${loc.coords.longitude}`;

            console.log('Enviando ubicación:', locationData);

            const response = await axios.patch(`${API_KEY}/providers-ms/provider/conductors/conductor/location/${userId}`, {
                location: locationData
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Alert.alert('Ubicación Enviada', 'La ubicación se ha enviado correctamente.');
            } else {
                console.error('Error enviando la ubicación:', response.status);
            }
        } catch (error) {
            console.error('Error enviando la ubicación:', error);
            Alert.alert('Error', 'No se pudo enviar la ubicación.');
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchOrders(userId, token);
        setRefreshing(false);
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
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}>
                    <Text style={styles.buttonText}>Ver más detalles</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeftIcons}>
                    <TouchableOpacity onPress={handleRefreshLocation} style={styles.iconButton}>
                        <FontAwesome name="map" size={18} color="#FF3D0A" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerText}>Bienvenido, {userName}</Text>
                <View style={styles.headerRightIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
                        <Ionicons name="notifications-outline" size={28} color="#FF3D0A" />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={orders}
                keyExtractor={item => item.orderNumber.toString()}
                renderItem={renderOrder}
                contentContainerStyle={styles.listContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No tienes ordenes asignadas por el momento.</Text>
                    </View>
                }
            />

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HistoricOrder')}
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
