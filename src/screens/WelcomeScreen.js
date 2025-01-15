import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../styles/WelcomeStyles';
import React from 'react';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <ImageBackground
            style={styles.container}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.content}>
                    <View style={styles.logoContainer}>
                        <Image 
                            source={require("../../assets/images/logo.png")}
                            style={styles.logo} 
                            resizeMode="contain"
                        />
                    </View>
                    
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>
                            GRUAS UCAB
                        </Text>
                        <Text style={styles.subtitle}>
                            Tu grúa a solo un toque de distancia
                        </Text>
                    </View>
                    
                    <Text style={styles.other}>
                        Vamos a comenzar
                    </Text>     
                    <TouchableOpacity 
                            onPress={() => navigation.navigate('Login')} 
                            activeOpacity={0.7}
                            style={styles.buttonWrapper}>
                            <LinearGradient
                                colors={['#FF7F0A', '#FF3D0A']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.saveButton}>
                                <Icon name="sign-in" size={20} color="#ffffff" style={styles.buttonIcon} />
                                <Text style={styles.saveButtonText}>Iniciar Sesión</Text>
                            </LinearGradient>
                    </TouchableOpacity>
                    
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText}>¿No tienes una cuenta? </Text>
                        <Text style={styles.contactText}>Contacta a tu administrador</Text>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}