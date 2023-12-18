import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TodoView from './src/Layout/TodoView';
import Todo from './src/Layout/Todo';
import { NavigationContainer } from '@react-navigation/native';
import Edit from './src/Layout/Edit';
import Stack from './src/Navigation/Stack';

export default function App() {
  return (
      <NavigationContainer>
        <Stack/>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
