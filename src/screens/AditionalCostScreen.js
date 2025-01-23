import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/AditionalCostStyles';
import { FontAwesome } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../../enviroments';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function AditionalCostScreen({ route }) {
    const [extraCosts, setExtraCosts] = useState([]);
    const [selectedCost, setSelectedCost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingCost, setEditingCost] = useState(null);
    const [newPrice, setNewPrice] = useState('');

    const navigation = useNavigation();
    const { orderId } = route.params;

    useEffect(() => {
        const fetchExtraCosts = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const response = await axios.get(`${API_KEY}/orders-ms/extra-cost`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                });
                if (response.status === 200) {
                    setExtraCosts(response.data);
                } else {
                    console.error('Error fetching extra costs:', response.status);
                }
            } catch (error) {
                console.error('Error fetching extra costs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExtraCosts();
    }, []);

    const handleSelectCost = (cost) => {
        setSelectedCost(cost);
    };

    const handleEditCost = (cost) => {
        setEditingCost(cost);
        setNewPrice(cost.price.toString());
    };

    const handleSaveEdit = async () => {
        if (editingCost && newPrice) {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const response = await axios.patch(`${API_KEY}/orders-ms/extra-cost/update/${editingCost.id}`, {
                    defaultPrice: parseFloat(newPrice),
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    const updatedCosts = extraCosts.map(cost =>
                        cost.id === editingCost.id ? { ...cost, price: parseFloat(newPrice) } : cost
                    );
                    setExtraCosts(updatedCosts);
                    setEditingCost(null);
                    setNewPrice('');
                    Alert.alert('Éxito', 'Precio actualizado correctamente.');
                } else {
                    Alert.alert('Error', 'No se pudo actualizar el precio.');
                }
            } catch (error) {
                if (error.response) {
                    console.error('Error actualizando el precio:', error.response.data);
                } else {
                    console.error('Error actualizando el precio:', error.message);
                }
                Alert.alert('Error', 'Ocurrió un error al actualizar el precio.');
            }
        } else {
            Alert.alert('Error', 'Por favor ingrese un nuevo precio.');
        }
    };

    const handleSubmit = async () => {
        if (selectedCost) {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                const response = await axios.patch(`${API_KEY}/orders-ms/order/add-extra-costs/${orderId}`, {
                    ExtraCosts: [selectedCost]
                }, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    Alert.alert('Éxito', 'Costo adicional registrado correctamente.');
                    navigation.goBack();
                } else {
                    Alert.alert('Error', 'No se pudo registrar el costo adicional.');
                }
            } catch (error) {
                console.error('Error registrando el costo adicional:', error);
                Alert.alert('Error', 'Ocurrió un error al registrar el costo adicional.');
            }
        } else {
            Alert.alert('Error', 'Por favor selecciona un costo adicional.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando costos adicionales...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="close" size={18} color="#000" />
            </TouchableOpacity>
            <Image
                source={require('../../assets/icons/cost.png')}
                style={styles.loginImage}
                resizeMode="contain"
            />
            <Text style={styles.title}>Registrar Costo Adicional</Text>
            <ScrollView>
                {extraCosts.map((cost) => (
                    <View key={cost.id} style={styles.radioButtonContainer}>
                        <RadioButton
                            value={cost.id}
                            status={selectedCost?.id === cost.id ? 'checked' : 'unchecked'}
                            onPress={() => handleSelectCost(cost)}
                            color="#FF7F0A" // Cambia el color aquí
                        />
                        <Text style={styles.radioButtonLabel}>{cost.description}</Text>
                        <Text style={styles.radioButtonLabel}>{cost.price}</Text>
                        <TouchableOpacity onPress={() => handleEditCost(cost)}>
                            <FontAwesome name="pencil" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            {editingCost && (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.input}
                        value={newPrice}
                        onChangeText={setNewPrice}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                        <Text style={styles.saveButtonText}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}
