import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff', 
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    backButton: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    backText: {
      marginLeft: 5,
      fontSize: 16,
      color: '#000',
      marginTop: 20,
      marginLeft: 5,
    },
    iconContainer: {
      alignItems: 'center',
      marginTop: 30,
      marginBottom: 20,
    },
    keyIcon: {
      width: 80,
      height: 80,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 8,
      color: '#000',
    },
    subtitle: {
      fontSize: 14,
      textAlign: 'center',
      color: '#777',
      marginHorizontal: 40,
      marginBottom: 30,
    },
    other: {
      fontSize: 14,
      textAlign: 'center',
      color: '#777',
      marginHorizontal: 40,
      marginBottom: 10,
      marginTop: 5,
    },
    input: {
      width: '100%',
      height: 50,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: '#ccc',
      color: '#000',
    },
    saveButton: {
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