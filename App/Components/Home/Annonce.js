import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import Colors from '../../Shared/Colors';
import infos from '../../Shared/annonces';
import { Image } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import global from '../../Shared/style/style';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// const annonces = infos.annonces;

const Annonces = ({ navigation }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [user, setUser] = useState(null);


    const [annonces, setAnnonces] = useState([]);

    const fetchAnnonces = async () => {
        try {
            const userId = await SecureStore.getItemAsync('user');
            const user = JSON.parse(userId);
            setUser(user);
            // console.log(user)
            const response = await axios.get(`http://192.168.88.46:8080/auth/annonces/envente?idUser=${user.id}`);
            ;
            setAnnonces(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
        }
    };

    useEffect(() => {
        fetchAnnonces();
        const intervalId = setInterval(() => {
            fetchAnnonces();
        }, 5000);
        return () => clearInterval(intervalId);

    }, []);

    const Annonce = ({ annonce }) => {
        const [liked, setLiked] = useState(annonce.liked);
        const [nombrePhotos, setNombrePhotos] = useState(annonce.photos.length);

        const handleLike = () => {
            setLiked(!liked);
        };

        return (
            <View>
                <View
                    style={global.card}
                >

                    <View style={global.proprio}>
                        <View style={global.pdp}>
                            <Image style={global.pdpImage}
                                // source={{ uri: annonce.pdp }}
                                source={{ uri: annonce.annonce.proprietaire.photoProfil }}

                            />
                        </View>
                        <Text style={global.proprioName}>{annonce.annonce.proprietaire.nom}</Text>
                    </View>
                    <Pressable
                        onPress={() => navigation.navigate('AnnonceDetails', annonce)}>
                        <View style={global.imageContainer}>
                            {annonce.photos[0] &&
                                <Image
                                    style={global.cardImage}
                                    source={{ uri: annonce.photos[0].lienPhoto }}
                                />
                            }
                            
                            <View style={global.nombrePhotos}>
                                <Text style={global.nombrePhotosNombre}>+{nombrePhotos}{/* {annonce.nombrePhotos} */} </Text>
                                <MaterialIcons name="photo" size={20} color="white" />
                            </View>
                        </View>
                    </Pressable>


                    <View style={global.annonceButtons}>
                        <TouchableOpacity onPress={handleLike} >
                            <View style={global.myIcon} >
                                <MaterialCommunityIcons name={liked ? "cards-heart" : "cards-heart-outline"} size={28} color={liked ? '#F23D5E' : Colors.DARK_GRAY} />
                            </View>
                        </TouchableOpacity>

                        <View style={global.myIcon}>
                            <Feather name="message-circle" size={28} color={Colors.DARK_GRAY} />
                        </View>
                        <Text style={global.annonceDate}>{annonce.annonce.date}</Text>


                    </View>
                    <View style={global.informations}>
                        <View
                            style={global.myFlex}
                        >
                            <Text style={global.marque}>{annonce.annonce.modele.marque.nom}</Text>
                        </View>
                        <Text style={global.descri}>{annonce.annonce.description}</Text>
                        <Text style={global.prix}>{annonce.annonce.prix}</Text>
                    </View>
                </View>

            </View>
        );
    };

    return (
        <View style={global.annonces}>
            <View>

            </View>
            <FlatList
                style={global.list}
                decelerationRate={0}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                data={annonces}
                renderItem={({ item }) => <Annonce annonce={item} />}
            />

            {/* <View style={{ height: 1300 }} /> */}
        </View>
    )
}

export default Annonces