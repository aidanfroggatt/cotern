import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';

const LandingPage = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cotern</Text>
            <Image
                source={require('../assets/landing-page-image.png')}
                style={{resizeMode: 'contain', width: '100%', height: 300, marginBottom: 20}}
            />
            <Button title="Create Account" onPress={() => navigation.navigate('Signup')} />
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },
    title: {
        fontSize: 70,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#007BFF', // Adjust color as needed
        marginTop: 20,
    },
});

export default LandingPage;
