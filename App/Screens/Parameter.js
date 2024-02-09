import React from 'react'
import { StyleSheet, View ,Text} from 'react-native'
import Colors from '../Shared/Colors'

const Parameter = ({ navigation, route }) => {
  const utilisateur = route.params;

  return (
    <View style={styles.container}>
      <Text>{utilisateur.nom}</Text>
      <Text>{utilisateur.email}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG_COLOR
  }
})


export default Parameter
