import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/LoginStyles';
import React, { useState } from 'react';

export default function App() {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        source={require('../assets/images/logo.png')}
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
          />
        </View>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="lock-outline" size={20} color="#777" />
          <TextInput
            placeholder="Contraseña"
            placeholderTextColor="#777"
            style={styles.input}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialCommunityIcons
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#777"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} activeOpacity={0.7}>
        <LinearGradient
          colors={['#FF7F0A', '#FF3D0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Iniciar Sesion</Text>
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