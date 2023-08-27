import { View, TextInput, StyleSheet, Text } from "react-native";
import React from "react";

export const InputVetlens = ({placeholder, onChange, value, passwrd, isValid, errorMessage, style, multiline, keyboardType, maxLength }) => {
    const color = isValid ? "#00A6B0" : "#FF6D6D";

    const styles = StyleSheet.create(
        {
            input: {
                backgroundColor: "#F1F0F0",
                borderRadius:10,
                borderColor: color,
                borderWidth:2,
                fontFamily: 'PoppinsRegular',
                fontSize:14,
                padding:15,
                textAlign:"left"
              },
              container: {
                alignItems: 'stretch',
                justifyContent: 'center'
              },
              error: {
                color:"#FF6D6D", 
                fontFamily: 'PoppinsSemiBold',
                marginLeft: 10,
                fontSize: 14
              }
        }
    )
        return(
            <View style = {styles.container}>
                <TextInput
                    style={[styles.input, style]}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeholder}
                    secureTextEntry={passwrd}
                    multiline={multiline}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    placeholderTextColor={"#AAAAAA"}
                />
                {!isValid && <Text style={styles.error}>{errorMessage}</Text>}
            </View>

        );
}