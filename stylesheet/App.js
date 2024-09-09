import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import StyleSheet from './Styles';

export default function App() {
  return (
    <View style={[StyleSheet.container, {alignItems: 'flex-start'}]}>
      <Text>Open up App.js to startti working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}