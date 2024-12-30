import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    loginImage: {
      width: 150,
      height: 150,
      marginTop: 120,
      marginBottom: 40,
      alignSelf: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
      textAlign: 'center',
    },
    input: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
    },
    imagePickerButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
      marginBottom: 15,
      borderBottomWidth: 3,
      borderBottomColor: '#FF7F0A',
    },
    imagePickerText: {
      color: '#777',
      marginLeft: 10,
    },
    imagePreview: {
      width: '100%',
      height: 200,
      marginBottom: 15,
      borderRadius: 8,
    },
    statusText: {
      fontSize: 16,
      marginBottom: 15,
      fontWeight: 'bold',
      color: '#777',
    },
    submitButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
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