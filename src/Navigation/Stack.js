import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Todo from '../Layout/Todo'
import TodoView from '../Layout/TodoView'
import Edit from '../Layout/Edit'

const nativeStack = createNativeStackNavigator()

const Stack = () => {
  return (
      <nativeStack.Navigator initialRouteName='Todo'>
        <nativeStack.Screen name='Todo' component={Todo}/>
        <nativeStack.Screen name='TodoView' component={TodoView} />
        <nativeStack.Screen name='Edit' component={Edit} />
      </nativeStack.Navigator>
  )
}

export default Stack

const styles = StyleSheet.create({})