import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import { useCallback, useEffect, useState } from 'react';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'ToDoList1234';

export default function App() {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  // Haetaan tiedot, kun sovellus ladataan
  useEffect(() => {
    getData();
  }, []);

  // Tallennetaan tiedot aina, kun data muuttuu
  useEffect(() => {
    if (data.length > 0) {
      storeData(data);
    }
  }, [data]);
  

  // Haetaan tiedot AsyncStoragesta
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      let json = JSON.parse(value);
      if (json === null) {
        json = [];
      }
      setData(json);
    } catch (ex) {
      console.log(ex);
    }
  };

  // Tallennetaan tiedot AsyncStorageen
  const storeData = async (value) => {
    try {
      const json = JSON.stringify(value);
      await AsyncStorage.setItem(STORAGE_KEY, json);
    } catch (ex) {
      console.log(ex);
    }
  };

  // Lisätään uusi tehtävä
  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name,
      completed: false,
    };
    const tempData = [...data, newItem];
    setData(tempData);
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Things to do</Text>
      <Add add={add} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({ item }) => (
          <Row
            item={item}
            data={data}
            setData={setData}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 40,
  },
});
