import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const { user } = useAuth();
  if(user)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio'>
          <Stack.Screen name="Login" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }else
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Bienvenido'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="RecoveryPassword" options={{ headerShown: false }} component={PasswordRecoveryScreen} />
          <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}