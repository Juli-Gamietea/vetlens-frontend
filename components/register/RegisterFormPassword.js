import React from "react";
import { registerReducer, initialState } from "./registerReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterFormPassword = ({ route, navigation }) => {

    const [registerState, registerDispatch] = React.useReducer(registerReducer, initialState);
    const { password, rePassword,
            isPasswordValid, isRePasswordValid,
            passwordErrorMessage, rePasswordErrorMessage
        } = registerState;

    const areInputsValid = () => {
        if (password === "")
            registerDispatch({ type: "passwordError", error: "No puede dejar este campo vacío" });
        if (rePassword === "")
            registerDispatch({ type: "rePasswordError", error: "No puede dejar este campo vacío" });
        if (password !== rePassword)
            registerDispatch({ type: "passwordNotEqualError", error: "Las contraseñas deben coincidir" });
        if (password !== "" && rePassword !== "" && (password === rePassword)) {
            return true;
        } else {
            return false;
        }
    }

    const { firstname, lastname, email, username, type } = route.params;

    const nextScreen = async () => {
        console.log(type)
        if (areInputsValid()) {
            if (type === "vet") {
                navigation.navigate("RegisterFormVet", {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    type: type,
                    password: password
                } )
            } 
            else if (type === "student") {
                navigation.navigate("RegisterFormStudent", {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    type: type,
                    password: password
                } )
            }
            else {
                navigation.navigate("TermsAndConditions", {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    username: username,
                    type: type,
                    password: password
                })
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>

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
                            passwrd
                        />
                    </View>

                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Confirmar Contraseña </Text>
                        <InputVetlens
                            placeholder='Reingresar contraseña'
                            onChange={(text) => registerDispatch({
                                type: "fieldUpdate",
                                field: "rePassword",
                                value: text
                            })}
                            value={rePassword}
                            isValid={isRePasswordValid}
                            errorMessage={rePasswordErrorMessage}
                            passwrd
                        />
                    </View >
                    <View style={styles.formContainerItem2}>
                        <ButtonVetLens callback={nextScreen} text={"Continuar"} filled={true} />
                    </View>

                </View>
            </SafeAreaView>
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
        },
        text: {
            fontFamily: "PoppinsSemiBold",
            fontSize: 36,
            paddingBottom: 10,
        },
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
            marginBottom: 40,
            marginTop: 50
        },
        formContainerItem: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 7
        },
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 65,
            marginBottom: 40
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