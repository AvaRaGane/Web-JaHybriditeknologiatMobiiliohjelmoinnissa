import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';
import { useCallback, useEffect, useState } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';

export default function App() {
  const [data, setData] = useState([]) //add versiossa 
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
        <Text style={styles.header}>Shopping list</Text>
        <Add add={add} />
        <FlatList
        data={data}
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
      paddingTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });