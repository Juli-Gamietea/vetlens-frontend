import React from "react";
import { loginReducer, initialState } from "./loginReducer";
import { InputVetlens } from "../common/components/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/components/ButtonVetLens";
import vetlensLogo from '../assets/icons/png/vetlens-logo.png';
import { Link } from '@react-navigation/native';

export const Login = ({ navigation }) => {

    const [loginState, loginDispatch] = React.useReducer(loginReducer, initialState);
    const { username, password, isUsernameValid, isPasswordValid, userErrorMessage, passwordErrorMessage } = loginState;
    const [isLoading, setIsLoading] = React.useState(false);

    const areInputsValid = () => {
        if (username === "")
            loginDispatch({ type: "usernameError", error: "No puede dejar este campo vacío" });
        if (password === "")
            loginDispatch({ type: "passwordError", error: "No puede dejar este campo vacío" });
        if (username !== "" && password !== "") {
            return true;
        } else {
            return false;
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.mainScrollview}>
            <View style={styles.mainContainer}>
                <View style={styles.logoContainer}>
                    <Image source={vetlensLogo} style={styles.logo} />
                    <Text style={styles.logoText}>VetLens</Text>
                </View>
                <View style={styles.formContainerItem}>
                    <InputVetlens
                        placeholder='Nombre de usuario'
                        onChange={(text) => loginDispatch({
                            type: "fieldUpdate",
                            field: "username",
                            value: text
                        })}
                        value={username}
                        isValid={isUsernameValid}
                        errorMessage={userErrorMessage}
                        style={styles.inputStyle}
                    />
                    <InputVetlens
                        placeholder='Contraseña'
                        onChange={(text) => loginDispatch({
                            type: "fieldUpdate",
                            field: "password",
                            value: text
                        })}
                        value={password}
                        isValid={isPasswordValid}
                        errorMessage={passwordErrorMessage}
                        passwrd={true}
                        style={styles.inputStyle}
                    />
                    <ButtonVetLens text={"Iniciar Sesión"} filled={true} />
                    <Link to={{ screen: 'Home' }} style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Link>
                </View>
                <ButtonVetLens text={"Crear una cuenta"} filled={false} style={styles.createAccountStyle} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        mainScrollview: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
            justifyContent: 'center'
        },
        mainContainer: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            justifyContent: 'space-around'
        },
        formContainerItem: {
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: 40,
            backgroundColor: "#fff"
        },
        inputStyle: {
            marginBottom: 15
        },
        forgotPassword: {
            fontFamily: 'PoppinsSemiBold',
            textAlign: 'center',
            marginTop: 20,
            fontSize: 15
        },
        createAccountStyle: {
            marginLeft: 15,
            marginRight: 15
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 150,
            marginBottom: 40
        },
        logoText: {
            fontSize: 58,
            fontFamily: 'PoppinsRegular',
            color: '#00A6B0'
        },
        logo: {
            width: 100,
            height: 100
        }

    }
)