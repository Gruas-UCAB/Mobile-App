import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    icon: {
      marginBottom: 20,
    },
    errorText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#FF3B30',
      marginBottom: 10,
    },
    descriptionText: {
      fontSize: 16,
      color: '#6C757D',
      textAlign: 'center',
      marginBottom: 30,
    },
    retryButton: {
      backgroundColor: '#FF3B30',
      paddingVertical: 15,
      paddingHorizontal: 40,
      borderRadius: 30,
    },
    retryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButton: {
      width: 310,
      borderRadius: 8,
      paddingVertical: 15,
      alignItems: 'center',
      marginTop: 20,
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

export default styles;