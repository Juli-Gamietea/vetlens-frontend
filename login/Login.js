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
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>VetLens</Text>
            </View>
            <View style={styles.formContainer}>
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
                    />
                </View>

                <View style={styles.formContainerItem}>
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
                        passwrd
                    />
                </View >


                <View style={styles.formContainerItem2}>
                    {!isLoading && <ButtonVetLens text={"Iniciar Sesión"} filled={true} />}
                    {isLoading &&
                        <TouchableOpacity style={styles.spinner}>
                            <ActivityIndicator color={"#553900"} />
                        </TouchableOpacity>}
                </View>
                <Link to={{ screen: 'Bobo' }} style={styles.link}>¿Olvidaste tu contraseña?</Link>
                <View style={styles.formContainerItem3}>
                    <ButtonVetLens text={"Crear una cuenta"} filled={false} style={styles.createAccountStyle} />
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
        }
        ,
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
            marginVertical: 5
        }
        ,
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 20
        },

        formContainerItem3: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginTop: 100,
        },

        link: {
            flex: 1,
            fontFamily: 'PoppinsSemiBold',
            color: '#000',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 8

        },
        spinner: {
            elevation: 8,
            backgroundColor: "#F3A200",
            borderRadius: 15,
            padding: 15
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 150,
            marginBottom: 150
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