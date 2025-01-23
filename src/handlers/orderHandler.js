// src/handlers/orderHandlers.js
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '../../enviroments';
import { Alert } from 'react-native';

export const handleCancelOrder = async (orderId, setOrder, order) => {
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
            Alert.alert('Exito', 'Orden localizada correctamente.');
            setOrder({ ...order, orderStatus: 'cancelled' });
        } else {
            console.error('Error localizando la orden:', response.status);
        }
    } catch (error) {
        console.error('Error localizando la orden:', error);
        Alert.alert('Error', 'No se pudo localizar la orden.');
    }
};

export const handleReject = async (orderId, setOrder, order, setModalVisible) => {
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
            Alert.alert('Exito', 'La orden ha sido cancelada.');
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

export const handleAcceptOrder = async (orderId, setOrder, order) => {
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
            Alert.alert('Exito', 'Orden aceptada correctamente.');
            setOrder({ ...order, orderStatus: 'aceptado' });
        } else {
            console.error('Error aceptando la orden:', response.status);
        }
    } catch (error) {
        console.error('Error aceptando la orden:', error);
        Alert.alert('Error', 'No se pudo aceptar la orden.');
    }
};

export const handleLocateOrder = async (orderId, setOrder, order) => {
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
            Alert.alert('Exito', 'Orden localizada correctamente.');
            setOrder({ ...order, orderStatus: 'localizado' });
        } else {
            console.error('Error localizando la orden:', response.status);
        }
    } catch (error) {
        console.error('Error localizando la orden:', error);
        Alert.alert('Error', 'No se pudo localizar la orden.');
    }
};

export const handleProcessOrder = async (orderId, setOrder, order) => {
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
            Alert.alert('Exito', 'Orden localizada correctamente.');
            setOrder({ ...order, orderStatus: 'en proceso' });
        } else {
            console.error('Error localizando la orden:', response.status);
        }
    } catch (error) {
        console.error('Error localizando la orden:', error);
        Alert.alert('Error', 'No se pudo localizar la orden.');
    }
};

export const handleExtraCostOrder = (navigation, orderId) => {
    navigation.navigate('AditionalCost', { orderId });
};

export const handleFinishOrder = (navigation, orderId) => {
    navigation.navigate('ServiceCompleted', { orderId });
};
