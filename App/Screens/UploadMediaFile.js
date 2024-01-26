import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image, TextInput, ScrollView } from 'react-native'
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config'
import * as FileSystem from 'expo-file-system'
import global from '../Shared/style/style'
import Swiper from 'react-native-swiper';



const UploadMediaFile = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [Uploading, setUploading] = useState(false)



    const pickImage = async () => {
        //
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 5],
            quality: 1,
            allowsMultipleSelection: true
        })

        if (!result.canceled) {
            setImages(result.assets)
        }
    }

    const uploadMedia = async () => {
        setUploading(true)
        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                }
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true)
                xhr.send(null)
            })

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            await ref.put(blob)
            const downloadURL = await ref.getDownloadURL();
            console.log('Lien de téléchargement de l\'image :', downloadURL);

            setUploading(false)
            Alert.alert('Photo Uploaded !')
            setImage(null);
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const swiperRef = useRef(null);




    return (
        <ScrollView style={global.container}>
            <View style={global.publier}>
                <Text style={global.publier_titre} >Publier une annonce</Text>
                <View style={global.uploadImage_Container}>
                    {images &&
                        // images.map( (img) => <Image source={{ uri: img.uri }} style={{ width: '100%', height: '100%',margin: 5 }}/>)

                        <Swiper
                            ref={swiperRef}
                            loop={false}
                            showsButtons={false}
                            showsPagination={true}
                        // dotStyle={styles.paginationDot}
                        // activeDotStyle={styles.activePaginationDot}
                        >
                            {images.map((imageUrl, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={{ uri: imageUrl.uri }} style={styles.image} />
                                </View>
                            ))}
                        </Swiper>

                    }
                    {/* 
                    <TouchableOpacity
                        onPress={uploadMedia}
                        style={global.uploadImage_Button}
                    >
                        <Text>upload image</Text>
                    </TouchableOpacity> */}
                </View>

                <TouchableOpacity
                    onPress={pickImage}
                    style={global.pickImage_Button}
                >
                    <Text style={global.pickImage_Button_text}>
                        <Feather name="plus" size={24} color="white" />
                        <MaterialIcons name="photo" size={24} color="white" />
                    </Text>
                </TouchableOpacity>


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

export default UploadMediaFile