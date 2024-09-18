import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';
import { useCallback, useEffect, useState } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';

export default function App() {
  const [data, setData] = useState([]) //add versiossa 

  const add = useCallback((name) => {
    const newItem = {
      id: uuid.v4(),
      name: name
    }
    const tempData = [...data, newItem]
    setData(tempData)
  }, [data])


/*  const data = [  //ilman lisäämistä kovakoodattuna
    {id: "1", name: "milk"},
    {id: "2", name: "bread"}
   ]*/
    return (
      <SafeAreaView style={styles.container}>
        <Add add={add} />
        <FlatList
        data={data}
  //      renderItem={renderItem} //funktiolla
          renderItem={({item}) => ( //ilman funktiota
  //        <Text>{item.name}</Text> //ilman funktiota
            <Row item={item}/> //komponentilla
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