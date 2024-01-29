import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import global from '../Shared/style/style'
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Colors from '../Shared/Colors';

const AnnonceForm = () => {
  //Annonce saves(String description,Long idUser,Long idModele,Long idCarburant,String boite,String contact,double prix,double kilometrage,List<String> photos)
  // liste des donnees utiles
  const boites = ['manuel', 'automatique'];
  const [marques, setMarques] = useState([]);
  const [modeles, setModeles] = useState([]);
  const [carburants, setCarburants] = useState([]);

  // variable a envoyé
  const [description, setDescription] = useState('');
  const [idUser, setIdUser] = useState(null);
  const [selectedMarque, setSelectedMarque] = useState(null);
  const [selectedModele, setSelectedModele] = useState(null);
  const [selectedCarburant, setSelectedCarburant] = useState(null);
  const [selectedBoite, setSelectedBoite] = useState('manuel');
  const [token, setToken] = useState(null);
  const [contact, setContact] = useState('');
  const [prix, setPrix] = useState('');
  const [kilometrage, setKilometrage] = useState('');
  const [photos, setPhotos] = useState([]);

  const handleMarqueSelect = async (idMarque) => {
    setSelectedMarque(idMarque);
    try {
      const storedToken = await SecureStore.getItemAsync('token');
      const apiUrl = `http://192.168.1.195:8080/modeles/${idMarque}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      const modeles = response.data;
      setModeles(modeles);
    } catch (error) {
      console.error(error);
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

        const apiUrl = 'http://192.168.1.195:8080/marques';
        const config = {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        };

        const response = await axios.get(apiUrl, config);
        setMarques(response.data);

        const apiUrlCarburants = 'http://192.168.1.195:8080/carburants';

        const responseCarburants = await axios.get(apiUrlCarburants, config);
        setCarburants(responseCarburants.data);

      } catch (error) {
        console.error('Erreur de requête :', error);
      }
    };

    fetchMarques();
  }, [token]);

  const handleSubmit = async () => {

    const dataToSend = {
      description: description,
      idUser: Number(idUser), // Convertir en chaîne en utilisant String.valueOf
      idModele: Number(selectedModele), // Convertir en chaîne
      idCarburant: Number(selectedCarburant), // Convertir en chaîne
      boite: selectedBoite,
      contact: contact,
      prix: Number(prix), // Convertir en nombre si nécessaire
      kilometrage: Number(kilometrage), // Convertir en nombre si nécessaire
      photos: ['lien_photo_1', 'lien_photo_2'],
    };

    console.log(dataToSend);
    // try {
    //   const response = await axios.post('URL_DE_VOTRE_API', formData);

    //   console.log('Réponse du serveur:', response.data);
    // } catch (error) {
    //   console.error('Erreur lors de l\'envoi de la requête:', error);
    // }

  };

  return (
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
          value={prix}
          onChangeText={handlePrixChange}
          keyboardType="numeric"

          placeholder='Prix'
        />
      </View>

      <View >
        <Text style={global.publier_label}>kilometrage</Text>
        <TextInput
          style={global.publier_input}
          value={kilometrage}
          onChangeText={handleKilometrageChange}
          keyboardType="numeric"
          placeholder='kilometrage'
        />

      </View>
      <Button title="Soumettre" onPress={handleSubmit} />

    </ScrollView>
  );
};

export default AnnonceForm;
