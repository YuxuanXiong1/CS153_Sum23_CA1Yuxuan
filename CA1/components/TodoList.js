import React, { useState, useEffect } from 'react';
import { View, Button, Text, TextInput, FlatList, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import open_api_key from './open_api_key';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [importanceLevel, setImportanceLevel] = useState("1");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {readData()}, [])

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
      const updatedTodos = [...todos, { name: newTodo, completed: false, importance: importanceLevel }];
      setTodos(updatedTodos);
      storeData(updatedTodos);
      setNewTodo("");
      setImportanceLevel("1");
    }
  };

  const deleteTodo = (index) => {
    let updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  const markComplete = (index) => {
    let updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
    storeData(updatedTodos);
  };

  const getResponse = async () => {
    try {
      const url = 'https://api.openai.com/v1/chat/completions'
      const config = {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer '+open_api_key,
        },
      }
      const msg_data = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": newTodo}],
        "temperature": 0.7
      }
      const response = await axios.post(url, msg_data, config)
      const result = await response.data;
      setLoading(false);
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView style={styles.halfContainer}>
        <Text style={{ fontSize: 40 }}>TodoList</Text>
        
        <View style={{flexDirection:'row', alignSelf:'center'}}>
          <TextInput 
            style={styles.input}
            onChangeText={text => setNewTodo(text)}
            value={newTodo}
            placeholder="Enter new todo"
          />
          <Picker
            selectedValue={importanceLevel}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setImportanceLevel(itemValue)
            }>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>

        <Button 
          title="Add Todo"
          onPress={addTodo}
        />

        <Text style={styles.or}>
          or
        </Text>

        <Button 
          title="Ask GPT"
          onPress={getResponse}
          color="#841584"
        />

        <FlatList 
          data={todos}
          renderItem={({ item, index }) => (
            <View style={styles.todoItem}>
              <TouchableOpacity onPress={() => markComplete(index)}>
                <Text style={[styles.todoText, { color: item.completed ? 'green' : 'black' }]}>{item.name}</Text>
              </TouchableOpacity>
              <Text style={styles.todoText}>{item.completed ? 'Completed' : 'Not Completed'}</Text>
              <Text style={styles.todoText}>Importance: {item.importance}</Text>
              <TouchableOpacity onPress={() => deleteTodo(index)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>

      <View style={styles.halfContainer}>
        <Text style={styles.gptResponseText}>
          {data.choices && data.choices.map((choice, index) => (
            <Text key={index}>{choice.message.content}</Text>
          ))}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  halfContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  picker: {
    height: 50,
    width: 100,
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  todoText: {
    fontSize: 20,
    marginRight: 10,
  },
  deleteText: {
    color: 'red',
  },
  gptResponseText: {
    fontSize: 16,
  },
  or: {
    alignSelf: 'center',
    fontSize: 24,
  },
});

export default TodoList;
