import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import useAbortableFetch from './hooks/useAbortableFetch';
import { ScrollView } from 'react-native-web';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

export default function App() {
const [phrase, setPhrase] = useState('')
const urlRef = useRef()
const {json, error, loading} = useAbortableFetch(urlRef.current)
const controllerRef = useRef

const searchCocktails = (text) => {
  setPhrase(text)
  const adress = URL + text
  urlRef.current = adress
  /*   if (controllerRef.current) {
    controllerRef.current.abort()
  }
  controllerRef.current = new AbortController()
  const signal = controllerRef.current.signal

  const adress = URL + text
  fetch(adress, {signal})
  .then(response => response.json())
  .then((json) => {
    console.log(json)
  }).catch((error) => {
    console.log(error)
  }) */

}

  return (
    <View style={styles.container}>
      <View style={styles.searchbox}>
        <Text style={styles.heading}>Coctails</Text>
        <TextInput
        style={styles.field}
        placeholder='Enter name...'
        value={phrase}
        onChangeText={text => searchCocktails(text)} 
        />
      </View>
      <ScrollView>
        {
          (json !==null) && json.drinks !== null &&
            json.drinks.map(drink =>(
              <Text key={drink.strDrink}>{drink.strDrink}</Text>
            ))
        }
      </ScrollView>
      <Text style={styles.field}></Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 32,
    margin: 8,
  },
  searchbox: {

  },
  heading:{
    fontSize: 40,
    marginTop: 16,
    marginBottom: 16,
  },
  field: {
    marginTop: 8,
    marginBottom: 16,
  },
});
