import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

export default function Row({item, selectedId, select, data, setData}) {
    const done = () => {
        
    }

    return (
        <Pressable 
        onPress = {() => done(item.id)}>
            <Text style = {[styles.row]}>{item.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 24,
        padding: 4,
        margin: 4,
    }
})