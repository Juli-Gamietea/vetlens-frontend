import React from "react";
import { registerReducer, initialState } from "./registerReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { SafeAreaView } from "react-native-safe-area-context";

export const RegisterFormVet = ({ route, navigation }) => {

    const [licenseNmbr, setLicenseNmbr] = React.useState("");
    const [licenseNmbrError, setLicenseNmbrError] = React.useState({
        hasError: false,
        message: ""
    });
    const [licenseSchool, setLicenseSchool] = React.useState("");
    const [licenseSchoolError, setLicenseSchoolError] = React.useState({
        hasError: false,
        message: ""
    });

    const areInputsValid = () => {

        const error = {
            hasError: true,
            message: "No puede dejar este campo vacío"
        }

        if (licenseNmbr === "") {
            setLicenseNmbrError(error)
        }

        if (licenseSchool === "") {
            setLicenseSchoolError(error)
        }

        return licenseSchool !== "" && licenseNmbr !== "";

    }

    const { firstname, lastname, email, username, type, password } = route.params;

    const nextScreen = async () => {
        if (areInputsValid()) {
            navigation.navigate("TermsAndConditions", {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                type: type,
                password: password,
                license: `${licenseNmbr}-${licenseSchool}`
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
                        <Text style={styles.inputTitle}> N° Matrícula </Text>
                        <InputVetlens
                            placeholder='N° Matrícula'
                            onChange={(text) => {
                                setLicenseNmbrError({
                                    hasError: false,
                                    message: "",
                                })
                                setLicenseNmbr(text)
                            }}
                            value={licenseNmbr}
                            isValid={!licenseNmbrError.hasError}
                            errorMessage={licenseNmbrError.message}
                        />
                    </View>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}>Colegio de matriculación</Text>
                        <InputVetlens
                            placeholder='Colegio de matriculación'
                            onChange={(text) => {
                                setLicenseSchoolError({
                                    hasError: false,
                                    message: ""
                                })
                                setLicenseSchool(text)
                            }}
                            value={licenseSchool}
                            isValid={!licenseSchoolError.hasError}
                            errorMessage={licenseSchoolError.message}
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
            justifyContent: 'center',
            marginTop: 55,
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