import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, View } from "react-native"
import { Button, Icon, Text } from "react-native-paper";

export default function CustomAppBar() {
    return (
        <View style={styles.container}>
            <Text>Navigation Bar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:24,
        padding: 16,
    }
})