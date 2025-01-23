import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e67f02',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 120,
        paddingHorizontal: 20,
    },
    headerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        padding: 10,
    },
    headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 20,
    },
    exitButton: {
      position: 'absolute',
      top: 40, 
      left: 20,
      zIndex: 10, 
      padding: 10,
    },
    map: {
      flex: 4,
    },
    mapContainer: {
        flex: 4,
        overflow: 'hidden',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    mapWrapper: {
        flex: 1,
        overflow: 'hidden',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
    },
    map: {
        flex: 1,
    },
    detailsContainer: {
      position: 'absolute',
      top: 40,
      right: 20,
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      paddingVertical: 10,      
    },
    contentWrapper: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
    },
    infoScrollView: {
      paddingBottom: 20,
    },
    infoContainer: {
      backgroundColor: '#fff',
      padding: 20,
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
  flexWrap: 'wrap',
  justifyContent: 'center',
  marginTop: 16,
},

acceptButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderColor: '#FF7F0A', 
  borderWidth: 2,
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  margin: 4, 
  marginBottom: 16,
},

acceptButtonText: {
  color: 'orange',
  marginLeft: 8,
  fontSize: 14,
  fontWeight: '600',
},
rejectButton: {
  flexDirection: 'row',
  alignItems: 'center',
  paddingVertical: 10,
  borderColor: 'red',
  borderWidth: 2,
  paddingHorizontal: 16,
  borderRadius: 8,
  margin: 4,
  marginBottom: 16,

},
rejectButtonText: {
  color: 'red', 
  marginLeft: 8,
  fontSize: 14,
  fontWeight: '600',
},
costButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderColor: 'green', 
  borderWidth: 2,
  paddingVertical: 10,
  paddingHorizontal: 16,
  borderRadius: 8,
  margin: 4, 
  marginBottom: 16,
},

costButtonText: {
  color: 'green',
  marginLeft: 8,
  fontSize: 14,
  fontWeight: '600',
},

    disabledButton: {
      backgroundColor: '#d6d6d6',
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
    inProcessButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#FF7F0A',
        marginTop: 10,
    },
    inProcessButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    infoScrollView: {
      padding: 16,
    },
    
    infoContainer: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    
      // Sombra en iOS:
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      // Sombra en Android:
      elevation: 8,
    },
    
    /* Sección de direcciones */
    locationSection: {
      marginBottom: 8,
    },
    
    locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#ffdebf',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    
    locationTextContainer: {
      flexDirection: 'column',
    },
    
    locationSeparator: {
      borderLeftWidth: 2,
      borderColor: '#DDD',
      height: 40,
      marginLeft: 20,
      marginBottom: 12,
      // O un estilo punteado:
      // borderStyle: 'dashed',
    },
    
    divider: {
      height: 1,
      backgroundColor: '#E6E6E6',
      marginVertical: 12,
    },
    
    /* Sección info del usuario repartidor */
    userRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    
    userImage: {
      width: 45,
      height: 45,
      borderRadius: 22.5,
      marginRight: 10,
    },
    
    userName: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
    },
    
    userRole: {
      fontSize: 13,
      color: '#888',
    },
    
    iconButton: {
      backgroundColor: '#ffdebf',
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 8,
    },
    
    /* Sección inferior: peso y estado */
    infoBottomRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    
    statusBadge: {
      backgroundColor: '#49e83a',
      paddingHorizontal: 12,
      paddingVertical: 4,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
    },
    
    statusBadgeText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: '600',
    },
    
    /* General: labels y texto */
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    
    text: {
      fontSize: 13,
      color: '#ccc',
      textTransform: 'capitalize',
    },
    
  });

export default styles;