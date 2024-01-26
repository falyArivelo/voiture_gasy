import React from 'react'
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home';
import TaskDetails from '../Components/Home/TaskDetails';
import { StyleSheet } from 'react-native';
import Colors from '../Shared/Colors';
import Parameter from '../Screens/Parameter';
import QRcodeGenerator from '../Components/QRCode/QRcodeGenerator';
import AnnonceDetails from '../Screens/AnnonceDetails';
import Favoris from '../Screens/Favoris';
import Notifications from '../Screens/Notifications';

export default function HomeNavigation() {
  const isAndroid = true;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      animationEnabled: true,

      // ...(isAndroid && TransitionPresets.ModalPresentationIOS)

    }}
     style={styles.container}>
      <Stack.Screen name='home-screen'
        options={{ headerShown: false }}
        component={Home} />
      <Stack.Screen name="AnnonceDetails" component={AnnonceDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Parameter" component={Parameter} />
      <Stack.Screen name="QRcode" component={QRcodeGenerator} />
      <Stack.Screen name="Favoris" component={Favoris} />
      <Stack.Screen name="Notifications" component={Notifications} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
    paddingTop: 0
  }
});