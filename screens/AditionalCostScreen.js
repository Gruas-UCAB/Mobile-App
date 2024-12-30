import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/AditionalCostStyles';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function AditionalCostScreen() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [status, setStatus] = useState('aprobada');  
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = () => {
    if (description === '' || amount === '') {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
    } else {
      
      setStatus('Pendiente');
      Alert.alert('Solicitud Enviada', 'Tu solicitud está en espera de aprobación.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icons/cost.png')}
        style={styles.loginImage}
        resizeMode="contain"
      />

      <Text style={styles.title}>Registrar Costo Adicional</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción del costo adicional"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Ionicons name="camera" size={24} color="#777" />
        <Text style={styles.imagePickerText}>
          {imageUri ? 'Cambiar Foto' : 'Adjuntar Foto'}
        </Text>
      </TouchableOpacity>

      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      <Text style={[styles.statusText, styles[status.toLowerCase()]]}>
        Estado: {status}
      </Text>


      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
        <LinearGradient
          colors={['#FF7F0A', '#FF3D0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Enviar para Aprobación</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}