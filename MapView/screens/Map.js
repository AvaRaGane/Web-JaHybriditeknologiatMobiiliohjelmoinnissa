import { Text, StyleSheet, View, SafeAreaView, Platform } from 'react-native'
import React, { Component, useEffect, useState } from 'react'
import MapView from 'react-native-maps'
import Constants from 'expo-constants'
import * as Location from 'expo-location'

export default function Map(props) {
    return (
        <MapView
        style={styles.map}
        region={props.location}
        mapType='satellite'
        />
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})