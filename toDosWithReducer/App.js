import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useReducer } from 'react'


const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      console.log(Date.now())
      return [...state, { id: Date.now(), name: action.payload }]
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload)
    default:
      return state;
  }
}

export default function App() {
  const [name, setName] = useState('')
  const [todos, dispatch] = useReducer(todoReducer, [])

  const addTodo = () => {
    if (name.trim()) {
      dispatch({ type: 'ADD_TODO', payload: name })
      setName('')
    }
  }

  const removeTodo = (id) => {
    dispatch({ type: 'REMOVE_TODO', payload: id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput style={styles.input} value={name} placeholder="Item name..." onChangeText={text => setName(text)}
        />
        <Button title='SAVE' onPress={addTodo}/>
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => removeTodo(item.id)}>
            <Text style={styles.todo}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 60,
  },
  inputView:{
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input:{
    flex: 1, 
    borderBottomWidth: 1,
    marginRight: 10,
    padding: 8,
  },
  todo: {
    padding: 10,
    fontSize: 18,
    backgroundColor: '#f5f5f5',
    marginBottom: 5,
  }
});