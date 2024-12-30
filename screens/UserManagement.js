import { MaterialIcons, FontAwesome5, Feather, Entypo } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/UserManagementStyles';
import { auth } from '../config/firebase';
import React, { useState } from 'react';

export default function UserManagement() {
  const [notificaciones, setNotificaciones] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Welcome');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ArrowLeftIcon size={24} color="#000" marginTop={20}/>
        <Text style={styles.backText}>Atrás</Text>
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
          <Switch  style={styles.optionButton} value={notificaciones} onValueChange={setNotificaciones} />
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
