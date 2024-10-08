import { Pressable, StyleSheet, Text } from "react-native"
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Row({item, selectedId, select,data,setData}) {
    const backgroundColor = item.id === selectedId ? '#f0f0f0' : '#fff'

    const remove = () => {
        const arrayWithoutRemoved = data.filter((item) => item.id !== selectedId)
        setData(arrayWithoutRemoved)
        select(null)
    }

    return (
        <Pressable style={[styles.row,,{backgroundColor}]} 
        onPress = {() => select(item.id)}>
            <Text style = {[styles.row, {backgroundColor}]}>{item.name}</Text>
            {
                item.id === selectedId && <Ionicons name='trash' size={16} onPress={() => remove()}/>
            }
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