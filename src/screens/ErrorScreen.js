import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ErrorStyles.js';
import React from 'react';

export default function ErrorScreen() {
  const handleRetry = () => {
    console.log('Reintentar conexión');
  };

  return (
    <View style={styles.container}>
      <Icon name="warning" size={150} color="#FF7F0A" style={styles.icon} />

      <Text style={styles.errorText}>Error!</Text>
      <Text style={styles.descriptionText}>Algo salió super mal</Text>

      <TouchableOpacity onPress={handleRetry} activeOpacity={0.7}>
        <LinearGradient
          colors={['#FF7F0A', '#FF3D0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Recargar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}