import { StyleSheet, SafeAreaView, Platform } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker } from 'react-native-maps'


export default function Map({location,mapType}) {
  const [markers, setMarkers] = useState([])

  const showMarker = (e) => {
    const coords = e.nativeEvent.coordinate
    setMarkers([...markers,coords])
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView 
        style={styles.map}
        region={location}
        mapType={mapType}
        onLongPress={showMarker}
      >
        {
          markers.map((marker, index) =>(
            <Marker
            key={index}
            title={`Marker ${index + 1}`}
            coordinate={{latitude: marker.latitude,longitude: marker.longitude}}
            />
          ))
        }
      </MapView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000',
    alignItems: 'center',
    justifyContent: 'center',
    /* marginTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0, */
  },
  map: {
    height: '100%',
    width: '100%'
  },
});