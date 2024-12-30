import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f8f9fa',
    },
    backButton: {
      marginTop: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
      marginLeft: 15,
    },
    backText: {
      marginLeft: 5,
      fontSize: 16,
      color: '#000',
      marginTop: 20,
      marginLeft: 5,
    },
    header: {
      padding: 16,
      backgroundColor: '#ffffff',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#343a40',
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#343a40',
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 8,
    },
    notificationsList: {
      paddingHorizontal: 16,
    },
    notificationCard: {
      flexDirection: 'row',
      alignItems: 'flex-start', 
      backgroundColor: '#ffffff',
      padding: 12,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 3,
    },
    readNotification: {
      backgroundColor: '#e9ecef',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 12,
    },
    notificationContent: {
      flex: 1,
      marginLeft: 8, 
    },
    user: {
      fontSize: 14,
      fontWeight: '600',
      color: '#343a40',
    },
    message: {
      fontSize: 12,  
      color: '#868e96',
      marginTop: 4,  
    },
    timestamp: {
      fontSize: 12,
      color: '#868e96',
      marginTop: 4,
    },
    markAsReadButton: {
      padding: 8,
      backgroundColor: '#f39d03',
      borderRadius: 5,
    },
    markAsReadText: {
      color: '#fff',
      fontSize: 12,
    },
  });

export default styles;