import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    exitButton: {
      position: 'absolute',
      top: 40, 
      left: 20,
      zIndex: 10, 
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 90,
    },
    map: {
      flex: 4,
    },
    detailsContainer: {
      position: 'absolute',
      top: 40,
      right: 20,
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      paddingVertical: 10,
      borderRadius: 10,
      
    },
    timer: {
      fontSize: 16,
      color: '#777',
      fontWeight: 'bold',
    },
    contentWrapper: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    infoScrollView: {
      paddingBottom: 20,
    },
    infoContainer: {
      backgroundColor: '#fff',
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
      marginBottom: 10,
    },
    text: {
      fontSize: 14,
      color: '#495057',
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
      marginVertical: 10,
    },
    section: {
      marginTop: 15,
    },
    bottomContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#fff',
      borderTopWidth: 1,
      borderColor: '#e0e0e0',
    },
    rejectButton: {
      backgroundColor: '#fff',
      borderRadius: 10,
      borderWidth: 2,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#FF7F0A',
    },
    rejectButtonText: {
      color: '#FF7F0A',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    startButton: {
      backgroundColor: '#FF7F0A',
      borderRadius: 10,
      paddingHorizontal: 20,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    disabledButton: {
      backgroundColor: '#d6d6d6',
    },
    startButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      marginLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: '80%',
    },
    modalLabel: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      borderRadius: 5,
    },
    modalButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      backgroundColor: '#FF3D0A',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      flex: 1,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default styles;