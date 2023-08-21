import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font'

export const ButtonVetLens = ({text, callback, style, filled}) => {
    

    if (filled) {
        return (
            <TouchableOpacity onPress={callback} style={[styles.containerFilled, style]}>
                <Text style={styles.buttonFilled}>{text}</Text>
            </TouchableOpacity>
        );
    }
    else {
        return (
            <TouchableOpacity onPress={callback} style={[styles.containerEmpty, style]}>
                <Text style={styles.buttonEmpty}>{text}</Text>
            </TouchableOpacity>
        );
    }

    
}

const styles = StyleSheet.create({
    containerFilled: { 
        backgroundColor: "#00A6B0",
        borderRadius: 15,
        padding: 8
    },
    containerEmpty: {
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
        borderColor: "#00A6B0",
        borderRadius: 15,
        padding: 8
    },
    buttonFilled: {
        fontSize: 20,
        fontFamily: 'PoppinsRegular',
        color: "#fff",
        alignSelf: "center"
    },
    buttonEmpty: {
        fontSize: 20,
        fontFamily: 'PoppinsRegular',
        color: "#00A6B0",
        alignSelf: "center"
    },

})
