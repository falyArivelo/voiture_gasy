import React, { useEffect, useState } from 'react'
import { Text, View, FlatList, Pressable, TouchableOpacity, Dimensions } from 'react-native'
import Colors from '../../Shared/Colors';
import { Image } from 'react-native';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import global from '../../Shared/style/style';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import queryString from 'query-string';
import { ScrollView } from 'react-native-gesture-handler';

const Annonces = ({ navigation }) => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null);


    const [annonces, setAnnonces] = useState([]);

    const getToken = async () => {
        try {
            const userId = await SecureStore.getItemAsync('user');
            const storedToken = await SecureStore.getItemAsync('token');

            const user = JSON.parse(userId);
            setUser(user);
            setToken(storedToken)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchAnnonces = async () => {
        try {


            // console.log(user)
            const userId = await SecureStore.getItemAsync('user');
            const user = JSON.parse(userId);

            const response = await axios.get(`https://ombaikamitadyws-production.up.railway.app/auth/annonces/envente?idUser=${user.id}`);
            ;
            setAnnonces(response.data);

        } catch (error) {
            // console.error('Erreur lors de la récupération des annonces:', error);
        }
    };

    useEffect(() => {
        getToken()
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
            if (liked) {
                unlike();
            }
            else {
                like();
            }
            setLiked(!liked);
        };

        const unlike = async () => {
            // e.preventDefault();
            console.log("disliked");
            try {

                const params = { idAnnonce: annonce.annonce.idAnnonce, idUser: user.id };
                const queryStringified = queryString.stringify(params);

                await axios.delete(`https://ombaikamitadyws-production.up.railway.app/annoncefavoris/unlike?${queryStringified}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });

                // window.location.reload();
            } catch (error) {
                // navigate("/login");
                // navigation.navigate('login');
                console.log(error)

            }
        };

        const like = async () => {
            // e.preventDefault();
            console.log("liked");
            try {
                // const params = new URLSearchParams();
                // params.append("idAnnonce", annonce.annonce.idAnnonce);
                // params.append("idUser", user.id);

                const params = { idAnnonce: annonce.annonce.idAnnonce, idUser: user.id };
                const queryStringified = queryString.stringify(params);
                await axios.post(`https://ombaikamitadyws-production.up.railway.app/annoncefavoris?${queryStringified}`, null, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                });
                // window.location.reload();
            } catch (error) {
                // navigate("/login");
                // navigation.navigate('login');
                console.log(error)
            }
        };

        const months = [
            "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

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
                            {annonce.photos[0] ? (
                                <Image
                                    style={global.cardImage}
                                    source={{ uri: annonce.photos[0].lienPhoto }}
                                />
                            ) : (
                                <View style={global.none}>
                                    <Feather style={global.bgPicture} name="image" size={140} color={Colors.NORMAL_GRAY} />
                                </View>
                            )
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

                        {/* <View style={global.myIcon}>
                            <Feather name="message-circle" size={28} color={Colors.DARK_GRAY} />
                        </View> */}
                        <Text style={global.annonceDate}> {annonce.annonce.date[2]} {months[annonce.annonce.date[1] - 1]} {annonce.annonce.date[0]}</Text>


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
                </View>

            </View>
        );
    };
    const screenHeight = Dimensions.get('window').height + 300;
    return (
        <View style={global.annonces}>
            <View>

            </View>
            {/* <ScrollView> */}
                <FlatList
                    // style={global.list}
                    style={{  marginBottom: 180 }}
                    // contentContainerStyle={{ flexGrow: 1 }}
                    ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                    data={annonces}
                    renderItem={({ item }) => <Annonce annonce={item} />}
                />
            {/* </ScrollView> */}
            {/* <View style={{ height: 1300 }} /> */}
        </View>
    )
}

export default Annonces