import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import global from '../Shared/style/style'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config'
import * as FileSystem from 'expo-file-system'
import { Ionicons } from '@expo/vector-icons';
import Colors from "../Shared/Colors";

const Register = ({ navigation }) => {
  const swiperRef = useRef(null);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pdpUrl, setPdpUrl] = useState('https://firebasestorage.googleapis.com/v0/b/voiture-13909.appspot.com/o/268a4b30-1e24-469f-be62-684e49a80485.jpeg?alt=media&token=17d5eb66-d7be-4262-9b77-05334d1c78c4');
  const [image, setImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [Uploading, setUploading] = useState(false)

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const pickImage = async () => {
    //
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 0.7,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const removeImage = () => {
    setImage(null);
  };

  const inscrire = async () => {
    // Add your registration logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    setUploading(true)
    // const tempImage = null;

    try {
      const uploadPromise = async () => {
        try {
          const { uri } = await FileSystem.getInfoAsync(image);
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
              resolve(xhr.response);
            };
            xhr.onerror = (e) => {
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          });

          const filename = uri.substring(uri.lastIndexOf('/') + 1);
          const ref = firebase.storage().ref().child(filename);
          await ref.put(blob);
          const downloadURL = await ref.getDownloadURL();
          setImageUploaded(downloadURL);
          // tempImage = downloadURL;
          console.log('Lien de téléchargement de l\'image :', downloadURL);
          return downloadURL; // Ajout de cette ligne pour retourner l'URL depuis la fonction
        } catch (error) {
          // console.error('Une erreur s\'est produite lors du téléchargement de l\'image:', error);
          // throw error; // Lancer l'erreur pour que Promise.all puisse la capturer
          return 'https://i.pinimg.com/564x/97/7e/56/977e568da382e808209b9294e0c0c10a.jpg';
        }
      };

      const downloadURLs = await Promise.resolve(uploadPromise()); // Appel direct de la fonction
      console.log(downloadURLs); // downloadURLs contient l'URL retourné par la fonction


      setUploading(false)
      // Alert.alert('Annonce Publié !')
      setImage(null);

      try {
        const response = await axios.post('https://ombaikamitadyws-production.up.railway.app/auth/signApp', {
          mail: email,
          password: password,
          username: username,
          pdpUrl: downloadURLs,
        });

        // Navigate to the next screen after successful registration
        navigation.navigate('Login');
      } catch (error) {
        // console.error('Login failed', error);
      }

    } catch (error) {
      console.error(error)
      setUploading(false)
    }


  };

  const [erreur, setErreur] = useState(null);

  const handleRegister = async () => {
    try {
      await inscrire()

    } catch (error) {
      setErreur("OOPS ! Une Erreur est survenue")
    }
  };

  return (
    <Swiper
      ref={swiperRef} // Attachez la référence de Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      gestureEnabled={false}
      scrollEnabled={false}
    >
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

        <TouchableOpacity style={styles.registerButton} onPress={() => handleNext()}>
          <Text style={styles.buttonText}>next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Already have an account? Login here!</Text>
        </TouchableOpacity>
      </View>
      <View>
        <View style={global.choosePdpPage}>
          <View>

            {image && <TouchableOpacity onPress={() => removeImage()}>
              <View style={global.removePdpImage}>
                <Ionicons name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
            }

            <View style={global.signupPdp}>
              {image ? (
                <Image style={global.signupPdpImage}
                  source={{ uri: image }}
                />) : (
                <View style={global.choosePdp}>
                  <TouchableOpacity style={global.signupPdpvide} onPress={pickImage} >
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <Text style={global.choosePdpText}>Choisissez votre Photo de Profile</Text>

          </View>
          <View style={global.erreur}>
            {erreur ? (
              <Text style={global.messageErreur}>{erreur}</Text>
            ) : (
              // Votre contenu normal à afficher lorsque tout se passe bien
              <></>
            )}
          </View>
        </View>
        <View style={global.myFlexSpaceBetween}>
          <TouchableOpacity style={global.publier_previous_button} onPress={handlePrev}>
            <Text style={global.publier_previous_button_text}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.publier_apercu_button} onPress={handleRegister}>
            <Text style={global.publier_apercu_button_text}>
              S'inscrire
              {/* <Ionicons name="arrow-forward" size={24} color="white" /> */}

            </Text>
          </TouchableOpacity>
        </View>
      </View >
    </Swiper >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 5,
    backgroundColor: Colors.BG_COLOR,

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
    //     elevation: 2,
    //     shadowColor: 'gray'

    //   },
    // }),
  },
  registerButton: {
    backgroundColor: Colors.BLACK,
    padding: 25,
    borderRadius: 20,
    width: '95%',
    alignItems: 'center',
    marginTop: 20
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
