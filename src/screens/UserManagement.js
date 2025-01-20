import { MaterialIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/UserManagementStyles';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

export default function UserManagement() {
    const [notificaciones, setNotificaciones] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(false);
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userToken');
            console.log('Token eliminado correctamente');
            await AsyncStorage.removeItem('userId');
            console.log('ID de usuario eliminado correctamente');
            await AsyncStorage.removeItem('name');
            console.log('Nombre de usuario eliminado correctamente');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error al eliminar los datos del usuario:', error);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
                <FontAwesome name="close" size={18} color="#777" />
            </TouchableOpacity>

            <View style={styles.header}>
                <Image
                    source={{ uri: 'https://img.icons8.com/?size=100&id=42215&format=png&color=000000' }}
                    style={styles.profileImage}
                />
                <Text style={styles.profileName}>Myke Tyson</Text>
                <Text style={styles.profileId}>ABC-1234</Text>
            </View>

            <View>
                <Text style={styles.sectionTitle}>Preferencias</Text>
                <View style={styles.preferenceOption}>
                    <View style={styles.optionContent}>
                        <Entypo name="notification" size={24} color="#777" />
                        <Text style={styles.optionText}>Notificaciones</Text>
                    </View>
                    <Switch style={styles.optionButton} value={notificaciones} onValueChange={setNotificaciones} />
                </View>
                <View style={styles.preferenceOption}>
                    <View style={styles.optionContent}>
                        <FontAwesome5 name="envelope" size={24} color="#777" />
                        <Text style={styles.optionText}>Notificaciones por Email</Text>
                    </View>
                    <Switch value={emailNotifications} onValueChange={setEmailNotifications} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>General</Text>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('ChangePassword')}>
                    <View style={styles.optionContent}>
                        <MaterialIcons name="key" size={24} color="#777" />
                        <Text style={styles.optionText}>Cambiar Contraseña</Text>
                    </View>
                    <Feather name="chevron-right" size={24} color="#777" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={handleLogout}
                style={styles.logoutButton}
            >
                <MaterialIcons name="logout" size={24} color="#FF0000" />
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
}
