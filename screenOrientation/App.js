import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const [screenOrientation, setScreenOrientation] = useState('portrait')
  const [isPortrait, setIsPortrait] = useState(true)

  useEffect(() => {
    const subscripition = ScreenOrientation.addOrientationChangeListener((value) =>{
      if (value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP | value.orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
        setScreenOrientation("portrait");
        setIsPortrait(true);
      } else if (value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT | value.orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT) {
        setScreenOrientation("landscape");
        setIsPortrait(false);
      }
    });
    return () => {
    ScreenOrientation.removeOrientationChangeListener(subscripition)
    }
  }, [])
  

  const lockToPortrait = async () => {
    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
  }

  return (
    <View style={[styles.container, isPortrait ? styles.portrait : styles.landscape]}>
      <Text>{screenOrientation}</Text>

      {(() => {
        if (isPortrait) {
        return <Text>This content is only for portrait</Text>
      } else {
        return <Text>This content is only for landscape</Text>
        }
      })()}

      <Button onPress={lockToPortrait} title="Lock to portrait" />
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
  portrait: {
    backgroundColor: 'green'
  },
  landscape: {
    backgroundColor: 'red'
  }
});
