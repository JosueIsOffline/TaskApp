import { FlatList, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'

import TaskItem from './TaskItem'
import { getTasks, deleteTask } from '../api'
import { useIsFocused } from '@react-navigation/native';

const TaskList = () => {

  const [tasks, setTasks] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const isFocused = useIsFocused()

  const loadTasks = async () => {
    const data = await getTasks()
    setTasks(data)
  }

  useEffect(() => {
      loadTasks()
  }, [isFocused])

  const handleDelete = async (id) => {
    await deleteTask(id)
    await loadTasks()
  }

  const renderItem =({ item }) => {
    return <TaskItem task={item} handleDelete={handleDelete} />
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await loadTasks()
    setRefreshing(false)
  })
       
  return (
    <FlatList
    style={{width:'100%'}}
        data={tasks}
        keyExtractor={(item) => item.id + ''}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#78e08f", "#02e"]}
            progressBackgroundColor="#0a3d62"
            onRefresh={onRefresh}
          />
        }
    />
  )
}

export default TaskList