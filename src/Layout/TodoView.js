import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'

const TodoView = () => {
  const route = useRoute()
  let [item, setItem] = useState([])

  useEffect(()=>{
    getItem()
  },[])

  let getItem = async()=>{
    let response = await fetch(`http://127.0.0.1:8000/api/item/${route.params}`)
    let data = await response.json()
    setItem(data)
  }

  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.desc}</Text>
      <Text>{item.updated}</Text>

    </View>
  )
}

export default TodoView

const styles = StyleSheet.create({})