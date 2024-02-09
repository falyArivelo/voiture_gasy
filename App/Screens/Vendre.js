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
                const apiUrl = `https://ombaikamitadyws-production.up.railway.app/venteannonce/demande/${user.id}`;
                const config = {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                    },
                };
                const response = await axios.get(apiUrl, config);
                const demandesFiltrees = response.data.filter((demande) => demande.annonce.idAnnonce === annonce.annonce.idAnnonce)
                setDemandes(demandesFiltrees);
            } catch (error) {
                // console.error('Erreur lors de la récupération des annonces:', error);
            }
        };
        // Appeler la fonction asynchrone
        fetchDemandes();
    }, [demandes]);


    const achat = async (idAnnonce, idVenteAnnonce, idUser) => {
        // e.preventDefault();
        try {
            const data = {
                idAnnonce: idAnnonce,
                idVenteAnnonce: idVenteAnnonce,
                idUser: idUser
            };
            await axios.put("https://ombaikamitadyws-production.up.railway.app/annonces/sellApp", data, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // window.location.reload();
        } catch (error) {
            // console.error(error);
            navigate("/login");
        }
    };
    const refus = async (idVenteAnnonce) => {
        // e.preventDefault();
        try {
            await axios.delete("https://ombaikamitadyws-production.up.railway.app/venteannonces/" + idVenteAnnonce, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            // window.location.reload();
        } catch (error) {
            console.log(error);
            navigate("/login");
        }
    };

    return (
        <View style={styles.demandeContainer}>
            <View style={styles.heading}>
                <Text style={{ color: Colors.GRAY, fontSize: 18, }}>Demande d'achat : </Text>
                <Text style={{ color: Colors.DARK_GRAY, fontSize: 20, fontWeight: 'bold' }}>{`${annonce.annonce.modele.marque.nom} ${annonce.annonce.modele.nom} ${annonce.annonce.description}`}</Text>
            </View>
            <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                    {/* <Text>Acheteur</Text>
                    <Text>Prix</Text>
                    <Text>Valider</Text>
                    <Text>Refuser</Text> */}
                </View>

                {demandes.map((dm, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={global.pdp}>
                            <Image style={global.pdpImage}
                                // source={{ uri: annonce.pdp }}
                                source={{ uri: dm.acheteur.photoProfil }}
                            />
                        </View>
                        <Text>{dm.acheteur.nom}</Text>
                        <Text>{`${dm.annonce.prix.toLocaleString('en-US')} MGA`}</Text>
                        <TouchableOpacity style={styles.button_valider} onPress={() => achat(dm.annonce.idAnnonce, dm.idVenteAnnonce, dm.acheteur.id)}>
                            <Text style={styles.buttonText_valider}>Valider</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button_refuser} onPress={() => refus(dm.idVenteAnnonce)}>
                            <Text style={styles.buttonText_refuserr}>Refuser</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    demandeContainer: {
        marginVertical: 10,
        padding: 20

    },
    heading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.GRAY,
    },
    tableContainer: {
        marginTop: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor:Colors.LIGHT_GRAY,
        paddingVertical: 15,
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor:Colors.LIGHT_GRAY,
        paddingVertical: 20,
    },
    button_valider: {
        backgroundColor: Colors.LIGHT_BLUE, // or any color you prefer
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    button_refuser: {
        backgroundColor: Colors.LIGHT_GRAY, // or any color you prefer
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
    },
    buttonText_valider: {
        color: '#fff',
        fontSize: 16

    },
    buttonText_refuserr: {
        color: 'black',
        fontSize: 16

    },
});

export default Vendre