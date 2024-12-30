import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 25,
    },
    backText: {
      fontSize: 16,
      color: '#000',
      marginLeft: 5,
    },
    icon: {
      width: 80,
      height: 80,
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333333',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 14,
      color: '#666666',
      textAlign: 'center',
      marginHorizontal: 20,
      marginBottom: 30,
    },
    input: {
      width: '100%',
      height: 50,
      borderColor: '#E0E0E0',
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 15,
      fontSize: 16,
      marginBottom: 15,
      backgroundColor: '#F9F9F9',
    },
    saveButton: {
      width: 250,
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