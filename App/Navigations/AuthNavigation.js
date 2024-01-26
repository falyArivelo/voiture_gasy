import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StyleSheet } from 'react-native';
import Colors from '../Shared/Colors';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Home from '../Screens/Home';
import HomeNavigation from './HomeNavigation';
import TabNavigation from './TabNavigation';

export default function AuthNavigation() {
  const isAndroid = true;
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{
      gestureEnabled: false,
      animationEnabled: true,

      // ...(isAndroid && TransitionPresets.ModalPresentationIOS)

    }}
     style={styles.container}>
      <Stack.Screen name='Login'
        options={{ headerShown: false }}
        component={Login} />
      <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={TabNavigation} options={{ headerShown: false }} />

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