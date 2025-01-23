import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginStyles';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_KEY } from '../../enviroments';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const authenticateUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_KEY}/users-ms/auth/login`, {
            email: email.toLowerCase(),
            password,
        });

        if (response.status === 200) {
            const { token, user } = response.data;
            const userId = user.userId;
            const name = user.name;
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userId', userId);
            await AsyncStorage.setItem('name', name);
            return { token, userId, name };
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
        const result = await authenticateUser(email, password);
        if (result) {
            const { token, userId, name } = result; 
            navigation.navigate('Dashboard', { token, userId, name });
        } else {
            Alert.alert('Error', 'Inicio de sesión fallido.');
        }
    };

    return (
        <View color={'#fff'} style={styles.container}>
                  <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ArrowLeftIcon size={24} color="#000" style={styles.backIcon} />
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.loginImage}
        resizeMode="contain"
      />

      <View style={styles.logoContainer}>
        <Text style={styles.title}>UCAB</Text>
        <Text style={styles.subtitle}>Bienvenido nuevamente</Text>
      </View>

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

            <View style={styles.footer}>
                <TouchableOpacity onPress={()=> navigation.navigate('RecoveryPassword')}>
                <Text style={styles.footerText}>recuperar contraseña?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
