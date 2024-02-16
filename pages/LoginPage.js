import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { colours } from '../styles/ColoursStyle';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {

    const { signIn } = useAuth();
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async () => {
        try {
            await signIn(formData.email, formData.password);
            console.log('User logged in!');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
  
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={[styles.subtitle, styles.link]}>Don't have an account? Sign up</Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        backgroundColor: colours.input_background,
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    link: {
        color: colours.accent,
        marginTop: 20,
    },
});

export default LoginPage;
