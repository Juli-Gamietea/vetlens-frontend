import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, StyleSheet } from 'react-native';

export const DashboardVet = () => {
    const insets = useSafeAreaInsets();

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