import React from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import dog from '../../assets/icons/png/dog-smile.png';
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterSuccess = ({ route, navigation }) => {

    const goHome = async () => {
        navigation.navigate("Login")
    }

    const { type } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={dog} style={styles.logo} />
                <Text style={styles.logoText}>¡Muchas gracias por {"\n"}registrarte! </Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.formContainerItem}>
                    <Text style={type === 'vet' ? (styles.text) : (styles.textInvisible)}>
                        En los siguientes días estaremos{"\n"}
                        verificando que tus datos sean correctos.{"\n"}
                        Una vez finalizado el proceso de{"\n"}
                        validación, recibirás una notificación{"\n"}
                        en el correo con el que te registraste.
                    </Text>
                </View>
                <View style={styles.formContainerItem2}>
                    <ButtonVetLens callback={goHome} text={"Finalizar"} filled={true} />
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
            marginTop: 40,
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