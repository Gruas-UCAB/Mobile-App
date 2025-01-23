import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/OrderDetailsStyles';
import axios from 'axios';
import { API_KEY } from '../../enviroments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';

import {
    handleCancelOrder,
    handleReject,
    handleAcceptOrder,
    handleLocateOrder,
    handleProcessOrder,
    handleExtraCostOrder,
    handleFinishOrder
} from '../handlers/orderHandler';

export default function OrderDetailsScreen({ route }) {
    const navigation = useNavigation();
    const { orderId } = route.params;
    const [order, setOrder] = useState(null);
    const [contract, setContract] = useState(null);
    const [routeCoordinates, setRouteCoordinates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isOrderRejected, setIsOrderRejected] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState(0);
    const [orderLocation, setOrderLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [destinationLocation, setDestinationLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [conductorLocation, setConductorLocation] = useState({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                console.error('Error: El ID de la orden no está definido.');
                setLoading(false);
                return;
            }

            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const response = await axios.get(`${API_KEY}/orders-ms/order/by-id/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    const orderData = response.data;
                    setOrder(orderData);
                    const [latitude, longitude] = orderData.location.split(',').map(Number);
                    setOrderLocation({ latitude, longitude });
                    const [destLatitude, destLongitude] = orderData.destination.split(',').map(Number);
                    setDestinationLocation({ latitude: destLatitude, longitude: destLongitude });
                    fetchContractDetails(orderData.contractId, userToken);
                    fetchRouteCoordinates(latitude, longitude, destLatitude, destLongitude);
                } else {
                    console.error('Error fetching order details:', response.status);
                    setLoading(false);
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error response:', error.response.data);
                    console.error('Error status:', error.response.status);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    console.error('Error request:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
                setLoading(false);
            }
        };

        const fetchContractDetails = async (contractId, userToken) => {
            try {
                const response = await axios.get(`${API_KEY}/orders-ms/contract/by-id/${contractId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    setContract(response.data);
                } else {
                    console.error('Error fetching contract details:', response.status);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contract details:', error);
                setLoading(false);
            }
        };

        const fetchConductorLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Error', 'Se requiere permiso para acceder a la ubicación.');
                    return;
                }

                const loc = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });

                setConductorLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });
            } catch (error) {
                console.error('Error fetching conductor location:', error);
            }
        };

        fetchOrderDetails();
        fetchConductorLocation();
    }, [orderId]);

    useEffect(() => {
        if (!isOrderRejected) {
            const timer = setInterval(() => {
                setEstimatedTime(prevTime => prevTime + 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isOrderRejected]);

    const fetchRouteCoordinates = async (startLat, startLng, destLat, destLng) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destLat},${destLng}&key=AIzaSyAEzlFUYYgDgPPud2V75M2rXjd8LP3MIX4`);
            const points = polyline.decode(response.data.routes[0].overview_polyline.points);
            const routeCoords = points.map(point => ({
                latitude: point[0],
                longitude: point[1]
            }));
            setRouteCoordinates(routeCoords);
        } catch (error) {
            console.error('Error fetching route coordinates:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando mapa...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <FontAwesome name="close" size={18} color="#fff" />
                    <Text style={styles.headerText}>Detalles de la Orden</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.mapContainer}>
                <View style={styles.mapWrapper}>
                    <MapView
                        style={styles.map}
                        region={{
                            latitude: orderLocation.latitude,
                            longitude: orderLocation.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                    >
                        <Marker
                            coordinate={{ latitude: orderLocation.latitude, longitude: orderLocation.longitude }}
                            title="Ubicación de Recogida"
                            description={order ? order.destination : ''}
                        />
                        <Marker
                            coordinate={{ latitude: destinationLocation.latitude, longitude: destinationLocation.longitude }}
                            title="Destino"
                            description={order ? order.destination : ''}
                            pinColor="blue"
                        />
                        {(order && (order.orderStatus === 'por aceptar' || order.orderStatus === 'aceptado' || order.orderStatus === 'in process')) && (
                            <Marker
                                coordinate={{ latitude: conductorLocation.latitude, longitude: conductorLocation.longitude }}
                                title="Ubicación del Conductor"
                                pinColor="green"
                            />
                        )}
                        <Polyline
                            coordinates={routeCoordinates}
                            strokeColor="#000"
                            strokeWidth={3}
                        />
                        {(order && (order.orderStatus === 'por aceptar' || order.orderStatus === 'aceptado' || order.orderStatus === 'in process')) && (
                            <Polyline
                                coordinates={[
                                    { latitude: conductorLocation.latitude, longitude: conductorLocation.longitude },
                                    { latitude: orderLocation.latitude, longitude: orderLocation.longitude }
                                ]}
                                strokeColor="red"
                                strokeWidth={3}
                            />
                        )}
                    </MapView>
                </View>
            </View>

            <View style={styles.contentWrapper}>
            <ScrollView contentContainerStyle={styles.infoScrollView}>
                    <View style={styles.infoContainer}>

                        {/* Sección de direcciones */}
                        <View style={styles.locationSection}>
                        {/* Origen */}
                        <View style={styles.locationRow}>
                            <View style={styles.iconContainer}>
                            <FontAwesome name="map-marker" size={24} color="#fff" />
                            </View>
                            <View style={styles.locationTextContainer}>
                            <Text style={styles.label}>Tipo de Incidente</Text>
                            <Text style={styles.text}>{order ? order.incidentType : ''}</Text>
                            {/* Formatear esta fecha */}
                            <Text style={styles.text}>{order ? order.orderDate : ''}</Text>
                            </View>
                        </View>

                        {contract && (
                        <View style={styles.locationRow}>
                            <View style={styles.iconContainer}>
                            <FontAwesome name="car" size={24} color="#fff" />
                            </View>
                            <View style={styles.locationTextContainer}>
                            <Text style={styles.label}>Vehiculo</Text>
                            <Text style={styles.text}>{contract.vehicle.brand} {contract.vehicle.model} ({contract.vehicle.year})</Text>
                                <Text style={styles.text}>{contract.vehicle.licensePlate}</Text>
                                <Text style={styles.text}>{contract.vehicle.color}</Text>
                                <Text style={styles.text}>{contract.vehicle.km} km</Text>
                            </View>
                        </View>
                        )}
                        </View>

                        {/* Separador horizontal */}
                        <View style={styles.divider} />
                        
                        {contract && (
                        <View style={styles.userRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.userName}>Propietario</Text>
                            <Text style={styles.userRole}>{contract.vehicle.ownerName}</Text>
                            <Text style={styles.userRole}>{contract.vehicle.ownerDni}</Text>
                        </View>

                        {/* Iconos de teléfono y chat (ejemplo) */}
                        <TouchableOpacity style={styles.iconButton}>
                            <FontAwesome name="user" size={18} color="#fff" />
                        </TouchableOpacity>
                        </View>
                        )}
                        

                        {/* Separador horizontal */}
                        <View style={styles.divider} />

                        {/* Sección inferior: peso y estado */}
                        <View style={styles.infoBottomRow}>
                        <View>
                            <Text style={styles.label}>Costo de la Orden</Text>
                            <Text style={styles.text}>{order.cost}</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Estatus</Text>
                            <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{order.orderStatus}</Text>
                            </View>
                        </View>
                        </View>
                    </View>
                </ScrollView>


                <View style={styles.bottomContainer}>
                    {order && order.orderStatus === 'por aceptar' ? (
                        <>
                            <TouchableOpacity style={styles.rejectButton} onPress={() => handleReject(orderId, setOrder, order, setModalVisible)}>
                                <FontAwesome name="ban" size={18} color="red" />
                                <Text style={styles.rejectButtonText}>Rechazar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleAcceptOrder(orderId, setOrder, order)}>
                                <FontAwesome name="check" size={18} color="#FF7F0A" />
                                <Text style={styles.acceptButtonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </>
                    ) : order && order.orderStatus === 'aceptado' ? (
                        <>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleLocateOrder(orderId, setOrder, order)}>
                                <FontAwesome name="check" size={18} color="#FF7F0A" />
                                <Text style={styles.acceptButtonText}>Localizado</Text>
                            </TouchableOpacity>
                        </>
                    ) : order && order.orderStatus === 'localizado' ? (
                        <>
                            <TouchableOpacity style={styles.rejectButton} onPress={() => handleCancelOrder(orderId, setOrder, order)}>
                                <FontAwesome name="ban" size={18} color="red" />
                                <Text style={styles.rejectButtonText}>Cancelado</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleProcessOrder(orderId, setOrder, order)}>
                                <FontAwesome name="check" size={18} color="#FF7F0A" />
                                <Text style={styles.acceptButtonText}>En Proceso</Text>
                            </TouchableOpacity>
                        </>
                    ) : order && order.orderStatus === 'en proceso' ? (
                        <>
                            <TouchableOpacity style={styles.rejectButton} onPress={() => handleCancelOrder(orderId, setOrder, order)}>
                                <FontAwesome name="ban" size={18} color="red" />
                                <Text style={styles.rejectButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.costButton} onPress={() => handleExtraCostOrder(navigation, orderId)}>
                                <FontAwesome name="money" size={18} color="green" />
                                <Text style={styles.costButtonText}>Costo Adicional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => handleFinishOrder(navigation, orderId)}>
                                <FontAwesome name="check" size={18} color="#FF7F0A" />
                                <Text style={styles.acceptButtonText}>Finalizar</Text>
                            </TouchableOpacity>
                        </>
                    ) : null}
                </View>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
            </Modal>
        </View>
    );
}
