import { View, Text, Image, StyleSheet, TextInput, Dimensions, Pressable } from 'react-native'
import React from 'react'
import Colors from '../../Shared/Colors'
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { Ionicons, Feather } from '@expo/vector-icons';
import infos from '../../Shared/tasks';
import global from '../../Shared/style/style';

const utilisateur = infos.utilisateur;

export default function Header({ navigation }) {
    return (
        <View style={styles.header}>
            <Pressable
                onPress={() => navigation.navigate('Home')}>
                {/* <View className="myicon" >
                    <Icon name="menu" size={30} color={Colors.DARK_GRAY} />
                </View> */}
                <Text  style={global.logo}>Vaika</Text>
            </Pressable>

            <View style={global.myFlex}>
                <Pressable
                    onPress={() => navigation.navigate('Favoris')}>
                    <View style={global.myIcon}>
                        <Feather name="heart" size={26} color={Colors.DARK_GRAY} />
                    </View>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('Notifications')}>
                    <View style={global.myIcon}>
                        <Ionicons name="notifications-outline" size={28} color={Colors.DARK_GRAY} />
                        <Text style={global.notifsNombre}>3</Text>
                    </View>

                </Pressable>


            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        marginTop: 20,
        padding: 20,
        paddingBottom: 0,
        backgroundColor:Colors.BG_COLOR
    },
    logo: {
        width: 50,
        height: 50
    },

    userImage: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    icon: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: Colors.WHITE,
        padding: 0
    }
})