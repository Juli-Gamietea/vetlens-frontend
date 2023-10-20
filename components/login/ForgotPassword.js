import React from "react";
import { loginReducer, initialState } from "./loginReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { callBackendAPI } from "../../utils/CommonFunctions";

export const ForgotPassword = ({ navigation }) => {
    
    const [loginState, loginDispatch] = React.useReducer(loginReducer, initialState);
    const { username, isUsernameValid, userErrorMessage } = loginState;

    const areInputsValid = async () => {
        const available =  await checkUsernameAvailability();
        if (username === "")
            loginDispatch({ type: "usernameError", error: "No puede dejar este campo vacío" });
        if (available && username !== "")
            loginDispatch({ type: "usernameError", error: "El usuario no está registrado"});
        if (username !== "") {
            return true;
        } else {
            return false;
        }
    }

    const checkUsernameAvailability = async () => {
        if (username === "") {
            return false;
        } else {
            const res = await callBackendAPI(`/auth/available/${username}`)
            return res.data;
        }
        
    }
    const sendEmail = async () => {
        if (await areInputsValid()) {
            try {
                await callBackendAPI(`/auth/password/restore/${username}`, "PUT")
                navigation.navigate("Login")
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>VetLens</Text>
            </View>
            <View style={styles.formContainer}>
                <Text style={styles.text}>Ingrese su nombre de usuario, en caso de ser
                válido un mail se enviará a la casilla con la que
                se registró. Gracias!</Text>
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

                <View style={styles.formContainerItem3}>
                    <ButtonVetLens callback={sendEmail} text={"Recuperar contraseña"} filled={true} style={styles.createAccountStyle} />
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
            fontFamily: "PoppinsRegular",
            fontSize: 18,
            paddingBottom: 10,
            textAlign: 'center'
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
            justifyContent: 'flex-start'
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
            backgroundColor: "#00A6B0",
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