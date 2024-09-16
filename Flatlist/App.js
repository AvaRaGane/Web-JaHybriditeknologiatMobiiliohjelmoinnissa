import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';
import { useCallback, useEffect, useState } from 'react';
import Add from './components/Add';
import uuid from 'react-native-uuid';

export default function App() {
  const [data, setData] = useState([]) //add versiossa 
  const [selectedId, setSelectedId] = useState(null) //poistossa

  const add = useCallback((name) => { //add versiossa
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

//  const renderItem = ({item}) => {
//    return (<Text>{item.name}</Text>)
//  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shopping list</Text>
      <Add data={data} setData={setData} />
      <FlatList
      data={data}
      keyExtractor={(item) => item.id} //poistossa 
      extraData={selectedId}//poistossa
//      renderItem={renderItem} //funktiolla
        renderItem={({item}) => ( //ilman funktiota ja komponentilla
//        <Text>{item.name}</Text> //ilman funktiota
          <Row 
          item={item}
          selectedId={selectedId}//poistossa
          select={select}//poistossa
          /> //komponentilla
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
