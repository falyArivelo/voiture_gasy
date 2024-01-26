import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeNavigation from './HomeNavigation';

const PublierNavigation = () => {
    const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{
        gestureEnabled: false,
        animationEnabled: true,  
        // ...(isAndroid && TransitionPresets.ModalPresentationIOS)
      }}
    >
        <Stack.Screen name='Publier_images'
          options={{ headerShown: false }}
          component={Login} />
        <Stack.Screen name="Publier_informations" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }} />
  
      </Stack.Navigator>
  )
}

export default PublierNavigation