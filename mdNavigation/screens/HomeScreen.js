import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function HomeScreen(second) {
    
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})