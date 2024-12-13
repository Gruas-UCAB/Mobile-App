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
import DashboardScreen from '../screens/DashboardScreen';
import UserManagement from '../screens/UserManagement';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ServiceCompletedScreen from '../screens/ServiceCompletedScreen';
import AditionalCostScreen from '../screens/AditionalCostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';


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
          <Stack.Screen name="UserManagement" options={{ headerShown: false }} component={UserManagement} />
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
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="UserManagement" options={{ headerShown: false }} component={UserManagement} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="ServiceCompleted" component={ServiceCompletedScreen} />
          <Stack.Screen name="AditionalCost" component={AditionalCostScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
}