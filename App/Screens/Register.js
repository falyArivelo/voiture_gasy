import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';

const Register = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Add your registration logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
    // Navigate to the next screen after successful registration
    navigation.navigate('Home');
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Login here!</Text>
      </TouchableOpacity>
    </View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap:5,

  },
  title: {
    fontSize: 53,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  input: {
    height: 60,
    borderColor: 'transparent',
    borderWidth: 1,
    marginVertical: 8,
    padding: 8,
    paddingLeft:25,
    width: '85%',
    borderRadius: 5,
    fontSize:16,
    backgroundColor:'white',
    ...Platform.select({
        ios: {
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 4,
        },
        android: {
          elevation: 10,
          shadowColor: 'gray'
          
        },
      }),
  },
  registerButton: {
    backgroundColor: 'black',
    padding: 25,
    borderRadius: 5,
    width: '85%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 100,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
});

export default Register;
