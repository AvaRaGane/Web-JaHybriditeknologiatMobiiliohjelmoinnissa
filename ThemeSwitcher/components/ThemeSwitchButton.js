import React from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'react-native-paper'
import { useTheme } from '../context/useTheme'
import Styles from '../Styles'

export default function ThemeSwitchButton() {
    const {isDarkMode,toggleDarkMode} = useTheme()

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={isDarkMode ? Styles.dark : Styles.light}>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
    )   
}
