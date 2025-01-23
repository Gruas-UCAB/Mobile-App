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
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  notificationContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#e8993a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'red',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  refreshButtonContainer: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  refreshButton: {
    backgroundColor: '#e8993a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 2,
  },
  welcomeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
    opacity: 0.9,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 10,
  },
  bodyContainer: {
    borderTopRightRadius:40,
    borderTopLeftRadius:40,
    backgroundColor:'white',
    paddingVertical: 55,
    paddingHorizontal: 20,
    width: '100%',
    height: '100%',
  },
  textoDeOrden: {
    color: '#000',
    fontSize: 20,
    marginBottom: 6,
    paddingHorizontal: 26,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  orderCardContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
  
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    elevation: 7,
  },
  
  orderTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  
  statusBadge: {
    backgroundColor: '#49e83a',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
  },
  
  statusBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 8,
  },
  
  orderMiddleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  
  locationColumn: {
    alignItems: 'center',
    flex: 1,
  },
  
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  
  locationDate: {
    fontSize: 14,
    color: '#888',
  },
  orderBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  accidentType: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flexWrap: 'wrap',
  },

  userRole: {
    fontSize: 12,
    color: '#888',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#888888',
    fontSize: 18,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.11,
    shadowRadius: 8,
    elevation: 8,
  },
  footerIcon: {
    alignItems: 'center',
  },
  footerText: {
    color: '#e67f02',
    fontSize: 12,
    fontWeight: '800',
    marginTop: 4,
  },

});

export default styles;