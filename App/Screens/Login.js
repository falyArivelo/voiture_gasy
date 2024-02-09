import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Colors from '../Shared/Colors';
import global from '../Shared/style/style';
import { SafeAreaView } from 'react-native';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('falyarivelo@gmail.com');
  const [password, setPassword] = useState('faly');
  const [erreur, setErreur] = useState(null);

  const [inputStates, setInputStates] = useState([
    { id: 1, isFocused: false },
    { id: 2, isFocused: false },
  ]);

  const handleFocusChange = (id, isFocused) => {
    setInputStates((prevInputStates) =>
      prevInputStates.map((state) =>
        state.id === id ? { ...state, isFocused } : state
      )
    );
  };

  const handleLogin = async () => {
    try {

      const response = await axios.post('http://192.168.88.29:8080/auth/loginApp', {
        mail: username,
        password: password,
      });

      if (response.status !== 401) {
        // Stocker le token et les informations de l'utilisateur dans SecureStore
        await SecureStore.setItemAsync('token', response.data.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.data.userId));

        console.log('Login successful', response.data);
        // navigation.navigate('Home');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Remplacez 'RootScreen' par le nom de votre écran racine
        });
      }
      else {
        // console.error('Invalid credentials');
        setErreur("Veuillez reessayer ")
      }
    } catch (error) {
      // console.error('Login failed', error);
      setErreur("Veuillez Entrer les Bonnes Coordonnées")
    }
    // navigation.navigate('Home');
  };

  return (
    // <ImageBackground source={require('../../consts/assets/bg2.jpg')} style={styles.backgroundImage} >
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput
          placeholder="Email"
          value={username}
          onChangeText={setUsername}
          key={1}
          style={[styles.input, {
            borderColor: inputStates[0].isFocused ? Colors.INPUT_FOCUS : 'transparent',
            borderWidth: 2,
          }]}
          onFocus={() => handleFocusChange(1, true)}
          onBlur={() => handleFocusChange(1, false)}
        />

        <TextInput
          placeholder="Mot de Passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          key={2}
          style={[styles.input, {
            borderColor: inputStates[1].isFocused ? Colors.INPUT_FOCUS : 'transparent',
            borderWidth: 2,
          }]}
          onFocus={() => handleFocusChange(2, true)}
          onBlur={() => handleFocusChange(2, false)}
        />

        <View style={global.erreur}>
          {erreur ? (
            <Text style={global.messageErreur}>{erreur}</Text>
          ) : (
            // Votre contenu normal à afficher lorsque tout se passe bien
            <></>
          )}
        </View>
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
    height: 65,
    borderColor: 'transparent',
    borderWidth: 1,
    marginVertical: 5,
    padding: 8,
    paddingLeft: 25,
    width: '95%',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: 'white',
    // ...Platform.select({
    //   ios: {
    //     shadowColor: 'rgba(0, 0, 0, 0.1)',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 10,
    //     shadowColor: 'gray'

    //   },
    // }),
  },
  loginButton: {
    backgroundColor: 'black',
    padding: 25,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
    marginTop: 0

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
