import { View, Text, FlatList, Pressable, Image, Modal, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../Shared/Colors';
import { Entypo, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import global from './../Shared/style/style';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';



const Vendre = ({ navigation, route }) => {
    const [user, setUser] = useState({});
    const [demandes, setDemandes] = useState([]);
    const [token, setToken] = useState(null);
    const annonce = route.params;

    useEffect(() => {
        // Fonction asynchrone pour récupérer les annonces
        const fetchDemandes = async () => {
            try {
                const userId = await SecureStore.getItemAsync('user');
                const user = JSON.parse(userId);
                setUser(user);
                const storedToken = await SecureStore.getItemAsync('token');
                setToken(storedToken)
                const apiUrl = `http://192.168.88.29:8080/venteannonce/demande/${user.id}`;
                const config = {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                    },
                };
                const response = await axios.get(apiUrl, config);
                setDemandes(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        };
        // Appeler la fonction asynchrone
        fetchDemandes();
    }, [token]);

    return (
        <View style={styles.demandeContainer}>
            <Text style={styles.heading}>Demande d'achat:</Text>
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    <Text>Annonce</Text>
                    <Text>Acheteur</Text>
                    <Text>Prix</Text>
                    <Text>Valider</Text>
                    <Text>Refuser</Text>
                </View>

                {demandes.map((dm, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text>{`N-${dm.annonce.idAnnonce} ${dm.annonce.modele.marque.nom} ${dm.annonce.modele.nom}`}</Text>
                        <Text>{dm.acheteur.nom}</Text>
                        <Text>{`${dm.annonce.prix.toLocaleString('en-US')} MGA`}</Text>
                        <TouchableOpacity style={styles.button} onPress={(e) => achat(e, dm.annonce.idAnnonce, dm.idVenteAnnonce, dm.acheteur.id)}>
                            <Text style={styles.buttonText}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={(e) => refus(e, dm.idVenteAnnonce)}>
                            <Text style={styles.buttonText}>Refuser</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    demandeContainer: {
      marginVertical: 20,
    },
    heading: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 20,
      fontWeight: 'bold',
    },
    tableContainer: {
      marginTop: 10,
    },
    tableHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingVertical: 5,
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      paddingVertical: 10,
    },
    button: {
      backgroundColor: '#3498db', // or any color you prefer
      padding: 8,
      borderRadius: 4,
    },
    buttonText: {
      color: '#fff',
    },
  });
  
export default Vendre