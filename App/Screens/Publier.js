import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import UploadMediaFile from './UploadMediaFile';
import { TouchableOpacity } from 'react-native';
import global from '../Shared/style/style'
import AnnonceForm from './AnnonceForm';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

const Publier = () => {
  const swiperRef = useRef(null);

  const [page1Data, setPage1Data] = useState('Données de la page 1');

  const handleNext = () => {
    // Mettez à jour les données de la page 2 en fonction des données de la page 1
    // Vous pouvez faire ici des opérations ou des calculs avec page1Data
    const page2Data = `Données de la page 2 basées sur ${page1Data}`;

    // Affichez les données de la page 2 (vous pouvez également naviguer à la page 2)
    console.log(page2Data);
    if (swiperRef.current) {
      swiperRef.current.scrollBy(1);
    }
  };

  const handlePrev = () => {
    // Utilisez la référence de Swiper pour faire défiler vers la page précédente
    if (swiperRef.current) {
      swiperRef.current.scrollBy(-1);
    }
  };

  return (
    // <UploadMediaFile />
    <Swiper
      ref={swiperRef} // Attachez la référence de Swiper
      loop={false}
      showsButtons={false}
      showsPagination={false}
      gestureEnabled={false}
      scrollEnabled={false}
    >
      {/* Page 1 */}
      <View style={styles.slide}>
        {/* <Text>Contenu de la page 1</Text> */}
        <UploadMediaFile />
        <TouchableOpacity style={global.publier_next_button} onPress={handleNext}>
          <Text style={global.publier_next_button_text}>Suivant</Text>
        </TouchableOpacity>

      </View>

      {/* Page 2 */}
      <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} >
        <AnnonceForm style={global.publier_annonceForm} />
        <View style={global.myFlex}>
          <TouchableOpacity style={global.publier_previous_button} onPress={handlePrev}>
            <Text style={global.publier_previous_button_text}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={global.publier_apercu_button} onPress={handleNext}>
            <Text style={global.publier_apercu_button_text}>
              Aperçu
              <Ionicons name="arrow-forward" size={24} color="white" />

            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.slide}>
      <TouchableOpacity style={global.publier_previous_button} onPress={handlePrev}>
            <Text style={global.publier_previous_button_text}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </Text>
          </TouchableOpacity>
      </View>

    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    position: 'relative'
  },
});

export default Publier;
