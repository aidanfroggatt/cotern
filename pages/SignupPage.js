import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
import { colours } from '../styles/Colours';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateAccount = () => {
    console.log('Create Account pressed');
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Connect with other co-op students now!</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange('name', text)}
      />
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
      <Button title="Create Account" onPress={handleCreateAccount} />
      <TouchableOpacity onPress={() => console.log("redirecting...")}>
        <Text style={[styles.subtitle, styles.link]}>Already have an account?</Text>
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

export default SignupPage;
