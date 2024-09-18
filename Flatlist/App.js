import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Row from './components/Row';

export default function App() {
  const data = [
    {id: "1", name: "milk"},
    {id: "2", name: "bread"}
  ]

//  const renderItem = ({item}) => {
//    return (<Text>{item.name}</Text>)
//  }
  
  return (
    <SafeAreaView style={styles.container}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});
