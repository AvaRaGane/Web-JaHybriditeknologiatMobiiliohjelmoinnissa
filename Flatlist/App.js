import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import Search from './components/Search';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'teppo'

export default function App() {
  const [data, setData] = useState([]) //add versiossa 
  const [selectedId, setSelectedId] = useState(null)
  const [criteria, setCriteria] = useState('')
  const items = useMemo(() =>
  criteria.length > 0 ? data.filter((item) =>item.name.startsWith(criteria)) : data,[data,criteria])
  
  useEffect(() => {
    storeData(data)
  }, [data])

  useEffect(() => {
    //AsyncStorage.clear()
    getData()
  }, [])

  const getData = async() => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      let json = JSON.parse(value)
      if (json === null) {
        json = []
      }
      setData(json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const storeData = async(value) => {
    try {
      const json = JSON.stringify(value)
      await AsyncStorage.setItem(STORAGE_KEY,json)
    } catch (ex) {
      console.log(ex)
    }
  }

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])

  const select = (id) => {
    setSelectedId(id);
  };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Shopping list</Text>
        <Search 
        criteria={criteria}
        setCriteria={setCriteria}/>
        <Add add={add} />
        <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({item}) => ( 
          <Row item={item}
          selectedId={selectedId}
          select={select}
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
      paddingTop: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      margin: 24,
    }
  });