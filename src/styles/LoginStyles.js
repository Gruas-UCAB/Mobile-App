import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    backButton: {
      position: 'absolute', 
      top: 50,             
      left: 20,            
      flexDirection: 'row',
      alignItems: 'center',
    },
    backIcon: {
      marginTop: 0, 
    },
    backText: {
      marginLeft: 5, 
      fontSize: 16,
      color: '#000',
    },
    loginImage: {
      width: 250,
      height: 250,
      marginBottom: 0,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 50,
    },
    title: {
      fontSize: 28,
      color: '#000',
      fontWeight: 'bold',
      marginTop: 10,
    },
    subtitle: {
      fontSize: 14,
      color: '#999',
      marginTop: 5,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 30,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      paddingHorizontal: 15,
      marginBottom: 15,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    input: {
      flex: 1,
      height: 50,
      color: '#000',
      marginLeft: 10,
    },
    saveButton: {
      width: 320,
      borderRadius: 15,
      paddingVertical: 15,
      alignItems: 'center',
      backgroundColor: '#FF4500',
    },
    saveButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '80%',
      marginTop: 20,
    },
    footerText: {
      color: '#f39d03',
      fontSize: 14,
    },
  });

export default styles;