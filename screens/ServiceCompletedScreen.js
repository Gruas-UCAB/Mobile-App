import { View, Text, TextInput, Switch, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/ServiceCompleteStyles';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';

export default function ServiceCompletedScreen() {
  const [isArrived, setIsArrived] = useState(false);
  const [isServiceCompleted, setIsServiceCompleted] = useState(false);
  const [notes, setNotes] = useState('');
  const [hasAdditionalCosts, setHasAdditionalCosts] = useState(false);
  
  const navigation = useNavigation();

  const toggleArrived = () => setIsArrived(previousState => !previousState);
  const toggleServiceCompleted = () => setIsServiceCompleted(previousState => !previousState);


  const handleSubmit = () => {
    if (isArrived && isServiceCompleted) {
      Alert.alert(
        'Éxito',
        'Servicio confirmado! Detalles enviados.',
        [
          { text: 'OK', onPress: () => {}, style: 'destructive' },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        'Error',
        'Por favor, confirma los detalles antes de proceder.',
        [
          { text: 'OK', onPress: () => {}, style: 'destructive' },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/icons/confirm.png')}
        style={styles.loginImage}
        resizeMode="contain"
      />
      
      <Text style={styles.header}>Confirmación de Servicio</Text>

      <View style={styles.row}>
        <Ionicons name={isArrived ? 'checkmark-circle' : 'ellipse'} size={24} color="#FF7F0A" />
        <Text style={styles.text}>Confirmar llegada al lugar</Text>
        <Switch 
          value={isArrived} 
          onValueChange={toggleArrived} 
          trackColor={{ false: "#767577", true: "#FFD700" }}
          thumbColor={isArrived ? "#fff" : "#f4f3f4"} 
        />
      </View>

      <View style={styles.row}>
        <Ionicons name={isServiceCompleted ? 'checkmark-circle' : 'ellipse'} size={24} color="#FF7F0A" />
        <Text style={styles.text}>Confirmar que el servicio fue completado</Text>
        <Switch 
          value={isServiceCompleted} 
          onValueChange={toggleServiceCompleted} 
          trackColor={{ false: "#767577", true: "#FFD700" }}
          thumbColor={isServiceCompleted ? "#fff" : "#f4f3f4"} 
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Notas sobre el servicio"
        value={notes}
        onChangeText={setNotes}
        multiline
        numberOfLines={4}
      />
      
      <TouchableOpacity onPress={() => navigation.navigate('AditionalCost')} style={styles.additionalCostButton}>    
        <View style={styles.row}>
          <Ionicons name={hasAdditionalCosts ? 'cash' : 'cash-outline'} size={24} color="#777" />
          <Text style={styles.text}>Agregar costos adicionales</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} activeOpacity={0.7}>
        <LinearGradient
          colors={['#FF7F0A', '#FF3D0A']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButton}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}