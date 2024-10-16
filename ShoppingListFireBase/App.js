import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { firestore, collection, query, addDoc, onSnapshot, orderBy, MESSAGES, serverTimestamp, doc, deleteDoc } from './firebase/Config';
import react, { useState, useEffect } from 'react';


export default function App() {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [visibleDeleteIcon, setVisibleDeleteIcon] = useState(null);

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp(),
    }).catch(error => console.log(error));
    setNewMessage('');
  }
  
  const deleteItem = async (id) => {
    await deleteDoc(doc(firestore, MESSAGES, id));
  }

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'asc'));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const tempMessages = [];
      QuerySnapshot.forEach((doc) => {
        tempMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(tempMessages);
    });
    return () => {
      unsubscribe();
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Shopping List</Text>
      <ScrollView style={styles.scrollView}>
        {
          messages.map((message) => (
            <View key={message.id} style={styles.message}>
              <TouchableOpacity   onPress={() => setVisibleDeleteIcon(message.id === visibleDeleteIcon ? null : message.id)}
              >
                <Text>{message.text}</Text>
              </TouchableOpacity>
              {visibleDeleteIcon === message.id && (
          <TouchableOpacity onPress={() => deleteItem(message.id)}>
            <Image 
              source={require('./img/litter.png')}
              style={styles.trashIcon}
              />
              </TouchableOpacity>
            )}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 40,
  }, header:{
    fontSize: 24
  }, form: {
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
  scrollView: {
    width: '100%',
  },
  message: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  messageInfo: {
    fontSize: 12
  },
  trashIcon: {
    height: 30,
    width: 22,
  },
});
