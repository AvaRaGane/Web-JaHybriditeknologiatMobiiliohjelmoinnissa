import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, { useState } from 'react'

export default function Add({add}) {
    const [name, setName] = useState('')

    const save = () => {
        add(name)

        setName('')
    }

    return(
        <View style={styles.container}>
            <TextInput style={styles.form} value={name} onChangeText={text => setName(text)} placeholder="Item name..."
            />
            <Button title="SAVE" onPress={() => save(name)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16
    },
})