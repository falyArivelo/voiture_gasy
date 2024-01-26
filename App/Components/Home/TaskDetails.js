import React from 'react'
import { View,Text, StyleSheet } from 'react-native';

const TaskDetails = ({navigation, route}) => {
    const task = route.params;

  return (
    <View style={styles.container}>
        <Text>{task.entete}</Text>
        <Text>{task.task}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    }
})
export default TaskDetails