import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    TextInput,
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

export default function OrderDetailsScreen({ route }) {
    const navigation = useNavigation();
    const { orderId } = route.params;

    const [order, setOrder] = useState(null);
    const [contract, setContract] = useState(null);

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

    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isOrderRejected, setIsOrderRejected] = useState(false);
    const [estimatedTime, setEstimatedTime] = useState(0);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!orderId) {
                console.error('Error: orderId is null or undefined');
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

        // Detallles del Contrato
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

        // Ubicacion del Condctor
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

    const handleCancelOrder = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/cancel/${orderId}`, {
                accepted: true
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Orden localizada correctamente:', response.data);
                Alert.alert('Éxito', 'Orden localizada correctamente.');
                setOrder({ ...order, orderStatus: 'cancelled' });
            } else {
                console.error('Error localizando la orden:', response.status);
            }
        } catch (error) {
            console.error('Error localizando la orden:', error);
            Alert.alert('Error', 'No se pudo localizar la orden.');
        }
    };

    const handleReject = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/toggle-accept/${orderId}`, {
                accepted: false
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                Alert.alert('Éxito', 'La orden ha sido cancelada.');
                setOrder({ ...order, orderStatus: 'cancelled' });
            } else {
                console.error('Error al cancelar la orden:', response.status);
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
            Alert.alert('Error', 'No se pudo cancelar la orden.');
        }
        setModalVisible(true);
    };

    const handleAcceptOrder = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/toggle-accept/${orderId}`, {
                accepted: true
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Orden aceptada correctamente:', response.data);
                Alert.alert('Éxito', 'Orden aceptada correctamente.');
                setOrder({ ...order, orderStatus: 'aceptado' });
            } else {
                console.error('Error aceptando la orden:', response.status);
            }
        } catch (error) {
            console.error('Error aceptando la orden:', error);
            Alert.alert('Error', 'No se pudo aceptar la orden.');
        }
    };

    const handleLocateOrder = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/locate/${orderId}`, {
                accepted: true
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Orden localizada correctamente:', response.data);
                Alert.alert('Éxito', 'Orden localizada correctamente.');
                setOrder({ ...order, orderStatus: 'localizado' });
            } else {
                console.error('Error localizando la orden:', response.status);
            }
        } catch (error) {
            console.error('Error localizando la orden:', error);
            Alert.alert('Error', 'No se pudo localizar la orden.');
        }
    };

    const handleProcessOrder = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/start/${orderId}`, {
                accepted: true
            }, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                console.log('Orden localizada correctamente:', response.data);
                Alert.alert('Éxito', 'Orden localizada correctamente.');
                setOrder({ ...order, orderStatus: 'en proceso' });
            } else {
                console.error('Error localizando la orden:', response.status);
            }
        } catch (error) {
            console.error('Error localizando la orden:', error);
            Alert.alert('Error', 'No se pudo localizar la orden.');
        }
    };

    const handleExtraCostOrder = async () => {
        navigation.navigate('AditionalCost', { orderId });
    };

    const handleFinishOrder = async () => {
        navigation.navigate('ServiceCompleted', { orderId });
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="close" size={18} color="#777" />
            </TouchableOpacity>

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
                    coordinates={[
                        { latitude: orderLocation.latitude, longitude: orderLocation.longitude },
                        { latitude: destinationLocation.latitude, longitude: destinationLocation.longitude }
                    ]}
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

            <View style={styles.contentWrapper}>
                <ScrollView contentContainerStyle={styles.infoScrollView}>
                    <View style={styles.infoContainer}>

                        <View style={styles.section}>
                            <Text style={styles.label}>Detalles de Orden</Text>
                            <Text style={styles.text}>Fecha: {order ? order.orderDate : ''}</Text>
                            <Text style={styles.text}>Tipo de Incidente: {order ? order.incidentType : ''}</Text>
                        </View>

                        {contract && (
                            <View style={styles.section}>
                                <Text style={styles.label}>Detalles del Contrato</Text>
                                <Text style={styles.text}>Fecha de Expiración: {contract.expirationDate}</Text>
                                <Text style={styles.text}>Vehículo: {contract.vehicle.brand} {contract.vehicle.model} ({contract.vehicle.year})</Text>
                                <Text style={styles.text}>Placa: {contract.vehicle.licensePlate}</Text>
                                <Text style={styles.text}>Color: {contract.vehicle.color}</Text>
                                <Text style={styles.text}>Kilometraje: {contract.vehicle.km} km</Text>
                                <Text style={styles.text}>Propietario: {contract.vehicle.ownerName} (DNI: {contract.vehicle.ownerDni})</Text>
                            </View>
                        )}
                    </View>
                </ScrollView>

                <View style={styles.bottomContainer}>
                    {order && order.orderStatus === 'por aceptar' ? (
                        <>
                            <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
                                <FontAwesome name="ban" size={24} color="#FF7F0A" />
                                <Text style={styles.rejectButtonText}>Rechazar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptOrder}>
                                <FontAwesome name="check" size={24} color="white" />
                                <Text style={styles.acceptButtonText}>Aceptar</Text>
                            </TouchableOpacity>
                        </>
                    ) : order && order.orderStatus === 'aceptado' ? (
                            <>
                                <TouchableOpacity style={styles.acceptButton} onPress={handleLocateOrder}>
                                    <FontAwesome name="check" size={24} color="white" />
                                    <Text style={styles.acceptButtonText}>Localizado</Text>
                                </TouchableOpacity>
                            </>
                    ) : order && order.orderStatus === 'localizado' ? (
                            <>
                                <TouchableOpacity style={styles.rejectButton} onPress={handleCancelOrder}>
                                    <FontAwesome name="ban" size={24} color="#FF7F0A" />
                                    <Text style={styles.rejectButtonText}>Cancelado</Text>
                                </TouchableOpacity>                        
                                <TouchableOpacity style={styles.acceptButton} onPress={handleProcessOrder}>
                                    <FontAwesome name="check" size={24} color="white" />
                                    <Text style={styles.acceptButtonText}>En Proceso</Text>
                                </TouchableOpacity>
                            </>
                    ) : order && order.orderStatus === 'en proceso' ? (
                        <>
                            <TouchableOpacity style={styles.rejectButton} onPress={handleCancelOrder}>
                                <FontAwesome name="ban" size={24} color="#FF7F0A" />
                                <Text style={styles.rejectButtonText}>Cancelar</Text>
                            </TouchableOpacity>                        
                            <TouchableOpacity style={styles.acceptButton} onPress={handleExtraCostOrder}>
                                <FontAwesome name="check" size={24} color="white" />
                                <Text style={styles.acceptButtonText}>Agregar Costo Adicional</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.acceptButton} onPress={handleFinishOrder}>
                                <FontAwesome name="check" size={24} color="white" />
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

