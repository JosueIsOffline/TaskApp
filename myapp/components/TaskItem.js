import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from "@react-navigation/native";

const TaskItem = ({task, handleDelete}) => {

  const navigation = useNavigation()

  return (
    <View style={styles.itemContainer}>

      <TouchableOpacity onPress={() => navigation.navigate('TaskFormScreen', {id: task.id})}>
        <Text style={styles.itemTitle}>{task.title}</Text>
        <Text style={styles.itemTitle}>{task.description}</Text>
      </TouchableOpacity>
      
    
      <TouchableOpacity
        onPress={() => handleDelete(task.id)}
      >
        <Text style={styles.btnDelete}>Delete</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#333333",
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItem: 'center'
    },
    itemTitle: {
        color: "#fff"
    },
    btnDelete: {
      width: '90%',
      backgroundColor: '#333333',
      fontSize: 14,
      borderRadius: 5,
      borderWidth: 1,
      borderColor:'#ff0000',
      height: 35,
      color: '#fff',
      padding: 7,
      marginRight: 7,
      textAlign: 'center'
    }
})

export default TaskItem