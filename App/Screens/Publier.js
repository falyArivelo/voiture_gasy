import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Pressable, } from 'react-native';
import Swiper from 'react-native-swiper';
import global from '../Shared/style/style'
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Colors from '../Shared/Colors';
import { firebase } from '../../config'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { MaterialIcons, Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const Publier = ({ navigation }) => {

  // --------SLIDER----------------//
  const swiperRef = useRef(null);

  const [page1Data, setPage1Data] = useState('Données de la page 1');

  const handleNext = () => {
    const page2Data = `Données de la page 2 basées sur ${page1Data}`;
    // console.log(page2Data);
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  const handlePrev2 = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-2);
    }
  };

  // --------UPLOADING IMAGE----------------//
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [nbrImages, setNbrImages] = useState(0);
  const [imagesUploaded, setImagesUploaded] = useState([]);

  const [Uploading, setUploading] = useState(false)

  const pickImage = async () => {
    //
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [5, 5],
      quality: 0.7,
      allowsMultipleSelection: true
    })

    if (!result.canceled) {
      // setImages(result.assets)
      result.assets.forEach((item, index) => {
        addImage(item, index);
      });
      setNbrImages(result.assets.length)
    }
  }

  const addImage = (image, index) => {
    setImages(prevImages => [...prevImages, image]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const swiperRefImages = useRef(null);

  // --------FORM FOR ANNONCE----------------//
  //Annonce saves(String description,Long idUser,Long idModele,Long idCarburant,String boite,String contact,double prix,double kilometrage,List<String> photos)
  // liste des donnees utiles
  const boites = ['manuel', 'automatique'];
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [carburants, setCarburants] = useState([]);

  // variable a envoyé
  const [description, setDescription] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [selectedMarque, setSelectedMarque] = useState(0);
  const [selectedModele, setSelectedModele] = useState(0);
  const [selectedCarburant, setSelectedCarburant] = useState(0);
  const [selectedBoite, setSelectedBoite] = useState('manuel');
  const [token, setToken] = useState(null);
  const [contact, setContact] = useState('');
  const [prix, setPrix] = useState(0.0);
  const [kilometrage, setKilometrage] = useState(0.0);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchTermModele, setSearchTermModele] = useState('');

  const handleMarqueSelect = async (idMarque) => {
    setSelectedMarque(idMarque);
    try {
      const storedToken = await SecureStore.getItemAsync('token');
      const apiUrl = `http://192.168.88.29:8080/modeles/${idMarque}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      const modeles = response.data;
      setModeles(modeles);
      setOriginalModeles(modeles);
      setFilteredModeles([])
    } catch (error) {
      // console.error(error);
    }
  };
  const handleModeleSelect = (modele) => {
    setSelectedModele(modele);
  };
  const handleCarburantSelect = (idCarburant) => {
    setSelectedCarburant(idCarburant);
  };

  const handleBoiteSelect = (boite) => {
    setSelectedBoite(boite);
  };
  const handleContactChange = (e) => {
    setContact(e);
  };

  const handlePrixChange = (e) => {
    setPrix(e);
  };

  const handleKilometrageChange = (e) => {
    setKilometrage(e);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e);
  };

  useEffect(() => {
    const fetchMarques = async () => {
      try {
        const userId = await SecureStore.getItemAsync('user');
        const user = JSON.parse(userId);
        setIdUser(user.id);

        const storedToken = await SecureStore.getItemAsync('token');
        setToken(storedToken);

        const apiUrl = 'http://192.168.88.29:8080/marques';
        const config = {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        };

        const response = await axios.get(apiUrl, config);
        setMarques(response.data);
        setOriginalMarques(response.data);
        setFilteredMarques([]);

        const apiUrlCarburants = 'http://192.168.88.29:8080/carburants';

        const responseCarburants = await axios.get(apiUrlCarburants, config);
        setCarburants(responseCarburants.data);

      } catch (error) {
        // console.error('Erreur de requête :', error);
        // setErreur("Veillez Réessayer")

      }
    };

    fetchMarques();
  }, [token]);

  const publierAnnonce = async () => {
    setUploading(true)
    const tabs = [];

    try {
      const uploadPromises = images.map(async (image, index) => {
        const { uri } = await FileSystem.getInfoAsync(image.uri);
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = () => {
            resolve(xhr.response)
          }
          xhr.onerror = (e) => {
            reject(new TypeError('Network request failed'));
          }
          xhr.responseType = 'blob';
          xhr.open('GET', uri, true)
          xhr.send(null)
        })

        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(filename);
        await ref.put(blob)
        const downloadURL = await ref.getDownloadURL();
        tabs.push(downloadURL);
        setImagesUploaded((prevImages) => [...prevImages, downloadURL]);

        console.log('Lien de téléchargement de l\'image :', downloadURL);
      })

      await Promise.all(uploadPromises);
      // console.log(tabs);
      // console.log(imagesUploaded);


      setUploading(false)
      // Alert.alert('Annonce Publié !')
      setImage(null);

    } catch (error) {
      // console.error(error)
      setErreur("Veillez Réessayer ")
      setUploading(false)
    }

    console.log("AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH!!!!!!");

    const dataToSend = {
      description: description,
      idUser: idUser,
      idModele: selectedModele,
      idCarburant: selectedCarburant,
      boite: selectedBoite,
      contact: contact,
      prix: prix,
      kilometrage: kilometrage,
      photos: tabs,
    };

    console.log(dataToSend);
    try {
      // const response = await axios.post('URL_DE_VOTRE_API', formData);
      const storedToken = await SecureStore.getItemAsync('token');
      const apiUrl = `http://192.168.88.29:8080/annonceSaveApp`;
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      };
      const response = await axios.post(apiUrl, dataToSend, config);
      console.log('Réponse du serveur:', response.data);
    } catch (error) {
      // console.error('Erreur lors de l\'envoi de la requête:', error);
      setErreur("Veuillez remplir toutes les informations ")

    }

  }

  const [filteredMarques, setFilteredMarques] = useState([]);
  const [originalMarques, setOriginalMarques] = useState([]);

  const handleSearchMarque = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm.trim() !== '') {
      const filtered = marques.filter((marque) =>
        marque.nom.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMarques(filtered);
      setMarques(filtered);
    } else {
      // Si le terme de recherche est vide, rétablissez la liste originale des marques.
      setMarques(originalMarques);
    }
  };



  const [filteredModeles, setFilteredModeles] = useState([]);
  const [originalModeles, setOriginalModeles] = useState([]);
  const handleSearchModele = (term) => {
    setSearchTermModele(term)
    if (term.trim() !== '') {
      const filtered = modeles.filter((modele) =>
        modele.nom.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredModeles(filtered);
      setModeles(filtered);
    } else {
      // Si le terme de recherche est vide, rétablissez la liste originale des marques.
      setModeles(originalModeles);
    }
  };

  const [erreur, setErreur] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async () => {
    handleNext();
    setIsLoading(true);
    try {
      await publierAnnonce();
    } catch (error) {
      // console.error('Une erreur s\'est produite :', error);
      setErreur("Veuillez remplir toutes les informations ")
    } finally {
      setIsLoading(false);
      setImages([])
      setImagesUploaded([])
      setNbrImages(0);
      setDescription('');
      setSelectedCarburant(0)
      setSelectedMarque(0)
      setSelectedModele(0)
      setContact('')
      setPrix(0.0)
      setKilometrage(0.0)
    }


  };

  const pressFinish = () => {
    setErreur(null)
    handlePrev2();
    navigation.navigate('Profile')
  }


  // Utilisation de la fonction dans votre composant


  // Vous pouvez maintenant utiliser la variable `isValid` dans votre code pour vérifier si toutes les valeurs sont définies.

  return (
    // <UploadMediaFile />
    <Swiper
      ref={swiperRef} // Attachez la référence de Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      gestureEnabled={false}
      scrollEnabled={false}
    >
      {/* Page 1 */}
      <View style={styles.slide}>
        {/* <Text>Contenu de la page 1</Text> */}
        {/* -------- */}
        {/* <UploadMediaFile /> */}

        <ScrollView style={global.container}>
          <View style={global.publier}>
            <Text style={global.publier_titre} >Publier une annonce</Text>
            <View style={global.uploadImage_Container}>
              <Feather style={global.bgPicture} name="image" size={140} color="gray" />
              {images &&
                <Swiper
                  ref={swiperRefImages}
                  loop={false}
                  showsButtons={false}
                  showsPagination={true}
                >
                  {images.map((imageUrl, index) => (
                    <React.Fragment key={index}>
                      <TouchableOpacity onPress={() => removeImage(index)}>
                        <View style={global.removeImage}>
                          <Ionicons name="close" size={20} color="black" />
                        </View>
                      </TouchableOpacity>
                      <View style={styles.upload_slide}>
                        <Image source={{ uri: imageUrl.uri }} style={styles.upload_image} />
                      </View>
                    </React.Fragment>
                  ))}
                </Swiper>
              }
              {/* <TouchableOpacity
                onPress={uploadMedia}
                style={global.uploadImage_Button}
              >
                <Text>upload image</Text>
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              onPress={pickImage}
              style={global.pickImage_Button}
            >
              <Text style={global.pickImage_Button_text}>
                <Feather name="plus" size={24} color="white" />
                <MaterialIcons name="photo" size={24} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* -------- */}

        <TouchableOpacity style={images.length !== 0 ? global.publier_next_button : global.publier_next_button_disable} onPress={handleNext} disabled={images.length === 0}>
          <Text style={global.publier_next_button_text}>Suivant</Text>
        </TouchableOpacity>

      </View>

      {/* Page 2 */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
        {/* <AnnonceForm style={global.publier_annonceForm} /> */}
        {/* ---------------------- */}
        <ScrollView style={global.publier_annonceForm} >
          <View >
            <Text
              style={global.publier_label}
              multiline
              numberOfLines={4}>Description</Text>
            <TextInput
              style={global.publier_input_descri}
              multiline
              numberOfLines={4}
              value={description}
              onChangeText={handleDescriptionChange}
              placeholder='Description'



            />
          </View>

          <Text>Marque</Text>
          <TextInput
            placeholder="Rechercher une marque"
            // value={text}
            value={searchTerm}
            onChangeText={(text) => handleSearchMarque(text)}

            onSubmitEditing={handleSearchMarque}
            style={global.publier_input}

          />
          <View style={global.publier_liste_marques}>
            {marques.map(marque => (
              <View
                key={marque.idMarque}
                style={[
                  global.publier_liste_marques_radio,
                  selectedMarque === marque.idMarque && { backgroundColor: Colors.DARK_GRAY },
                ]}
              >
                <RadioButton.Item
                  label={marque.nom}
                  value={marque.idMarque}
                  status={selectedMarque === marque.idMarque ? 'checked' : 'unchecked'}
                  onPress={() => handleMarqueSelect(marque.idMarque)}
                  labelStyle={{ color: selectedMarque === marque.idMarque ? 'white' : 'black' }}
                />
              </View>
            ))}
          </View>

          <Text>Modèle</Text>
          <TextInput
            placeholder="Rechercher une modele"
            // value={text}
            value={searchTermModele}
            onChangeText={(text) => handleSearchModele(text)}
            onSubmitEditing={handleSearchModele}
            style={global.publier_input}

          />
          <View style={global.publier_liste_marques}>
            {modeles.map(modele => (
              <View
                key={modele.idModele}
                style={[
                  global.publier_liste_marques_radio,
                  selectedModele === modele.idModele && { backgroundColor: Colors.DARK_GRAY },
                ]}
              >
                <RadioButton.Item
                  label={modele.nom}
                  value={modele.idModele}
                  status={selectedModele === modele.idModele ? 'checked' : 'unchecked'}
                  onPress={() => handleModeleSelect(modele.idModele)}
                  labelStyle={{ color: selectedModele === modele.idModele ? 'white' : 'black' }}
                />
              </View>
            ))}
          </View>

          <Text>Carburant</Text>
          <View style={global.publier_liste_marques}>
            {carburants.map(carburant => (
              <View
                key={carburant.idCarburant}
                style={[
                  global.publier_liste_marques_radio,
                  selectedCarburant === carburant.idCarburant && { backgroundColor: Colors.DARK_GRAY },
                ]}
              >
                <RadioButton.Item
                  label={carburant.nom}
                  value={carburant.idCarburant}
                  status={selectedCarburant === carburant.idCarburant ? 'checked' : 'unchecked'}
                  onPress={() => handleCarburantSelect(carburant.idCarburant)}
                  labelStyle={{ color: selectedCarburant === carburant.idCarburant ? 'white' : 'black' }}
                />
              </View>
            ))}
          </View>

          <Text>Boite</Text>
          <View style={global.publier_liste_marques}>
            {boites.map(boite => (
              <View
                key={boite}
                style={[
                  global.publier_liste_marques_radio,
                  selectedBoite === boite && { backgroundColor: Colors.DARK_GRAY },
                ]}
              >
                <RadioButton.Item
                  label={boite}
                  value={boite}
                  status={selectedBoite === boite ? 'checked' : 'unchecked'}
                  onPress={() => handleBoiteSelect(boite)}
                  labelStyle={{ color: selectedBoite === boite ? 'white' : 'black' }}
                />
              </View>
            ))}
          </View>

          <View >
            <Text style={global.publier_label}>Contact</Text>
            <TextInput
              style={global.publier_input}
              value={contact}
              onChangeText={handleContactChange}
              placeholder='contact'

            />
          </View>

          <View >
            <Text style={global.publier_label}>Prix</Text>
            <TextInput
              style={global.publier_input}
              value={prix.toString()}
              onChangeText={handlePrixChange}
              keyboardType="numeric"

              placeholder='Prix'
            />
          </View>

          <View >
            <Text style={global.publier_label}>kilometrage</Text>
            <TextInput
              style={global.publier_input}
              value={kilometrage.toString()}
              onChangeText={handleKilometrageChange}
              keyboardType="numeric"
              placeholder='kilometrage'
            />

          </View>
          {/* <Button title="Soumettre" onPress={handleSubmit} /> */}

        </ScrollView>
        {/* ------------------ */}
        <View style={global.myFlexSpaceBetween}>
          <TouchableOpacity style={global.publier_previous_button} onPress={handlePrev}>
            <Text style={global.publier_previous_button_text}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.publier_apercu_button} onPress={handleSubmit}>
            <Text style={global.publier_apercu_button_text}>
              Publier
              {/* <Ionicons name="arrow-forward" size={24} color="white" /> */}

            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.slide}>


        {isLoading ? (
          <LottieView
            source={require('../Shared/loading.json')}
            autoPlay
            loop
          // style={{
          //   width: 50,
          //   height: 50,
          // }}
          />
        ) : (
          <>
            {erreur ? (
              <>
                <Image style={{ width: 300,height:300 }}
                  source={{ uri: "https://i.pinimg.com/564x/b3/bd/26/b3bd267a41b0a7285bd5fde24d98c355.jpg" }}
                />
                <View style={global.erreur}>

                  <Text style={global.messageErreur_center}>{erreur}</Text>
                </View>

                <TouchableOpacity style={global.backUploading} onPress={handlePrev2}>
                  <Ionicons name="close" size={32} color="black" style={global.myIcon} />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Pressable style={global.finish} onPress={() => pressFinish()}>
                  <View style={global.check}>
                    <Feather name="check" size={70} color="white" />
                  </View>
                  <Text>Voir vos annonces</Text>
                </Pressable>

                <TouchableOpacity style={global.backUploading} onPress={handlePrev2}>
                  <Ionicons name="close" size={32} color="black" style={global.myIcon} />
                </TouchableOpacity>
              </>
            )}
          </>

        )}


      </View>
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative'
  },
  upload_slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: -1


  },
  upload_image: {
    width: '100%',
    height: '100%',
    zIndex: -1
  },
  upload_paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  upload_activePaginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    backgroundColor: 'red',
  },
});

export default Publier;
