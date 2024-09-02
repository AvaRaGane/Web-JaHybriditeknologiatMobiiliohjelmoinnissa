import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text,  View } from 'react-native';

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() =>{
      setIsLoading(false);
    },3000);
  }, [])
  
  
  return (
    <View style={styles.container}>
      {isLoading &&
      <ActivityIndicator size="large" animating={true} />
      }
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
});
