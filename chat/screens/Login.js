import { useState } from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet, View, Text } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({setLogged, setEmailAdress}) {
    const [userName, setUserName] = useState('avaragane@gmail.com');
    const [password, setPassword] = useState('123456');

    const login = () => {
        console.log('Login pressed');
        const auth = getAuth()

        signInWithEmailAndPassword(auth, userName, password)
            .then((userCredientals) => {
                console.log('UserCredientals.user.email:')
                console.log(userCredientals.user.email)
                setLogged(true)
                setEmailAdress(userCredientals.user.email)
            }).catch((error) => {
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                    console.log('Invalid credentials')
                } else if (error.code === 'auth(too-many-requests') {
                    console.log('Too many attempts to login')
                } else {
                    console.log('Else error:')
                    console.log(error.code, error.message)
                }
            })

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.header}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Type email here'
                    value={userName}
                    onChangeText={text => setUserName(text)}
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.input}
                    placeholder='Type password here'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                    textContentType='password'
                />
                <Button title="Login" onPress={() => login()} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    header: {
        fontSize: 32
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
});
