import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [age, setAge] = useState('')
  const [lowerHr, setLowerHr] = useState(0)
  const [higherHr, setHigherHr] = useState(220)

  const calculate = () => {
    if (age>0){
      setLowerHr((220-age)*0.65)
      setHigherHr((220-age)*0.85) 
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.field}>Age</Text>
      <TextInput
        style={styles.field}
        placeholder='age in years'
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType='decimal-pad'
      />

      <Text style={styles.field}>Limits {lowerHr.toFixed(0)}--{higherHr.toFixed(0)}</Text>
      <Button title='Calculate' onPress={calculate}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    paddingTop: 40,
    margin: 16,
  },
  field: {
    marginTop:8,
    marginBottom:8,
  }
});