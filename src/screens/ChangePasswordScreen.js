import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Image,
  SafeAreaView
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ChangePasswordStyles';

export default function ChangePasswordScreen() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      console.log('Contraseña cambiada exitosamente');
      navigation.navigate('Welcome');
    } else {
      console.log('Las contraseñas no coinciden');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ArrowLeftIcon size={24} color="#000" marginTop={20}/>
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <View style={styles.iconContainer}>
        <Image 
          marginTop={30} 
          marginBottom={5}
          source={require('../../assets/icons/password-icon.png')}
          style={styles.keyIcon}
        />
      </View>

      <Text style={styles.title}>Cambiar Contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa tu nueva contraseña abajo, confirmala para ser cuidadosos.
      </Text>
    
      <Text style={styles.other}>
        Nueva Contraseña
      </Text>    
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <Text style={styles.other}>
        Confirma Contraseña
      </Text>      
      <TextInput
        style={styles.input}
        placeholder="Confirma Contraseña"
        placeholderTextColor="#999"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity onPress={handleChangePassword} activeOpacity={0.7}>
      <LinearGradient
        colors={['#FF7F0A', '#FF3D0A']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.saveButton}
      >
        <Text style={styles.saveButtonText}>Guardar</Text>
      </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}