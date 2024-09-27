import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Platform } from 'react-native';
import Map from './screens/Map';
import { useState } from 'react';
import { PaperProvider } from 'react-native-paper';
import MainAppBar from './components/MainAppBar';
import Constants from 'expo-constants'
import * as Location from 'expo-location'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from './screens/Settings';

const settings = {
  backgroundColor: '#00a484'
}

const icons = {
  location_not_know: 'crosshairs',
  location_searching: 'crosshairs-question',
  location_found: 'crosshairs-gps'
}

const Stack = createNativeStackNavigator()

export default function App() {
  const [icon, setIcon] = useState(icons.location_not_know)
  const [location, setLocation] = useState({
    latitude: 65.08000,
    longitude: 25.4600,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
})
  const [mapType, setMapType] = useState('standard')

const getUserPosition = async () => {
  let {status} = await Location.requestForegroundPermissionsAsync()
  setIcon(icons.location_searching)

  try {
      if (status !=='granted'){
          console.log('Geolocation failed')
          return
      }
      const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
      setLocation({...location,"latitude": position.coords.latitude,"longitude": position.coords.longitude})
      setIcon(icons.location_found)
  } catch (error) {
      console.log(error)
  }
}

  return(
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName='Map'
            screenOptions={{header: (props) =>
            <MainAppBar {...props}
              backgroundColor={settings.backgroundColor}
              icon={icon}
              getUserPosition={getUserPosition}/>}}
         >
            <Stack.Screen name='Map'>
              {() =>
                <Map location={location} mapType={mapType}/>
              }
            </Stack.Screen>
            <Stack.Screen name='Settings'>
              {() =>
                <Settings mapType={mapType} setMapType={setMapType} />
              }
            </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
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