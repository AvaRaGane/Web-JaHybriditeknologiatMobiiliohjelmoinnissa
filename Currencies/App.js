import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import CurrencySelector from './components/CurrencySelector';

const API_KEY = ''
const BASE_URL = 'https://v6.exchangerate-api.com/v6/' + API_KEY + '/latest/EUR'

export default function App() {
  const [eur, setEur] = useState('')
  const [rates, setRates] = useState([])
  const [rate, setRate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const result = eur * rate

  useEffect(() => {
    const address = BASE_URL
    fetch(address)
      .then(response => response.json())
      .then((result) =>{
        const json = result.conversion_rates
        setRates(jsonToRatesArray(json))
        setRate(json.GBP)
      }).catch ((error) => {
        setError(error)
        setRate(0)
      })
      setIsLoading(false)
  }, [])

  const jsonToRatesArray = (json) => {
    return [
      {key:'GPB',label: 'Pounds',value: json.GBP},
      {key:'SEK',label: 'Swedish crown',value: json.SEK},
      {key:'NOK',label: 'Norwegian crown',value: json.NOK},
      {key:'US',label: 'US dollars',value: json.USD}
    ]
  }
  
  if (API_KEY==='') return <View style={styles.container}><Text>API_KEY missing</Text></View>
  else if (isLoading) return <View style={styles.container}><ActivityIndicator size="large"/></View>
  else if (error) return <View style={styles.container}><Text>{error.message}</Text></View>
  else{
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Currency converter</Text>
        <Text style={styles.field}>EUR</Text>
        <TextInput
          style={styles.field}
          keyboardType='decimal-pad'
          value={eur}
          onChangeText={text => setEur(text)}
          placeholder='Amount of euros'/>
        <CurrencySelector values={rates} selected={rate} onValueChange={setRate}/>
        <Text style={styles.field}>{result.toFixed(2)}</Text>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginTop: 40,
  },
  heading: {
    width: '100%',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  field: {
    marginLeft: 16,
    marginBottom: 8,
  },
});
