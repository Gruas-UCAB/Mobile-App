import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { themeColors } from '../theme';
import { auth } from '../config/firebase';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'

export default function UserManagement() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Welcome');
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  };

  const handleSaveSettings = () => {
    console.log('Configuraciones guardadas:', {
      username,
      password,
      pushNotifications,
      emailNotifications,
    });
    navigation.goBack()
  };

  return (
    <View className="flex-1 border-[#2f303d]" style={{ backgroundColor: themeColors.bg2, justifyContent: 'center', alignItems: 'center', paddingTop: 100 }}>

    <View className="flex-row justify-start">
        <TouchableOpacity onPress={()=> navigation.goBack()} 
        className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
        <ArrowLeftIcon size="20" color="white" />
        </TouchableOpacity>
    </View>

      <View className="flex-1 px-8 pt-8" style={{ backgroundColor: '#0f101b', borderTopLeftRadius: 50, borderTopRightRadius: 50 }}>
        <Text className="text-white text-3xl font-bold text-center mb-5">Configuración del Usuario</Text>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white">Notificaciones Push</Text>
          <Switch
            value={pushNotifications}
            onValueChange={setPushNotifications}
          />
        </View>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white">Notificaciones por Email</Text>
          <Switch
            value={emailNotifications}
            onValueChange={setEmailNotifications}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} className="py-3 mb-2 mt-4" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Cambiar Contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSaveSettings} className="py-3 mb-2 mt-4" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Guardar Configuraciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} className="py-3 mt-5" style={{ backgroundColor: '#f39d03', borderRadius: 15 }}>
          <Text className="text-xl font-bold text-center text-white">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}