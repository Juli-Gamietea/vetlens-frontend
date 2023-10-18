import React from "react";
import { profileReducer, initialState } from "./profileReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, ScrollView, Alert } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { SafeAreaView } from "react-native-safe-area-context";
import { callBackendAPI } from "../../utils/CommonFunctions";

export const ChangePassword = ({ route, navigation }) => {
    const { username } = route.params;
    const [profileState, profileDispatch] = React.useReducer(profileReducer, initialState);
    const { password, newPassword,
            isPasswordValid, isNewPasswordValid,
            passwordErrorMessage, newPasswordErrorMessage
        } = profileState;

    const areInputsValid = () => {
        if (password === "")
            profileDispatch({ type: "passwordError", error: "No puede dejar este campo vacío" });
        if (newPassword === "")
            profileDispatch({ type: "newPasswordError", error: "No puede dejar este campo vacío" });
        if (password !== "" && newPassword !== "") {
            return true;
        } else {
            return false;
        }
    }

    const changePassword = async () => {
        if (areInputsValid()) {
            try {
                await callBackendAPI(`/users/password/${username}/${password}/${newPassword}`, "PUT")
                Alert.alert("Éxito", "Se ha actualizado la contraseña.");
                navigation.navigate("Profile");
            } catch (error) {
                Alert.alert("Error", "Se ha producido un error. Intente nuevamente.");
            }
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.formContainer}>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Contraseña actual </Text>
                        <InputVetlens
                            placeholder='Contraseña actual'
                            onChange={(text) => profileDispatch({
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

                    <View style={styles.formContainerItemWithTopMargin}>
                        <Text style={styles.inputTitle}> Nueva contraseña </Text>
                        <InputVetlens
                            placeholder='Nueva contraseña'
                            onChange={(text) => profileDispatch({
                                type: "fieldUpdate",
                                field: "newPassword",
                                value: text
                            })}
                            value={newPassword}
                            isValid={isNewPasswordValid}
                            errorMessage={newPasswordErrorMessage}
                            passwrd
                        />
                    </View >
                    <View style={styles.formContainerItem2}>
                        <ButtonVetLens callback={changePassword} text={"Actualizar"} filled={true} />
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
        formContainerItemWithTopMargin: {
            flex: 2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 7,
            marginTop: 40
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
        title: {
            fontSize: 48,
            fontFamily: 'PoppinsRegular',
            color: '#00A6B0',
            marginTop: 30,
            marginBottom: 50,
            textAlign: 'center',
        },
        logo: {
            width: 120,
            height: 120
        }

    }
)