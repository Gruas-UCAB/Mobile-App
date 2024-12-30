import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start', 
        marginVertical: 54,
        paddingHorizontal: 16, 
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30, 
    },
    logo: {
        width: 200,
        height: 200,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 20, 
    },
    title: {
        color: '#000000', 
        fontWeight: '800',
        fontSize: 38, 
        textAlign: 'center',
        marginBottom: 10, 
    },
    subtitle: {
        color: '#999',
        fontSize: 18,
        textAlign: 'center',
    },
    other: {
        fontSize: 16, 
        textAlign: 'center',
        color: '#777',
        fontWeight: '600', 
        marginTop: 90,
        marginBottom: 10, 
    },
    buttonWrapper: {
        marginBottom: 30, 
    },
    saveButton: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        paddingVertical: 14, 
        paddingHorizontal: 20, 
    },
    buttonIcon: {
        marginRight: 10, 
    },
    saveButtonText: {
        color: '#ffffff', 
        fontSize: 18, 
        fontWeight: 'bold',
    },
    footerTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'end',
        paddingHorizontal: 20,
        paddingVertical: 150,
    },
    footerText: {
        color: '#4a5568',
        fontSize: 16,
    },
    contactText: {
        color: '#f39d03',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default styles;