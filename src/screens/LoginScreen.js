import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginStyles';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authenticateUser = async (email, password) => {
    try {
        const response = await axios.post('https://c8da-2a0d-5600-6-2000-2fbf-eeb-7a3c-c8ed.ngrok-free.app/auth/login', {
            email,
            password,
        });

        if (response.status === 200) {
            const { token } = response.data;
            await AsyncStorage.setItem('userToken', token);
            return token;
        } else {
            Alert.alert('Error', 'Credenciales incorrectas.');
            return null;
        }
    } catch (error) {
        console.error('Authentication error:', error);
        Alert.alert('Error', 'Hubo un problema al iniciar sesión.');
        return null;
    }
};

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        const token = await authenticateUser(email, password);
        if (token) {
            navigation.navigate('Dashboard', { token });
        } else {
            Alert.alert('Error', 'Inicio de sesión fallido.');
        }
    };

    return (
        <View color={'#fff'} style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="account-outline" size={20} color="#777" />
                    <TextInput
                        placeholder="Usuario"
                        placeholderTextColor="#777"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <MaterialCommunityIcons name="lock-outline" size={20} color="#777" />
                    <TextInput
                        placeholder="Contraseña"
                        placeholderTextColor="#777"
                        style={styles.input}
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <MaterialCommunityIcons
                            name={showPassword ? 'eye' : 'eye-off'}
                            size={20}
                            color="#777"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
                <LinearGradient
                    colors={['#FF7F0A', '#FF3D0A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Iniciar Sesión</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}
