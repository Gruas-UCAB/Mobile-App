import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/PasswordRecoveryStyles';
import React, { useState } from 'react';

export default function PasswordChangeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <TouchableOpacity 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        <ArrowLeftIcon size={24} color="#000" />
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <Image 
        source={{ uri: 'https://img.icons8.com/?size=100&id=50827&format=png&color=000000' }}
        style={styles.icon}
      />
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <Text style={styles.subtitle}>
        Ingresa tu nueva correo abajo, te enviaremos un correo para recuperar tu contraseña.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        placeholderTextColor="#BDBDBD"
        secureTextEntry
      />

      <TouchableOpacity onPress={()=> navigation.navigate('ChangePassword')} activeOpacity={0.7}>
        <LinearGradient
          colors={['#FF7F0A', '#FF3D0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Recuperar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}