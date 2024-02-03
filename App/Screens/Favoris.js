import React, { useState, useEffect } from 'react'
import { View, FlatList, Pressable } from 'react-native'
import { Image } from 'react-native';
import global from './../Shared/style/style';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

// const annonces = infos.annonces;

const Favoris = ({ navigation }) => {
    const [user, setUser] = useState({});
    const [annonces, setAnnonces] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        // Fonction asynchrone pour récupérer les annonces
        const fetchAnnoncesFavoris = async () => {
            try {
                const userId = await SecureStore.getItemAsync('user');
                const user = JSON.parse(userId);
                setUser(user);
                // console.log(user)
                const storedToken = await SecureStore.getItemAsync('token');
                // console.log(storedToken)

                setToken(storedToken)
                const apiUrl = `http://192.168.88.46:8080/annoncefavoris/users/${user.id}`;
                const config = {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                    },
                };
                const response = await axios.get(apiUrl, config);
                setAnnonces(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
            }
        };
        // Appeler la fonction asynchrone
        fetchAnnoncesFavoris();
    }, [token]);


    return (
        <FlatList
            data={annonces}
            numColumns={2}
            style={{ padding: 10 }}
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
                    </View>
                </View>
            )}
        />
    )
}

export default Favoris