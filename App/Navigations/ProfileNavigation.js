import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native';
import Colors from '../Shared/Colors';
import Parameter from '../Screens/Parameter';
import AnnonceDetails from '../Screens/AnnonceDetails';
import Favoris from '../Screens/Favoris';
import Notifications from '../Screens/Notifications';
import Profile from '../Screens/Profile';

export default function ProfileNavigation() {
  const isAndroid = true;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      animationEnabled: true,

      // ...(isAndroid && TransitionPresets.ModalPresentationIOS)

    }}

     style={styles.container}>
      <Stack.Screen name='Profile_screen'
        options={{ headerShown: false }}
        component={Profile} />
      <Stack.Screen name="AnnonceDetails" component={AnnonceDetails} options={{ headerShown: false }} />
      <Stack.Screen name="Parameter" component={Parameter} />
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