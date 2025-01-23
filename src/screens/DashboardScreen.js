import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    RefreshControl,
    Image
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

    const renderOrder = ({ item }) => {
        return (
          <TouchableOpacity 
            style={styles.orderCardContainer} 
            onPress={() => navigation.navigate('OrderDetails', { orderId: item.id })}
            activeOpacity={0.9}
          >
            <View style={styles.orderTopRow}>
              <Text style={styles.orderNumber}>#{item.orderNumber}</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusBadgeText}>
                  {item.orderStatus}
                </Text>
              </View>
            </View>
      
            <View style={styles.divider} />
      
            <View style={styles.orderMiddleRow}>

              <View style={styles.locationColumn}>
                <Text style={styles.locationName}>
                  {'Costo'}
                </Text>
                <Text style={styles.locationDate}>
                  ${item.cost}
                </Text>
              </View>
      
              <Ionicons
                name="car-outline"
                size={20}
                color="#000"
                style={{ marginHorizontal: 10 }}
              />
      
              <View style={styles.locationColumn}>
                <Text style={styles.locationName}>
                  {"Fecha"}
                </Text>
                <Text style={styles.locationDate}>
                  {moment(item.orderDate).format('DD/MM/YYYY')}
                </Text>
              </View>
            </View>
      
            <View style={styles.divider} />
      
            <View style={styles.orderBottomRow}>
              <View style={styles.userInfo}>
                <Image
                  source={require('../../assets/grua.png')}
                  style={styles.userImage}
                />
                <View>
                  <Text style={styles.accidentType}>
                    {item.incidentType}
                  </Text>
                  <Text style={styles.userRole}>Ver Mas Detalles</Text>
                </View>
              </View>
      
              <Ionicons
                name="chevron-forward"
                size={24}
                color="#000"
              />
            </View>
          </TouchableOpacity>
        );
      };
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                {/* Sección izquierda con foto y texto */}
                <View style={styles.userSection}>
                    <Image
                        source={require('../../assets/user-4.jpg')}
                        style={styles.profileImage}
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.userName}>{userName},</Text>
                        <Text style={styles.welcomeText}>Bienvenido nuevamente!</Text>
                    </View>
                </View>
                {/* Sección derecha con íconos */}
                <View style={styles.headerRightIcons}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Notifications')}
                        style={styles.notificationContainer}>
                        <Ionicons name="notifications-outline" size={25} color="#fff" />
                        <View style={styles.badge} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Botón grande para refrescar ubicación */}
            <View style={styles.refreshButtonContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefreshLocation}>
                <Text style={styles.refreshButtonText}>Refrescar ubicación</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.bodyContainer}>
                <Text style={styles.textoDeOrden}>Ordenes Recientes</Text>
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
            </View>

            <View style={styles.footerContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('HistoricOrder')}
                    style={styles.footerIcon}
                >
                    <Ionicons name="document-text-outline" size={25} color="#fc8404" />
                    <Text style={styles.footerText}>Orden</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('UserManagement')}
                    style={styles.footerIcon}
                >
                    <Ionicons name="person-outline" size={25} color="#fc8404" />
                    <Text style={styles.footerText}>Usuario</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
