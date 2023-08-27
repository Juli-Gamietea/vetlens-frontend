import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, StyleSheet } from 'react-native';
import { callBackendAPI } from "../../utils/CommonFunctions";
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';

export const Dashboard = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    React.useEffect(()=> {

        const test = async () => {
            const username = await SecureStore.getItemAsync('username');
            console.log(username);
            const role = await SecureStore.getItemAsync('role');
            console.log(role);
        }
        test();
    }, [])

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Hola</Text>
            <Text>Chau</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})