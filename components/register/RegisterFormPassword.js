import React from "react";
import { registerReducer, initialState } from "../register/registerReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';


export const RegisterFormPassword = ({ navigation }) => {

    const [registerState, registerDispatch] = React.useReducer(registerReducer, initialState);
    const { password, rePassword,
            isPasswordValid, isRePasswordValid,
            passwordErrorMessage, rePasswordErrorMessage
        } = registerState;

    const [isLoading, setIsLoading] = React.useState(false);

    const areInputsValid = () => {
        if (password === "")
            registerDispatch({ type: "passwordError", error: "No puede dejar este campo vacío" });
        if (rePassword === "")
            registerDispatch({ type: "rePasswordError", error: "No puede dejar este campo vacío" });
        if (password !== "" && rePassword !== "") {
            return true;
        } else {
            return false;
        }
    }


    const register = async () => {

        if (areInputsValid()) {
        
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>Por favor, completa los {'\n'}siguientes datos</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formContainerItem}>
                    <Text style={styles.inputTitle}> Contraseña </Text>
                    <InputVetlens
                        placeholder='Contraseña'
                        onChange={(text) => registerDispatch({
                            type: "fieldUpdate",
                            field: "password",
                            value: text
                        })}
                        value={password}
                        isValid={isPasswordValid}
                        errorMessage={passwordErrorMessage}
                    />
                </View>

                <View style={styles.formContainerItem}>
                    <Text style={styles.inputTitle}> Confirmar Contraseña </Text>
                    <InputVetlens
                        placeholder='Reingresar contraseña'
                        onChange={(text) => registerDispatch({
                            type: "fieldUpdate",
                            field: "repassword",
                            value: text
                        })}
                        value={rePassword}
                        isValid={isRePasswordValid}
                        errorMessage={rePasswordErrorMessage}
                        passwrd
                    />
                </View >
                <View style={styles.formContainerItem2}>
                    {!isLoading && <ButtonVetLens callback={register} text={"Continuar"} filled={true} />}
                    {isLoading &&
                        <TouchableOpacity style={styles.spinner}>
                            <ActivityIndicator color={"#FFF"} />
                        </TouchableOpacity>}
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            marginTop: 40,
            width: 200,
            height: 200
        }
        ,
        text: {
            fontFamily: "PoppinsSemiBold",
            fontSize: 36,
            paddingBottom: 10,
        }
        ,
        textContainer: {
            flex: 1,
            marginTop: 70,
            alignItems: 'center'
        },
        inputTitle:{
            fontFamily: "PoppinsBold",
            fontSize: 15,
            paddingBottom: 4,
            paddingLeft: 8,
            color: '#00767D'
        },
        formContainer: {
            flex: 3,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 40
        }
        ,
        formContainerItem: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 7
        }
        ,
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 35,
            marginBottom: 40
        },
        spinner: {
            backgroundColor: "#00A6B0",
            borderRadius: 15,
            padding: 15
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 40,
            marginBottom: 40
        },
        logoText: {
            fontSize: 26,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            marginTop: 20,
            textAlign: 'center',
        },
        logo: {
            width: 120,
            height: 120
        }

    }
)