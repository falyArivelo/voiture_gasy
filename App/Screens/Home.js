import Header from '../Components/Home/Header'
import { View, StyleSheet } from 'react-native'
import Colors from '../Shared/Colors'
import SearchBar from '../Components/Search/SearchBar'
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import Annonces from '../Components/Home/Annonce';

const Drawer = createDrawerNavigator();

export default function Home({ navigation }) {


  return (
    <View className="home">
      <Header navigation={navigation} />
      <Annonces navigation={navigation} />
    </View>
  )
}

