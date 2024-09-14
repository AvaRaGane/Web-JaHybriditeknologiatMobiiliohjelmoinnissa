import { StyleSheet, View } from "react-native"
import { Text } from "react-native-paper"

export default function SecondScreen() {
    
    return(
        <View styles={styles.constainer}>
            <Text>SecondScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})