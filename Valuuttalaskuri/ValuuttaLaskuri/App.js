import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [euros, setEuros] = useState('')
  const [pounds, setPounds] = useState(0)

  /*const calculate = () => {
    const result = euros.replace(',','.') * 0.9
    setPounds(result)
  }*/

  /*const calculate = (value) => {
      setEuros(value)
      const result = value.replace(',','.') * 0.9
      setPounds(result)
  }*/
    
    useEffect(() => {
      const result = euros.replace(',','.') * 0.9
      setPounds(result)
    
    }, [euros])
    

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Euros</Text>
      <TextInput
        style={styles.field}
        placeholder='amount of euros'
        value={euros}
        /*onChangeText={text => calculate(text)}*/
        onChangeText={text => setEuros(text)}
        keyboardType='decimal-pad'
      />
      <Text style={styles.field}>Pounds</Text>
      <Text style={styles.field}>{pounds.toFixed(2)}</Text>
      {/*<Button title='Calculate' onPress={calculate}></Button>*/}
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