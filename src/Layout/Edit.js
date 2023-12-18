import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TextInput } from 'react-native'

const Edit = () => {
  const navigation = useNavigation()
  const route = useRoute()
  let [item, setItem] = useState("")
  let [updateName, setUpdateName] = useState([])
  let [updateDesc, setUpdateDesc] = useState([])

  useEffect(()=>{
    getItem()
  },[])

  let getItem = async()=>{
    let response = await fetch(`http://127.0.0.1:8000/api/item/${route.params}/`)
    let data = await response.json()
    setItem(data)
  }

  let updateButton = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/update/${route.params}/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({"name": updateName, "desc": updateDesc})
    })
    let data = await response.json()
    console.log(data)
    navigation.navigate('Todo')  
}

  return (
    <View>
      <Text>Edit {item.name}</Text>

      <TextInput value={item.name}
      style={styles.input}
      onChangeText={(text)=>setUpdateName(text)}
      />

      <TextInput value={item.desc}
      style={styles.input}
      onChangeText={(text)=>setUpdateDesc(text)}
      />

      <TouchableOpacity style={styles.updateBtn} onPress={updateButton}>
        <Text style={styles.updateBtnText}>Update</Text>
      </TouchableOpacity>
      <Text>{updateName}</Text>
      <Text>{updateDesc}</Text>
    </View>
  )
}

export default Edit

const styles = StyleSheet.create({
  input:{
    margin:5, 
    paddingHorizontal:10,
    paddingVertical:3,
    borderColor: "blue",
    borderWidth: 2,
    borderRadius: 5
  },
  updateBtn:{
    marginVertical:7,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor: "#00b8b8",
    color: "white",
    borderRadius: 5,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  updateBtnText:{
    color:"white"
  }
})