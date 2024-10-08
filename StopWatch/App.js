import { StatusBar } from 'expo-status-bar';
import { useEffect, useReducer, useRef } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const initialState = {
  isRunning: false,
  time: 0
}

const reducer = (state,action) =>{
  switch (action.type) {
    case 'start':
      return {...state,isRunning: true}
    case 'stop':
      return {...state,isRunning: false}
    case 'reset':
      return {isRunning:false,time:0}
    case 'tick':
      return {...state,time: state.time+1}  
    default:
      throw new Error()
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer,initialState)
  const timerId = useRef(null)

  useEffect(() => {
    if (!state.isRunning) return

    timerId.current = setInterval(() => dispatch({type: 'tick'}),1000)
    return () => {
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [state.isRunning])
  
  const FormattedTime = () => {
    const secondsInt = parseInt(state.time,10)
    const hours = String(Math.floor(secondsInt /3600))
    const minutes = String(Math.floor((secondsInt /60)%60))
    const seconds = String(secondsInt % 60)

    return <Text style={styles.time}>{hours.padStart(2,'0')}.{minutes.padStart(2,'0')}.{seconds.padStart(2,'0')}</Text>
  }

  return (
    <View style={styles.container}>
      <FormattedTime />
      <View style={styles.buttons}>
        <Button title="Start" onPress={() => dispatch({type: 'start'})}/>
        <Button title="Stop" onPress={() => dispatch({type: 'stop'})}/>
        <Button title="Reset" onPress={() => dispatch({type: 'reset'})}/>
      </View>
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
  buttons:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  }
});
