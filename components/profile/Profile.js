import React from "react";
import { profileReducer, initialState } from "./profileReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

export const Profile = ( { route, navigation } ) => {

    React.useEffect(() => {
        const getData = async() => {
            const data = await SecureStore.getItemAsync('user');
            const userSaved = JSON.parse(data)
            profileDispatch({type: "fieldUpdate", field: "firstname", value: userSaved.first_name})
            profileDispatch({type: "fieldUpdate", field: "lastname", value: userSaved.last_name})
            profileDispatch({type: "fieldUpdate", field: "email", value: userSaved.email})
            profileDispatch({type: "fieldUpdate", field: "username", value: userSaved.username})
        }
        getData();
    }, [])

    const [profileState, profileDispatch] = React.useReducer(profileReducer, initialState);
    const { firstname, lastname, email, username,
            isFirstnameValid, isLastnameValid, isEmailValid, isUsernameValid,
            firstnameErrorMessage, lastnameErrorMessage, emailErrorMessage, usernameErrorMessage
        } = profileState;

    const areInputsValid = async() => {

        if (firstname === "")
            profileDispatch({ type: "firstnameError", error: "No puede dejar este campo vacío" });
        if (lastname === "")
            profileDispatch({ type: "lastnameError", error: "No puede dejar este campo vacío" });
        if (email === "")
            profileDispatch({ type: "emailError", error: "No puede dejar este campo vacío" });
        if (username === "")
            profileDispatch({ type: "usernameError", error: "No puede dejar este campo vacío" });
        if (!validateEmail(email))
            profileDispatch({ type: "emailSyntaxError", error: "Ingrese un email válido"});

        if (firstname !== "" && lastname !== "" && validateEmail(email) && username !== "") {
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

    const nextScreen = async () => {
        const inputs = await areInputsValid();
        if (inputs) {
            console.log("OK")
        }
    }
    
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <Text style={styles.title}>Perfil</Text>

                <View style={styles.formContainer}>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Nombre y apellido </Text>
                        <InputVetlens
                            placeholder='Nombre'
                            onChange={(text) => profileDispatch({
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
                            onChange={(text) => profileDispatch({
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
                            onChange={(text) => profileDispatch({
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
                            onChange={(text) => profileDispatch({
                                type: "fieldUpdate",
                                field: "username",
                                value: text
                            })}
                            value={username}
                            isValid={isUsernameValid}
                            errorMessage={usernameErrorMessage}
                            editable={false}
                        />
                    </View>
                    <View style={styles.formContainerItem2}>
                        <ButtonVetLens  callback={nextScreen} text={"Cambiar contraseña"} filled={false} />
                        <ButtonVetLens style={{marginTop: 15}}callback={nextScreen} text={"Actualizar"} filled={true} />
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
            justifyContent: 'space-around',
            marginTop: 35
        },
        title: {
            fontSize: 48,
            fontFamily: 'PoppinsRegular',
            color: '#00A6B0',
            marginTop: 30,
            marginBottom: 50,
            textAlign: 'center',
        }

    }
)