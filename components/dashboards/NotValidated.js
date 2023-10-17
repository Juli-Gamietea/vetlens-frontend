import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import dog from '../../assets/icons/png/dog-smile.png';
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../utils/auth/AuthContext";

export const NotValidated = () => {

    const {setIsSignedIn} = React.useContext(AuthContext);

    const logOut = async () => {
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
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={dog} style={styles.logo} />
                <Text style={styles.logoText}> Registro pendiente de validación </Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formContainerItem}>
                    <Text style={styles.text}>
                        ¡Aún el equipo de VetLens esta validando su información, le 
                        notificaremos por e-mail cuando pueda disfrutar de la 
                        aplicación.
                        Disculpe las molestias!
                    </Text>
                </View>
                <View style={styles.formContainerItem2}>
                    <ButtonVetLens callback={logOut} text={"Entendido"} filled={true} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#fff',
            flexDirection: 'column',
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
        inputTitle: {
            fontFamily: "PoppinsBold",
            fontSize: 15,
            paddingBottom: 4,
            paddingLeft: 8,
            color: '#00767D'
        },
        formContainer: {
            flex: 2,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        formContainerItem: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        formContainerItem2: {
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 200,
            marginBottom: 10
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 100,
            marginBottom: 80,
        },
        logoText: {
            fontSize: 30,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            marginTop: 20,
            textAlign: 'center',
            marginTop: 50
        },
        logo: {
            width: 240,
            height: 240
        },
        text: {
            fontSize: 20,
            fontFamily: 'PoppinsBold',
            textAlign: 'center',
            color: '#005D63'
        },
        textInvisible: {
            fontSize: 20,
            fontFamily: 'PoppinsBold',
            textAlign: 'center',
            color: '#FFFFFF'
        }

    }
)