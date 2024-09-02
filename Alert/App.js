import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [ok, setOk] = useState(false);

  const showAlert = () => {
    Alert.alert(
      "My title",
      "This is test message.",
      [
        {
          text: "Ok",
          onPress: () => setOk(true)
        },
        {
          text: "Cancel",
          onPress: () => setOk(false)
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Button title={'Open dialog'} onPress={showAlert}></Button>
      <Text>{ok===true ? 'ok' : 'cancel'}</Text>
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
