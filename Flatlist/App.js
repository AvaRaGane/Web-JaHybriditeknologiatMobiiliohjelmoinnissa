import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

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
//      renderItem={renderItem}
      renderItem={({item}) => (
        <Text>{item.name}</Text>
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
