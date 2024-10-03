import { StatusBar } from 'expo-status-bar';

import { Button, StyleSheet, Text, View } from 'react-native';
import useBeerData from './hooks/useBeerData';
import { useEffect, useState } from 'react';

export default function App() {
  const {brand, name, style, loading, error, getBeerData} = useBeerData()
  const [disabled, setDisabled] = useState(false)
  
  const handlePress = () => {
    setDisabled(true)
    getBeerData()
    setTimeout(() => {
      setDisabled(false)
    }, 2000);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Random beer</Text>
      {
        error? (
          <Text>{error}</Text>
        ):(
        <>
      <Text style={styles.text}>{loading === false ? brand: 'Loading...'}</Text>
      <Text style={styles.text}>{loading === false ? name: 'Loading...'}</Text>
      <Text style={styles.text}>{loading === false ? style: 'Loading...'}</Text>
      </>)}
      <Button title="Next" onPress={handlePress} disabled={loading ? true: disabled}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    fontSize: 24,
  },
  text: {
    marginBottom: 16,
  }
});