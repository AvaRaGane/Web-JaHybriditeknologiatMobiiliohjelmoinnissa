import { Pressable, StyleSheet, Text } from "react-native"
import React from 'react'

export default function Row({item, selectedId, select}) {
    const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#fff'

    return (
        <Pressable onPress={() => select(item.id)}>
            <Text style={[styles.row, {backgroundColor}]}>{item.name}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rowText: {
        fontSize: 16,
        padding: 4,
        margin: 4,
    }
})