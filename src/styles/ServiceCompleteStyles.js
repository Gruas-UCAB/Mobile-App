import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    exitButton: {
      left: 20,
      zIndex: 10, 
      padding: 10,
    },
    loginImage: {
      width: 200,
      height: 200,
      marginBottom: 20,
      alignSelf: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    text: {
      fontSize: 16,
      marginLeft: 10,
      flex: 1,
      color: '#333',
    },
    input: {
      height: 100,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 20,
      borderRadius: 8,
      textAlignVertical: 'top',
    },
    additionalCostButton : {
      padding: 10,
      borderRadius: 8,
      marginBottom: 20,
      borderColor: '#FF7F0A',
      borderBottomWidth: 1,
      alignContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
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
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
    acceptButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
  });
  
export default styles;