import React from "react";
import { profileReducer, initialState } from "./profileReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { callBackendAPI } from "../../utils/CommonFunctions";
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from "../../utils/auth/AuthContext";

export const Profile = ({ navigation }) => {

    const { setIsSignedIn } = React.useContext(AuthContext);
    const [changesMade, setChangesMade] = React.useState(false);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        const getData = async () => {
            const data = await SecureStore.getItemAsync('user');
            const userSaved = JSON.parse(data)
            profileDispatch({ type: "fieldUpdate", field: "firstname", value: userSaved.first_name })
            profileDispatch({ type: "fieldUpdate", field: "lastname", value: userSaved.last_name })
            profileDispatch({ type: "fieldUpdate", field: "email", value: userSaved.email })
            profileDispatch({ type: "fieldUpdate", field: "username", value: userSaved.username })
        }
        getData();
        setChangesMade(false);
    }, [isFocused])

    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => logout()} style={{ backgroundColor: 'red', paddingHorizontal: 10, borderRadius: 50 }}>
                <Text style={{ fontFamily: "PoppinsBold", fontSize: 15, color: "#fff" }}>Cerrar Sesión</Text>
            </TouchableOpacity>
        )
    })

    const [profileState, profileDispatch] = React.useReducer(profileReducer, initialState);
    const { firstname, lastname, email, username,
        isFirstnameValid, isLastnameValid, isEmailValid, isUsernameValid,
        firstnameErrorMessage, lastnameErrorMessage, emailErrorMessage, usernameErrorMessage
    } = profileState;

    const areInputsValid = async () => {

        if (firstname === "")
            profileDispatch({ type: "firstnameError", error: "No puede dejar este campo vacío" });
        if (lastname === "")
            profileDispatch({ type: "lastnameError", error: "No puede dejar este campo vacío" });
        if (email === "")
            profileDispatch({ type: "emailError", error: "No puede dejar este campo vacío" });
        if (username === "")
            profileDispatch({ type: "usernameError", error: "No puede dejar este campo vacío" });
        if (!validateEmail(email))
            profileDispatch({ type: "emailSyntaxError", error: "Ingrese un email válido" });

        if (firstname !== "" && lastname !== "" && validateEmail(email) && username !== "") {
            return true;
        } else {
            return false;
        }
    }

    const validateEmail = (emailToTest) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (emailRegex.test(emailToTest)) {
            return true;
        } else {
            return false;
        }
    }

    const changePassword = async () => {
        const inputs = await areInputsValid();
        if (inputs) {
            navigation.navigate("ChangePassword", { username: username });
        }
    }

    const updateProfile = async () => {
        const inputs = await areInputsValid();
        if (inputs) {
            try {
                const body = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    email: email
                }
                await callBackendAPI("/users", "PUT", body)
                Alert.alert("Éxito", "Se ha actualizado el perfil.");
            } catch (error) {
                Alert.alert("Error", "Se ha producido un error.");
            }
        }
    }

    const logout = async () => {
        await deleteStoredData();
        setIsSignedIn(false);
    }

    const deleteStoredData = async () => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');
        await SecureStore.deleteItemAsync('user');
        await SecureStore.deleteItemAsync('username');
        await SecureStore.deleteItemAsync('role');
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>


                <View style={styles.formContainer}>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Nombre y apellido </Text>
                        <InputVetlens
                            placeholder='Nombre'
                            onChange={(text) => {
                                setChangesMade(true);
                                profileDispatch({
                                    type: "fieldUpdate",
                                    field: "firstname",
                                    value: text
                                })
                            }}
                            value={firstname}
                            isValid={isFirstnameValid}
                            errorMessage={firstnameErrorMessage}
                        />
                    </View>

                    <View style={styles.formContainerItem}>
                        <InputVetlens
                            placeholder='Apellido'
                            onChange={(text) => {
                                setChangesMade(true);
                                profileDispatch({
                                    type: "fieldUpdate",
                                    field: "lastname",
                                    value: text
                                })
                            }}
                            value={lastname}
                            isValid={isLastnameValid}
                            errorMessage={lastnameErrorMessage}
                        />
                    </View >
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Correo electrónico </Text>
                        <InputVetlens
                            placeholder='Correo electrónico'
                            onChange={(text) => {
                                setChangesMade(true);
                                profileDispatch({
                                    type: "fieldUpdate",
                                    field: "email",
                                    value: text
                                })
                            }}
                            value={email}
                            isValid={isEmailValid}
                            errorMessage={emailErrorMessage}
                        />
                    </View>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Nombre de usuario </Text>
                        <InputVetlens
                            placeholder='Nombre de usuario'
                            onChange={(text) => {
                                setChangesMade(true);
                                profileDispatch({
                                    type: "fieldUpdate",
                                    field: "username",
                                    value: text
                                })
                            }}
                            value={username}
                            isValid={isUsernameValid}
                            errorMessage={usernameErrorMessage}
                            editable={false}
                        />
                    </View>
                    <View style={styles.formContainerItem2}>
                        <ButtonVetLens callback={updateProfile} text={"Actualizar"} filled={true} disabled={!changesMade} />
                        <ButtonVetLens style={{ marginTop: 15 }} callback={changePassword} text={"Cambiar contraseña"} filled={false} />
                        <ButtonVetLens style={{ marginTop: 20 }} callback={() => navigation.navigate("MySubscriptions")} text={"Mis Suscripciones"} />
                        <ButtonVetLens style={{ marginTop: 20 }} callback={() => navigation.navigate("ViewTermsAndConditions")} text={"Ver Términos y Condiciones"} />
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
        inputTitle: {
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