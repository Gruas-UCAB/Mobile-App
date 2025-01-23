import { View, Text, TextInput, Switch, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ServiceCompleteStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY } from '../../enviroments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function ServiceCompletedScreen({ route }) {
    const [isArrived, setIsArrived] = useState(false);
    const [isServiceCompleted, setIsServiceCompleted] = useState(false);
    const [notes, setNotes] = useState('');
    const [hasAdditionalCosts, setHasAdditionalCosts] = useState(false);

    const navigation = useNavigation();
    const { orderId } = route.params;

    const toggleArrived = () => setIsArrived(previousState => !previousState);
    const toggleServiceCompleted = () => setIsServiceCompleted(previousState => !previousState);

    const handleFinish = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/finish/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Éxito', 'El servicio ha sido finalizado.');
                navigation.navigate('Dashboard');
            } else {
                Alert.alert('Error', 'No se pudo finalizar el servicio.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al finalizar el servicio.');
            console.error('Error finishing service:', error);
        }
    };

    const handleCancel = async () => {
        try {
            const userToken = await AsyncStorage.getItem('userToken');
            const response = await axios.patch(`${API_KEY}/orders-ms/order/cancel/${orderId}`, {}, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            if (response.status === 200) {
                Alert.alert('Cancelado', 'El servicio ha sido cancelado.');
                navigation.navigate('OrderDetails');
            } else {
                Alert.alert('Error', 'No se pudo cancelar el servicio.');
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al cancelar el servicio.');
            console.error('Error canceling service:', error);
        }
    };

    return (
        <View style={styles.container}>

            <Image
                source={require('../../assets/icons/confirm.png')}
                style={styles.loginImage}
                resizeMode="contain"
            />
            
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="close" size={18} color="#777" />
            </TouchableOpacity>

            <Text style={styles.header}>Confirmación de Servicio</Text>

            <View style={styles.row}>
                <Ionicons name={isArrived ? 'checkmark-circle' : 'ellipse'} size={24} color="#FF7F0A" />
                <Text style={styles.text}>Confirmar llegada al lugar</Text>
                <Switch
                    value={isArrived}
                    onValueChange={toggleArrived}
                    trackColor={{ false: "#767577", true: "#FFD700" }}
                    thumbColor={isArrived ? "#fff" : "#f4f3f4"}
                />
            </View>

            <View style={styles.row}>
                <Ionicons name={isServiceCompleted ? 'checkmark-circle' : 'ellipse'} size={24} color="#FF7F0A" />
                <Text style={styles.text}>Confirmar que el servicio fue completado</Text>
                <Switch
                    value={isServiceCompleted}
                    onValueChange={toggleServiceCompleted}
                    trackColor={{ false: "#767577", true: "#FFD700" }}
                    thumbColor={isServiceCompleted ? "#fff" : "#f4f3f4"}
                />
            </View>

            <View style={styles.buttonRow}>
                <TouchableOpacity onPress={handleCancel} activeOpacity={0.7} style={styles.buttonWrapper}>
                    <LinearGradient
                        colors={['#FF7F0A', '#FF3D0A']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.saveButtonText}>Cancelar</Text>
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleFinish} activeOpacity={0.7} style={styles.buttonWrapper} disabled={!isArrived || !isServiceCompleted}>
                    <LinearGradient
                        colors={['#FF7F0A', '#FF3D0A']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.acceptButton}
                    >
                        <Text style={styles.saveButtonText}>Finalizar</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>
    );
}
