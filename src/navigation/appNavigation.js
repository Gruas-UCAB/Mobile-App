import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import PasswordRecoveryScreen from '../screens/PasswordRecoveryScreen';
import LoginScreen from '../screens/LoginScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import DashboardScreen from '../screens/DashboardScreen';
import UserManagement from '../screens/UserManagement';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ServiceCompletedScreen from '../screens/ServiceCompletedScreen';
import AditionalCostScreen from '../screens/AditionalCostScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import ErrorScreen from '../screens/ErrorScreen';
import HistoricOrderScreen from '../screens/HistoricOrderScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    const user = true; 
    if (!user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePasswordScreen} />
                    <Stack.Screen name="UserManagement" options={{ headerShown: false }} component={UserManagement} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    } else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Welcome'>
                    <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                    <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
                    <Stack.Screen name="RecoveryPassword" options={{ headerShown: false }} component={PasswordRecoveryScreen} />
                    <Stack.Screen name="ChangePassword" options={{ headerShown: false }} component={ChangePasswordScreen} />
                    <Stack.Screen name="Dashboard" options={{ headerShown: false }} component={DashboardScreen} />
                    <Stack.Screen name="UserManagement" options={{ headerShown: false }} component={UserManagement} />
                    <Stack.Screen name="OrderDetails" options={{ headerShown: false }} component={OrderDetailsScreen} />
                    <Stack.Screen name="ServiceCompleted" options={{ headerShown: false }} component={ServiceCompletedScreen} />
                    <Stack.Screen name="AditionalCost" options={{ headerShown: false }} component={AditionalCostScreen} />
                    <Stack.Screen name="Notifications" options={{ headerShown: false }} component={NotificationsScreen} />
                    <Stack.Screen name="HistoricOrder" options={{ headerShown: false }} component={HistoricOrderScreen} />
                    <Stack.Screen name="Error" options={{ headerShown: false }} component={ErrorScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}
