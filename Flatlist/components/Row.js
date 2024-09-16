import { Pressable, StyleSheet, Text } from "react-native"
import React from 'react'

export default function Row({item, selectedId, select}) {
    const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#fff'

    return (
        <Pressable style={[styles.row,,{backgroundColor}]} onPress={() => select(item.id)}>
            <Text style={styles.rowText}>{item.name}</Text>
            {
                item.id === selectedId && <Ionicons name='trash' size={24} />
            }
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