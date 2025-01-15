import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/OrderDetailsStyles';
import Geocoder from 'react-native-geocoding';

export default function OrderDetailsScreen() {
  const navigation = useNavigation(); 

  const order = {
    name: 'Carlos Perez',
    date: 'May 29, 2020',
    time: '8:30 AM',
    vehicle: '2020 Ford Ecosport',
    vin: 'AEK00E',
    color: 'Brown',
    address: 'Sambil la Candelaria, Caracas, Venezuela',
  };

  const [orderLocation, setOrderLocation] = useState({
    latitude: 10.4806,
    longitude: -66.9036,
  });
  
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isOrderRejected, setIsOrderRejected] = useState(false); 
  const [estimatedTime, setEstimatedTime] = useState(0); 

  useEffect(() => {
    let isMounted = true; 

    Geocoder.init("AIzaSyAEzlFUYYgDgPPud2V75M2rXjd8LP3MIX4"); 

    Geocoder.from(order.address)
      .then(json => {
        if (isMounted) { 
          const location = json.results[0].geometry.location;
          setOrderLocation({
            latitude: location.lat,
            longitude: location.lng,
          });
          setLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          console.warn(error);
          setLoading(false);
        }
      });

    return () => { isMounted = false }; 
  }, []);

  useEffect(() => {
    if (!isOrderRejected) {
      const timer = setInterval(() => {
        setEstimatedTime(prevTime => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [isOrderRejected]);

  const handleStart = useCallback(() => {
    
    
    console.log('Service Started');
    
    navigation.navigate('ServiceCompleted');
  }, [navigation]);

  const handleReject = () => {
    setModalVisible(true); 
  };

  const handleSaveRejection = () => {
    console.log('Rejection Reason:', rejectionReason);
    setModalVisible(false); 
    setRejectionReason(''); 
    setIsOrderRejected(true); 
  };

  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando mapa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.exitButton} onPress={() => navigation.goBack()}>
        <FontAwesome name="close" size={18} color="#777" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        region={{
          latitude: orderLocation.latitude,
          longitude: orderLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: orderLocation.latitude, longitude: orderLocation.longitude }}
          title="Ubicación de Recogida"
          description={order.address}
        />
      </MapView>

      <View style={styles.detailsContainer}>
        <Text style={styles.timer}>{formatTime(estimatedTime)}</Text>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView contentContainerStyle={styles.infoScrollView}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{order.name}</Text>
            <Text style={styles.text}>{order.address}</Text>

            <View style={styles.section}>
              <Text style={styles.label}>Detalles de Orden</Text>
              <Text style={styles.text}>Hora Requerida: {order.time}</Text>
              <Text style={styles.text}>Fecha: {order.date}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Información del Vehículo</Text>
              <Text style={styles.text}>Vehículo: {order.vehicle}</Text>
              <Text style={styles.text}>Placa: {order.vin}</Text>
              <Text style={styles.text}>Color: {order.color}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
            <FontAwesome name="ban" size={24} color="#FF7F0A" /> 
            <Text style={styles.rejectButtonText}>Rechazar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.startButton, isOrderRejected && styles.disabledButton]}
            onPress={handleStart} 
            disabled={isOrderRejected}
          >
            <FontAwesome name="location-arrow" size={24} color="white" />
            <Text style={styles.startButtonText}>Iniciar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalLabel}>Razón de Rechazo</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ingresa la razón"
              value={rejectionReason}
              onChangeText={setRejectionReason}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveRejection}>
                <Text style={styles.modalButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}