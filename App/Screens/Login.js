import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('falyarivelo@gmail.com');
  const [password, setPassword] = useState('falyarivelo');

  const handleLogin = async () => {
    try {
      
      const response = await axios.post('http://192.168.88.17:8080/auth/loginApp', {
        mail: username,
        password: password,
      });

      if (response.status !== 401) {
        // Stocker le token et les informations de l'utilisateur dans SecureStore
        await SecureStore.setItemAsync('token', response.data.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.data.userId));

        console.log('Login successful', response.data);
        navigation.navigate('Home');
      }
      else {
        console.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
    // navigation.navigate('Home');
  };

  return (
    // <ImageBackground source={require('../../consts/assets/bg2.jpg')} style={styles.backgroundImage} >
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupLink}>Don't have an account? Sign up here!</Text>
        </TouchableOpacity>
      </View>

    </>
    // </ImageBackground>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 10,
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
    paddingLeft: 25,
    width: '85%',
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: 'white',
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
  loginButton: {
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
  signupLink: {
    marginTop: 100,
    color: 'gray',
    textDecorationLine: 'underline',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' or 'contain'
  },
});

export default Login;
