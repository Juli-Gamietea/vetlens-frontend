import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, Alert } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { callBackendAPI } from "../../utils/CommonFunctions";

export const TermsAndConditions = ({ route, navigation }) => {

    const { firstname, lastname, email, username, type, password, license } = route.params;

    const register = async () => {
        try {
            let body;
            if (type === 'vet'){
                body = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    email: email,
                    password: password,
                    role: "VET",
                    license_number: license
                } 
            } else {
                body = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    email: email,
                    password: password,
                    role: "DEFAULT"
                } 
            }
            const res = await callBackendAPI("/auth/register", "POST", body)

            if (res.status !== 200) {
                Alert.alert("Error", "Se ha producido un error.");
            } else {
                navigation.navigate("RegisterSuccess", { type: type })
            }
        } catch (error) {
            Alert.alert("Error", "Se ha producido un error.")
        }
    }

    const goHome = async () => {
        navigation.navigate("Login")
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>Términos y condiciones</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formContainerItem}>
                    <Text style={styles.termsText}> 
                    Terminos y condiciones de la app erminos y condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y 
                    condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y condiciones
                     de la apperminos y condiciones de la app pp erminos y condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y 
                    condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y condiciones
                     de la apperminos y condiciones de la apppp erminos y condiciones de la apperminos y condiciones de la apperminos y condiciones de la apperminos y 
                    condiciones de la apperminos y condiciones
                    </Text>
                </View>
                <View style={styles.formContainerItem2}>
                    <ButtonVetLens callback={register} text={"Aceptar"} filled={true} />
                </View>

                <View style={styles.formContainerItem3}>
                    <ButtonVetLens callback={goHome} text={"Rechazar"} filled={false} />
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
            alignItems: 'center',
            backgroundColor: '#E3F5FF'
        },
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 10
        },
        formContainerItem3: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10
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
        },
        termsText: {
            fontSize: 16,
            fontFamily: 'PoppinsBold',
            marginTop: 20,
            textAlign: 'center',
        }

    }
)