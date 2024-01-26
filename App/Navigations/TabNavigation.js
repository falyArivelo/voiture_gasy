import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screens/Home';
import Map from '../Screens/Map';
import Search from '../Screens/Search';
import Profile from '../Screens/Profile';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import HomeNavigation from './HomeNavigation';
import Colors from '../Shared/Colors';
import global from './../Shared/style/style';
import Publier from '../Screens/Publier';
import ProfileNavigation from './ProfileNavigation';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarStyle: styles.tab
    }} >
      <Tab.Screen name="HomeScreen" component={HomeNavigation}
      
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Search" component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }} />

      <Tab.Screen name="Plus" component={Publier}
        options={{
          tabBarLabel: 'plus',
          tabBarIcon: ({ color, size }) => (
            <Feather style={global.plus} name="plus" color={'white'} size={size} />
          ),
        }} />

      <Tab.Screen name="Map" component={Map}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="Profile" component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (

            <Feather name="user" color={color} size={size} />
          ),
        }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: Colors.BG_COLOR,
    borderRadius: 10,
    color: Colors.WHITE,
    paddingTop: 10, height: 60
    // marginBottom:10,
  }
})