import { StyleSheet, TextInput, View } from "react-native";

export default function Search({criteria, setCriteria}) {

    return(
        <View style={styles.searchBox}>
            <TextInput
            value={criteria}
            onChangeText={text => setCriteria(text)}
            placeholder='Search...'
            returnKeyType="search"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBox: {    
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16
    },
});