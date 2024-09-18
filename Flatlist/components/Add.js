import { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

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
            <Button title="Save" onPress={() => save(name)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
});