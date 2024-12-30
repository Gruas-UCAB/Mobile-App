import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
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
  header: {
    marginTop: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileId: {
    fontSize: 16,
    color: '#777',
  },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#FF7F0A',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCount: {
    fontSize: 16,
    color: '#888',
    marginRight: 10,
  },
  preferenceOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default styles;
