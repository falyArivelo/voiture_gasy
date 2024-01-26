import React, { useState, useEffect } from 'react'
import { Text, View, FlatList, Pressable, TouchableOpacity } from 'react-native'
import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import infos from '../Shared/annonces'
import global from './../Shared/style/style';

const annonces = infos.annonces;

const Favoris = ({ navigation }) => {
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
                                source={{ uri: item.photo }}
                                style={{ width: '100%', height: 220,borderRadius:5 }}
                            />
                        </Pressable>
                    </View>
                </View>
            )}
        />
    )
}

export default Favoris