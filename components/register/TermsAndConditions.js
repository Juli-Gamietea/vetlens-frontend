import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, Alert } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { SafeAreaView } from "react-native-safe-area-context";

export const TermsAndConditions = ({ route, navigation }) => {

    const { firstname, lastname, email, username, type, password, license, file } = route.params;
    const [isScrolledToBottom, setIsScrolledToBottom] = React.useState(false);
    const [isAcceptEnabled, setIsAcceptEnabled] = React.useState(false);

    const scrollViewRef = React.useRef(null);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        const scrollHeight = event.nativeEvent.contentSize.height;
        const screenHeight = event.nativeEvent.layoutMeasurement.height;

        const isAtBottom = scrollPosition >= scrollHeight - screenHeight - 10;

        setIsScrolledToBottom(isAtBottom);

        if (isAtBottom) {
            setIsAcceptEnabled(true);
        }
    };

    const register = async () => {
        try {
            let body;
            if (type === 'vet') {
                body = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    email: email,
                    password: password,
                    role: "VET",
                    license_number: license
                }
            } else if (type === "student") {
                body = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    email: email,
                    password: password,
                    role: "STUDENT",
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

                if (type === "student") {
                    console.log(file)
                    const data = new FormData();
                    data.append('file', {
                        uri: file.uri,
                        type: file['mimeType'],
                        name: file.name
                    });

                    console.log(JSON.stringify(data))

                    const obj = await callBackendAPI(`/auth/student/${body.username}/file`, "PUT", data, {}, 'multipart/form-data')
                    
                    if (obj.status !== 200) {
                        Alert.alert("Error", "Se ha producido un error con la seg.");
                    } else {
                        navigation.navigate("RegisterSuccess", { type: type })
                    }

                } else {
                    navigation.navigate("RegisterSuccess", { type: type })
                }

            }
        } catch (error) {
            Alert.alert("Error", "Se ha producido un error.")
        }
    }

    const goHome = async () => {
        navigation.navigate("Login")
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>Términos y condiciones</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={{ height: 400 }}>
                    <ScrollView style={styles.formContainerItem}
                        onScroll={handleScroll}
                        ref={scrollViewRef}
                        scrollEventThrottle={16}
                    >
                        <Text style={styles.termsText}>Por favor, lea detenidamente estos términos y condiciones antes de utilizar la aplicación móvil "VetLens" (en adelante, "la Aplicación"). Al acceder o utilizar la Aplicación, usted acepta estar sujeto a los siguientes términos y condiciones:</Text>
                        <Text style={styles.termsTitle}>1. Uso Responsable de la Información</Text>
                        <Text style={styles.termsText}>La Aplicación y la empresa detrás de ella (en adelante, "la Empresa") proporcionan información de carácter general sobre la salud y el cuidado de mascotas. Es importante destacar que la Aplicación no fomenta ni incita a la automedicación de su mascota. La información proporcionada en la Aplicación tiene fines meramente informativos y educativos.</Text>
                        <Text style={styles.termsTitle}>2. Limitación de Responsabilidad</Text>
                        <Text style={styles.termsText}>La Empresa no asume responsabilidad por cualquier inconveniente o daño que pueda resultar de tomar decisiones basadas únicamente en la información proporcionada por la Aplicación en lugar de consultar a un profesional veterinario. La Aplicación no sustituye la atención y el diagnóstico de un veterinario calificado.</Text>
                        <Text style={styles.termsTitle}>3. Recomendación de Consultar a un Veterinario</Text>
                        <Text style={styles.termsText}>La Aplicación no debe considerarse un reemplazo de la atención veterinaria profesional. Siempre se recomienda encarecidamente que consulte a un veterinario antes de tomar decisiones sobre la salud de su mascota basadas en la información de la Aplicación. La salud de su mascota es de suma importancia, y solo un veterinario puede proporcionar un diagnóstico y tratamiento adecuados.</Text>
                        <Text style={styles.termsTitle}>4. Aceptación de los Términos y Condiciones</Text>
                        <Text style={styles.termsText}>Al utilizar la Aplicación, usted reconoce que ha leído, comprendido y aceptado estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos, le rogamos que no utilice la Aplicación.</Text>
                        <Text style={styles.termsTitle}>5. Modificaciones de los Términos y Condiciones</Text>
                        <Text style={styles.termsText}>La Empresa se reserva el derecho de modificar estos términos y condiciones en cualquier momento y sin previo aviso. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Aplicación. Le recomendamos que revise periódicamente estos términos para estar al tanto de cualquier cambio.</Text>
                        <Text style={styles.termsTitle}>6. Ley Aplicable y Jurisdicción</Text>
                        <Text style={styles.termsText}>Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de la República Argentina. Cualquier disputa, controversia o reclamo que surja en relación con estos términos y condiciones, su interpretación, ejecución, incumplimiento o cualquier otro aspecto relacionado con la Aplicación, se resolverá de manera exclusiva ante los tribunales de la República Argentina, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponder.</Text>
                    </ScrollView>
                </View>
                <View style={styles.formContainerItem2}>
                    <ButtonVetLens callback={register} text={"Aceptar"} filled={true} disabled={!isAcceptEnabled} />
                    <ButtonVetLens callback={goHome} text={"Rechazar"} filled={false} style={{ marginTop: 8 }} />
                </View>
            </View>
        </SafeAreaView>
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
            borderRadius: 10,
            backgroundColor: '#E3F5FF',
            height: 400,
            paddingHorizontal: 20
        },
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 40,
            marginBottom: 10,
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
            fontFamily: 'PoppinsRegular',
            marginTop: 20,
            textAlign: 'justify',
        },
        termsTitle: {
            fontSize: 16,
            marginTop: 20,
            textAlign: 'center',
            fontFamily: 'PoppinsBold'
        }

    }
)