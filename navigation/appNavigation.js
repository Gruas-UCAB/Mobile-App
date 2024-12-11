import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import useAuth from '../hooks/useAuth';

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
  const { user } = useAuth();
  if(user)
  {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Inicio'>
          <Stack.Screen name="Login" options={{headerShown: false}} component={HomeScreen} />
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
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}