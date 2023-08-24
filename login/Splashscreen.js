import { Text, Image, StyleSheet } from 'react-native';
import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import vetlensLogo from '../assets/icons/png/vetlens-logo.png'

export const Splashscreen = ({ navigation }) => {
    
    return (
        <SafeAreaView style={styles.container}>
            <Image source={vetlensLogo} style={{marginTop:150, height: 200, width: 200}}/>
            <Text style={styles.text}>VetLens</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'PoppinsRegular',
        color: "#00A6B0",
        fontSize: 48,
        marginTop: 200
    }
})