import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import Map from './screens/Map';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import Constants from 'expo-constants'
import * as Location from 'expo-location'

const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know)
  const [location, setLocation] = useState({
    latitude: 65.08000,
    longitude: 25.4600,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
})

const getUserPosition = async () => {
  let {status} = await Location.requestForegroundPermissionsAsync()

  try {
      if (status !=='granted'){
          console.log('Geolocation failed')
          return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
  } catch (error) {
      console.log(error)
  }
}

  return (
    <PaperProvider>
      <MainAppBar 
        title="Map"
        backgroundColor={settings.backgroundColor}
        icon={icon}
        getUserPosition={getUserPosition}
      />
      <SafeAreaView style={styles.container}>
        <Map location={location}/>
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ff0000',
      alignItems: 'center',
      justifyContent: 'center',
      //marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  }
})