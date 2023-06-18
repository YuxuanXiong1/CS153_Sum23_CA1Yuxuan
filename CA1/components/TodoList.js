import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    readData()
  }, [])

  const readData = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos')

      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos))
      }
    } catch (e) {
      console.log('Failed to fetch the data from storage')
    }
  }

  const storeData = async (todos) => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos))
    } catch (e) {
      console.log('Failed to save the data to the storage')
    }
  }

  const addTodo = () => {
    if (newTodo.length > 0) {
      const updatedTodos = [...todos, { name: newTodo, completed: false }];
      setTodos(updatedTodos);
      storeData(updatedTodos);
      setNewTodo("");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 40 }}>TodoList</Text>
      
      <TextInput 
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20 }}
        onChangeText={text => setNewTodo(text)}
        value={newTodo}
        placeholder="Enter new todo"
      />
      
      <Button 
        title="Add Todo"
        onPress={addTodo}
      />

      <FlatList 
        data={todos}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 20, marginLeft: 500 }}>{item.name}</Text>
            <Text style={{ marginLeft: 500 }}>{item.completed ? 'Completed' : 'Not Completed'}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default App;
