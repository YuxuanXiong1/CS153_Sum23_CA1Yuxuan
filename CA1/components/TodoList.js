import React, { useState } from 'react';
import { View, Button, Text, TextInput, FlatList } from 'react-native';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.length > 0) {
      setTodos([...todos, { name: newTodo, completed: false }]);
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
