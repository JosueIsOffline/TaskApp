import { View, 
  Text, 
  TextInput,
  StyleSheet, 
  TouchableOpacity} from 'react-native'
import React, {useState, useEffect} from 'react'

import Layout from '../components/Layout'
import { saveTask, getTask, updateTask } from "../api";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    title: "",
    description: ""
  })

  const [editing, setEditing] = useState(false);
  const [error, setErrors] = useState('')
  
  const handleChange = (name, value) => {
    setTask({...task, [name]: value})
  };

  const handleSubmit = async () => {
    try {
      if(!editing){
        await saveTask(task);
      }
      else{
        await updateTask(route.params.id, task)
      }
      navigation.navigate("HomeScreen");

    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    if(route.params && route.params.id) {
      navigation.setOptions({headerTitle: 'Updating a Task'});
      setEditing(true);

      (async () => {
        const task = await getTask(route.params.id)
        setTask({title: task.title, description: task.description})
      })();
    }
  },[]);

  const validateForm = () => {
    const errors = {};

    if(!task.title) {
      setErrors('El titulo es requerido')
    }
    else if (!task.description) {
      setErrors('La descripcion es requerida')
    }
    else{
      handleSubmit()
    }

    
    return error;
  }

  return (
    <Layout>

      {error !== '' ? (
        <Text style={{color: '#ff0200', }}>{error}</Text>
      ) : (
        <Text></Text>
      )}
      <TextInput
        style={styles.input}
        placeholder='Write a Title'
        placeholderTextColor={'#576574'}
        onChangeText={(text) => handleChange('title', text)}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholder='Write a Description'
        placeholderTextColor={'#576574'}
        onChangeText={(text) => handleChange('description', text)}
        value={task.description}
      />

      {!editing ? (
          <TouchableOpacity style={styles.btnSave} onPress={validateForm}>
            <Text style={styles.btnText}>Save Task</Text>
          </TouchableOpacity>
        ) : (

          <TouchableOpacity style={styles.btnUpdate} onPress={validateForm}>
            <Text style={styles.btnText}>Update Task</Text>
          </TouchableOpacity>

        )}  

    </Layout>
  )
}


const styles = StyleSheet.create({
  input: {
    width: '90%',
    backgroundColor: '#222f3e',
    marginBottom: 7,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor:'#10ac84',
    height: 35,
    color: '#fff',
    padding: 8,
    textAlign: 'center'
  },
  btnSave: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#10ac85',
    width: '90%'
  },
  btnText: {
    color: '#fff',
    textAlign: 'center'
  },
  btnUpdate: {
    padding: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: '#e58e26',
    width: '90%'
  }
})

export default TaskFormScreen   