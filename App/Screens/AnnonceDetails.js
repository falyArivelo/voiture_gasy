import React, { useEffect, useState, useRef } from 'react'
import { Text, View, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../Shared/Colors';
import global from './../Shared/style/style';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';

const AnnonceDetails = ({ navigation, route }) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);
    const annonce = route.params;
    const [liked, setLiked] = useState(annonce.liked);
    const swiperRef = useRef(null);

    const handleLike = () => {
        setLiked(!liked);
    };

    const updateStatus = async () => {
        try {

            const storedToken = await SecureStore.getItemAsync('token');
            const apiUrl = `https://ombaikamitadyws-production.up.railway.app/annonces/sellApp`;
            const config = {
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                },
            };

            const response = await axios.put(apiUrl, {
                idAnnonce: annonce.annonce.idAnnonce,
                idUser: 252,
            }, config);


            console.log(response.data); // Vous pouvez traiter la réponse ici si nécessaire
        } catch (error) {
            // console.error('Erreur lors de la mise à jour du statut :', error);
        }
    };

    const fetchUser = async () => {
        try {
            const userId = await SecureStore.getItemAsync('user');
            const user = JSON.parse(userId);
            setUser(user);
        } catch (error) {
            // console.error('Erreur lors de la récupération des annonces:', error);
        }
    };

    const [categorie, setCategorie] = useState([]);
    const loadCategorie = async () => {
        const storedToken = await SecureStore.getItemAsync('token');
        setToken(storedToken)
        const result = await axios.get("https://ombaikamitadyws-production.up.railway.app/auth/modele/categories/" + annonce.annonce.modele.idModele, {
            headers: {
                'Authorization': `Bearer ${storedToken}`
            }
        });
        setCategorie(result.data);
    }


    useEffect(() => {
        fetchUser();
        loadCategorie();
    }, [token])


    const months = [
        "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    return (
        <ScrollView style={{ backgroundColor: Colors.BG_COLOR, paddingTop: 70 }}>
            <View
                style={global.card}
            >

                <View style={global.proprio}>
                    <View style={global.pdp}>
                        <Image style={global.pdpImage}
                            source={{ uri: annonce.annonce.proprietaire.photoProfil }}
                        />
                    </View>
                    <Text style={global.proprioName}>{annonce.annonce.proprietaire.nom}</Text>
                </View>

                <View style={global.imageContainer_details}>
                    {annonce.photos ? (
                        <Swiper
                            ref={swiperRef}
                            loop={false}
                            showsButtons={false}
                            showsPagination={true}
                        >
                            {annonce.photos.map((imageUrl, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={{ uri: imageUrl.lienPhoto }} style={styles.image} />
                                </View>
                            ))}
                        </Swiper>
                    ) : (
                        <Feather style={global.bgPicture} name="image" size={140} color="gray" />
                    )
                    }
                </View>



                <View style={global.annonceButtons}>
                    <TouchableOpacity onPress={handleLike} >
                        <View style={global.myIcon} >
                            <MaterialCommunityIcons name={liked ? "cards-heart" : "cards-heart-outline"} size={28} color={liked ? '#F23D5E' : Colors.DARK_GRAY} />
                        </View>
                    </TouchableOpacity>

                    {/* <View style={global.myIcon}>
                        <Feather name="message-circle" size={28} color={Colors.DARK_GRAY} />
                    </View> */}
                    <Text style={global.annonceDate}>{annonce.annonce.date[2]} {months[annonce.annonce.date[1] - 1]} {annonce.annonce.date[0]}</Text>


                </View>
                <View style={global.informations}>
                    <View
                        style={global.myFlex}
                    >
                        <Text style={global.marque}>{annonce.annonce.modele.marque.nom}</Text>
                    </View>
                    <Text style={global.descri}>{annonce.annonce.description}</Text>
                    <Text style={global.prix}>{annonce.annonce.prix} MGA</Text>
                </View>
                <View>
                    {user.id === annonce.annonce.proprietaire.id && annonce.annonce.status === 0 ? (
                        <TouchableOpacity style={global.publier_vendre_button} onPress={() => navigation.navigate('Vendre', annonce)}>
                            <Text style={global.publier_vendre_button_text}>
                                Vendre
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>

                <View style={global.dcategoryList}>
                    {
                        categorie.map((cat, index) => (

                            <Text key={index} style={global.dcategoryItem}>{cat.categorie.nom}</Text>
                        ))
                    }
                </View>
                <View style={global.additionalDetails}>
                    <View style={global.detailsSection}>
                        <Text style={global.detailsName}>Source d'energie</Text>
                        <Text style={global.detailsValue}>{annonce.annonce.carburant.nom}</Text>
                    </View>

                    <View style={global.detailsSection}>
                        <Text style={global.detailsName}>Boite de vitesse</Text>
                        <Text style={global.detailsValue}>{annonce.annonce.boite}</Text>
                    </View>

                    <View style={global.detailsSection}>
                        <Text style={global.detailsName}>Kilometrage</Text>
                        <Text style={global.detailsValue}>{annonce.annonce.kilometrage} km</Text>
                    </View>

                    <View style={global.detailsSection}>
                        <Text style={global.detailsName}>Histoire d'entretien</Text>
                        <Text style={global.detailsValue}>Entretien régulier effectué chez le concessionnaire</Text>
                        <Text style={global.detailsValue}>Aucun accident signalé</Text>
                    </View>

                    <View style={global.detailsSection}>
                        <Text style={global.detailsName}>Contact</Text>
                        <Text style={global.detailsValue}>{annonce.annonce.contact}</Text>
                    </View>
                </View>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5

    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
    activePaginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 3,
        backgroundColor: 'red',
    },
});

export default AnnonceDetails