import { Text, View, StyleSheet, RefreshControl} from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native'
import { Button } from 'react-native-web'
import { useNavigation } from '@react-navigation/native'
import { json } from 'react-router-dom'

const Todo =()=> {
    let [newItemName, setNewItemName] = useState([])
    let [newItemDesc, setNewItemDesc] = useState([])
    const navigate = useNavigation()
    let [items, setItems] = useState([])

    useEffect(()=>{
            getItems()
        },[])

    let getItems = async()=>{
        let response = await fetch('http://127.0.0.1:8000/api/items/')
        let data = await response.json()
        setItems(data)
    }

    let onDelete=async(id)=>{
        let response = await fetch(`http://127.0.0.1:8000/api/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await response.json()
        console.log(data)
        window.location.reload()
    }

    let fetchData = ({item}) => {
        
        return(
            <View style={styles.itemList}>
                <View style={styles.items}>
                    <Text style={styles.itemListText} onPress={()=> navigate.navigate('TodoView', item.id)}>
                        {item.name}
                    </Text>
                </View>
                <View style={styles.actionBtn}>
                    <TouchableOpacity style={styles.editBtn} onPress={()=>navigate.navigate('Edit', item.id)}>
                        <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteBtn} onPress={()=>onDelete(item.id)}>
                        <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        )
    }

    let addHandler = () =>{
       console.log('add')
    }

    let addBtn = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/create/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": newItemName,
                "desc": newItemDesc
            })
        })
        let data = await response.json()
        window.location.reload()
    }



    return (
      <SafeAreaView>
        <View>
            <Text style={styles.title}>Todo</Text>
            <TextInput 
             placeholder='Add name'
             style={styles.input}
             onChangeText={(text)=>setNewItemName(text)}
             />
            <TextInput 
             placeholder='Add description'
             style={styles.input}
             onChangeText={(text)=>setNewItemDesc(text)}
             />

            <TouchableOpacity style={styles.addBtn}>
                <Text style={styles.addBtnText} onPress={addBtn}>Add</Text>
            </TouchableOpacity>
            <Text>{newItemName}</Text>
            <Text>{newItemDesc}</Text>

            <FlatList style={styles.flatList} data={items}
            keyExtractor={item=>item.id}
            renderItem={fetchData}
            refreshControl={
                <RefreshControl
                refreshing={false}
                onRefresh={Todo}
                />
            }
            />
        </View>
      </SafeAreaView>
    )
  }

export default Todo

const styles = StyleSheet.create({
    title:{
        color:"white", 
        backgroundColor:"black",
        textAlign: "center",
        paddingVertical:15,
        marginTop: 27,
        fontSize:20,
        fontWeight: "600",

    },
    input:{
        borderWidth: 3,
        marginVertical: 10,
        marginHorizontal: 10, 
        borderRadius: 6,
        borderColor: "#00b8b8",
        paddingHorizontal:10,
        paddingVertical:5,
    },
    addBtn:{
        backgroundColor:"#00b8b8",
        paddingVertical: 5,
        marginBottom: 20,
        marginHorizontal: 50,
        borderRadius:6,
    },
    addBtnText:{
        textAlign: "center",
        color:"white",
        fontSize: 17,
        fontWeight:"600",
    },
    flatList:{
        height: 300,
        backgroundColor:"#e8e8e8"
    },
    itemList:{
        backgroundColor:"#009e69",
        margin:5,
        paddingHorizontal: 10,
        paddingVertical: 2, 
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        borderRadius: 6,
    },
    itemListText:{
        color: "white",
        paddingLeft: 20,
    },

    actionBtn:{
        display:"flex",
        flexDirection:'row'
    },
    editBtn:{
    },
    editBtnText:{
        color:"white",
        backgroundColor:"blue",
        padding:5, 
        margin: 10,
        textAlign:"center",
        borderRadius:5
    },
    deleteBtnText:{
        color:"white",
        backgroundColor:"red",
        padding:5,
        margin: 10,
        borderRadius:5
    }

});