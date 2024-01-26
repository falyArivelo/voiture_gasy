import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './App/Navigations/TabNavigation';
import Colors from './App/Shared/Colors';
import { useFonts } from '@expo-google-fonts/poppins';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './App/Navigations/AuthNavigation';
import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const Stack = createStackNavigator();


export default function App() {
  // const user = true;

  async function checkUserExists() {
    const token = await SecureStore.getItemAsync('token');
    const user = await SecureStore.getItemAsync('user');

    return !!token && !!user;
  }


  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    checkUserExists().then((result) => {
      setIsUserLoggedIn(result);
    });
  }, []);




  const [fontsLoaded] = useFonts({
    'raleway': require('./assets/Fonts/Raleway-Regular.ttf'),
    'raleway-bold': require('./assets/Fonts/Raleway-SemiBold.ttf'),

  });

  return (
    <View style={styles.container} className="flex-1">
      <NavigationContainer>

        {/* <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={isUserLoggedIn ? TabNavigation : AuthNavigation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator> */}

        {isUserLoggedIn ? (
          <Stack.Navigator>
            <Stack.Screen
              name="TabNavigation"
              component={TabNavigation}

              options={{ headerShown: false }}
            />

          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={AuthNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}

      </NavigationContainer>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR,
    paddingTop: 0,

  }
});
