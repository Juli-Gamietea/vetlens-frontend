import React from "react";
import { registerReducer, initialState } from "./registerReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterForm = ( { route, navigation } ) => {

    const [registerState, registerDispatch] = React.useReducer(registerReducer, initialState);
    const { firstname, lastname, email, username,
            isFirstnameValid, isLastnameValid, isEmailValid, isUsernameValid,
            firstnameErrorMessage, lastnameErrorMessage, emailErrorMessage, usernameErrorMessage
        } = registerState;

    const {type} = route.params;
    
    const areInputsValid = async() => {
        
        const available =  await checkUsernameAvailability();

        if (firstname === "")
            registerDispatch({ type: "firstnameError", error: "No puede dejar este campo vacío" });
        if (lastname === "")
            registerDispatch({ type: "lastnameError", error: "No puede dejar este campo vacío" });
        if (email === "")
            registerDispatch({ type: "emailError", error: "No puede dejar este campo vacío" });
        if (username === "")
            registerDispatch({ type: "usernameError", error: "No puede dejar este campo vacío" });
        if (!validateEmail(email))
            registerDispatch({ type: "emailSyntaxError", error: "Ingrese un email válido"});
         if (!available && username !== "")
             registerDispatch({ type: "usernameError", error: "El nombre de usuario esta en uso"});

        if (firstname !== "" && lastname !== "" && validateEmail(email) && username !== "" && available) {
            return true;
        } else {
            return false;
        }
    }

    const validateEmail = (emailToTest) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if(emailRegex.test(emailToTest)){
            return true;
        }else{
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

    const nextScreen = async () => {
        const inputs = await areInputsValid();
        if (inputs) {
            navigation.navigate('RegisterFormPassword', {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                type: type
            })
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
                        <Text style={styles.inputTitle}> Nombre y apellido </Text>
                        <InputVetlens
                            placeholder='Nombre'
                            onChange={(text) => registerDispatch({
                                type: "fieldUpdate",
                                field: "firstname",
                                value: text
                            })}
                            value={firstname}
                            isValid={isFirstnameValid}
                            errorMessage={firstnameErrorMessage}
                        />
                    </View>

                    <View style={styles.formContainerItem}>
                        <InputVetlens
                            placeholder='Apellido'
                            onChange={(text) => registerDispatch({
                                type: "fieldUpdate",
                                field: "lastname",
                                value: text
                            })}
                            value={lastname}
                            isValid={isLastnameValid}
                            errorMessage={lastnameErrorMessage}
                        />
                    </View >
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Correo electrónico </Text>
                        <InputVetlens
                            placeholder='Correo electrónico'
                            onChange={(text) => registerDispatch({
                                type: "fieldUpdate",
                                field: "email",
                                value: text
                            })}
                            value={email}
                            isValid={isEmailValid}
                            errorMessage={emailErrorMessage}
                        />
                    </View>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Nombre de usuario </Text>
                        <InputVetlens
                            placeholder='Nombre de usuario'
                            onChange={(text) => registerDispatch({
                                type: "fieldUpdate",
                                field: "username",
                                value: text
                            })}
                            value={username}
                            isValid={isUsernameValid}
                            errorMessage={usernameErrorMessage}
                        />
                    </View>

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
            marginBottom: 40
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
            marginTop: 35,
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