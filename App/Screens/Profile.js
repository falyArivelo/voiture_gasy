import { View, Text, FlatList, Pressable, Image, Modal, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Shared/Colors';
import infosPersonne from '../Shared/personne';
import { Entypo, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import infosAnnonces from '../Shared/annonces'
import global from './../Shared/style/style';
import * as SecureStore from 'expo-secure-store';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';



const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [annonces, setAnnonces] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // Fonction asynchrone pour récupérer les annonces
    const fetchUser = async () => {
        try {
            const userId = await SecureStore.getItemAsync('user');
            const user = JSON.parse(userId);
            setUser(user);
            console.log(user)
            const response = await axios.get(`http://192.168.88.20:8080/auth/annonces/envente?idUser=${user.id}`);
            const photosLength = response.data[0].photos.length;
            // setNombrePhotos(photosLength);
            setAnnonces(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
        }
    };
    // Appeler la fonction asynchrone
    fetchUser();
}, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLogout = async () => {
    try {
      // Effacer les informations d'identification du stockage sécurisé
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('user');
      const userJSON = await SecureStore.getItemAsync('user');

      const user = JSON.parse(userJSON);

      // Afficher le contenu de 'user' sur la console
      console.log('User content:', user);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }], // Remplacez 'RootScreen' par le nom de votre écran racine
      });

      console.log('Logout successful');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={global.profile}>
      <View style={global.profileInformations}>
        <View style={global.myFlex}>
          <View style={global.profilePdp}>
            <Image style={global.profilePdpImage}
              // source={{ uri: user.photo }}
              source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/voiture-13909.appspot.com/o/45f2d329-e49b-402d-b2c1-7d5daa809a1f.jpeg?alt=media&token=408cd76a-55bc-4454-a9e2-acef0cb3041d' }}

            />
          </View>
          <View style={global.profileCoords}>
            <Text style={global.name}>{user.nom}</Text>
            <Text style={global.email}>{user.email}</Text>
          </View>
        </View>
        <Pressable onPress={openModal}>
          <View style={global.myIcon}>
            <Entypo name="dots-three-vertical" size={28} color="black" />
          </View>
        </Pressable>
      </View>

      <View style={global.mesAnnonces}>
        <Text style={global.mesAnnoncesTitre}>Mes Annonces</Text>
        <FlatList
          data={annonces}
          numColumns={2}
          // style={{ padding: 10 }}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          renderItem={({ item }) => (
            <View style={{ margin: 3 }}>
              <View style={global.favCard}>
                <Pressable
                  onPress={() => navigation.navigate('AnnonceDetails', item)}>
                  <Image
                    source={{ uri: item.photos[0].lienPhoto }}
                    style={{ width: '100%', height: 220, borderRadius: 5 }}
                  />
                </Pressable>
                <Text style={global.status}>Vendu</Text>
              </View>
            </View>
          )}
        />
      </View>

      <Modal
        animationType="slide" // Vous pouvez ajuster le type d'animation selon vos préférences
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={global.profileModal}>
          <View style={global.profileModalContent}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <View style={global.modalClose}>
                <Ionicons name="close" size={30} color="black" />
              </View>
            </TouchableOpacity>
            <ScrollView style={global.modalList}>
              <Pressable
                onPress={() => navigation.navigate('Favoris')} style={global.modalListElement}>
                <View style={global.myIcon}>
                  <Feather name="heart" size={24} color={Colors.DARK_GRAY} />
                </View>
                <Text style={global.modalListElementText}>
                  Favoris
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('Notifications')} style={global.modalListElement}>
                <View style={global.myIcon}>
                  <Ionicons name="notifications-outline" size={24} color={Colors.DARK_GRAY} />
                  <Text style={global.notifsNombre}>3</Text>
                </View>
                <Text style={global.modalListElementText}>
                  Notifications
                </Text>
              </Pressable>

              <Pressable
                style={global.modalListElement}>
                <View style={global.myIcon}>
                  <Feather name="settings" size={24} color={Colors.DARK_GRAY} />
                </View>
                <Text style={global.modalListElementText}>
                  Paramètres
                </Text>

              </Pressable>

              <Pressable
                onPress={handleLogout} style={global.modalListElement_logout}>
                <View style={global.myIcon} >
                  <AntDesign name="logout" size={30} color={Colors.DARK_GRAY} />
                </View>
                <Text style={global.logoutText}>
                  Deconnexion
                </Text>

              </Pressable>

            </ScrollView>

          </View>
        </View>
      </Modal>

      {/* <Pressable
        onPress={() => navigation.navigate('Login')} className="myflex logout">
        <Text className="logout_text">
          Deconnexion
        </Text>
        <View className="myicon" >
          <AntDesign name="logout" size={30} color={Colors.DARK_GRAY} />
        </View>
      </Pressable> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 20,
    backgroundColor: 'lightblue',
    borderRadius: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    width: '100%',
    height: 300,  // Limite la hauteur du modal à 300 pixels
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
  },
});

export default Profile