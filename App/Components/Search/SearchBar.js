import { View, Text, StyleSheet, Pressable, Button, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import Colors from "../../Shared/Colors";
import { Image } from "react-native";
import { TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { FontAwesome5 } from '@expo/vector-icons';
export default function SearchBar({ setSearchText }) {
  const [searchInput, setSearchInput] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categoriesData = [
    { id: '1', name: 'Citadines' },
    { id: '2', name: 'Berlines' },
    { id: '3', name: 'Breaks' },
    { id: '4', name: 'SUV' },
    { id: '5', name: 'Coupés' },
    { id: '6', name: 'Cabriolets' },
    { id: '7', name: 'Monospaces' },
    { id: '8', name: 'Pick-up' },
    { id: '9', name: 'électriques' },
    { id: '10', name: 'fourgonnettes ' },
    { id: '11', name: 'camionnettes' },

  ];

  const toggleCategorySelection = (categoryId) => {
    // Vérifie si la catégorie est déjà sélectionnée
    const isCategorySelected = selectedCategories.includes(categoryId);

    // Mise à jour du tableau des catégories sélectionnées
    if (isCategorySelected) {
      setSelectedCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        categoryId,
      ]);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        {
          backgroundColor: selectedCategories.includes(item.id) ? 'black' : 'white',
        },
      ]}
      onPress={() => toggleCategorySelection(item.id)}
    >
      <Text
        style={{ color: selectedCategories.includes(item.id) ? 'white' : 'black' , fontSize: 16,}}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={28} color={Colors.DARK_GRAY} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={Colors.DARK_GRAY}
            style={styles.input}

            onChangeText={(value) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
        <Pressable onPress={openModal}>
          <View style={styles.icon} >
            <FontAwesome5 name="sliders-h" size={24} color={Colors.DARK_GRAY} />
          </View>
        </Pressable>


      </View>
      <View className="searchBar_categories">
        <FlatList
          data={categoriesData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
    paddingTop: 5,
    gap: 10,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingLeft: 25,
    gap: 5,
    elevation: 0,
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 50,
  },
  input: {
    backgroundColor: Colors.WHITE,
    width: "80%",
    color: Colors.PRIMARY,
    fontSize: 20,
    padding: 5,
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
  },
  flatListContent: {
    paddingHorizontal: 20,
  },
  categoryItem: {
    borderRadius: 20,
    marginRight: 10,
    padding: 10,
    paddingLeft:15,
    paddingRight:15,
    // borderWidth: 1,
    // borderColor: 'black',
    alignItems: 'center',
    fontSize:30
  },

});
