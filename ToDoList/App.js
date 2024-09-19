import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View, useMemo } from 'react-native';
import Add from './components/Add';
import uuid from 'react-native-uuid';
import { useCallback, useEffect, useState } from 'react';
import Row from './components/Row';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  const [data, setData] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  
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
      <Text style={styles.header}>Things to do</Text>
      <Add add={add} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        renderItem={({item}) => ( 
      <Row  item={item}
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 40,
  }
});
