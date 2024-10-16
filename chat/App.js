import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { firestore, collection, query, addDoc, onSnapshot, orderBy, MESSAGES, serverTimestamp, getAuth, signInWithEmailAndPassword } from './firebase/Config';
import react, {useState, useEffect, useRef} from 'react';
import { convertFirebaseTimeStampToJS } from './helper/Functions';
import Login from './screens/Login';

export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage ] = useState('')
  const [logged, setLogged] = useState(false)
  const [emailAdress, setEmailAdress] = useState('')
  const scrollViewRef = useRef();

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp(),
      user: emailAdress
    }).catch (error => console.log(error))
    setNewMessage('')
  }

  const logOut = () => {
    setLogged(false)
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'asc'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const tempMessages = [];
      QuerySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id, created: convertFirebaseTimeStampToJS(doc.data().created), user: doc.data().user });
      });
      setMessages(tempMessages);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);
  
  if (logged) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}  ref={scrollViewRef}>
          {
            messages.map((message) => (
              <View key={message.id} style={styles.message}>
                <Text style={styles.messageInfo}>{message.created}</Text>
                <Text style={styles.messageInfo}>{message.user}</Text>
                <Text>{message.text}</Text>
              </View>
            ))
          }
        </ScrollView>
        <View style={styles.form}>
          <TextInput
          placeholder='Send message...'
          value={newMessage}
          onChangeText={text => setNewMessage(text)}
          multiline={true}
          style={styles.textInput}
          />
          <Button title="Save" onPress={() => save()} />
        </View>
        <Button title="LogOut" onPress={() => logOut()} />
      </SafeAreaView>
    );
  } else {
    return <Login setLogged={setLogged} setEmailAdress={setEmailAdress}/>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  },form:{
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    padding: 10,
  },
  textInput: {
    flex: 1,
    maxHeight: 100,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },
  scrollView:{
    width: '100%',
  },
  message:{
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  messageInfo:{
    fontSize: 12
  },
});
