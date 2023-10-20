import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, StyleSheet } from 'react-native';
import { callBackendAPI } from "../../utils/CommonFunctions";
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../../utils/auth/AuthContext";
import { parseDate } from "../../utils/CommonFunctions";
import { useIsFocused } from '@react-navigation/native';

export const Dashboard = ({ navigation }) => {
    const { setIsSignedIn } = React.useContext(AuthContext);
    const [userData, setUsername] = React.useState({
        username: "",
        name: "",
    })
    const [role, setRole] = React.useState("");
    const [cardsList, setCardsList] = React.useState([]);
    const isFocused = useIsFocused();

    const startQuestionary = () => {
        navigation.navigate("MyDogs", {action: "questionary"})
    }

    const handleOnPressQR = () => {
        if (role === "VET") {
            navigation.navigate("QRScanner");
        } else {
            navigation.navigate("History", {qr: true});
        }
    }

    const goToDiagnosis = (diagnosis) => {
        navigation.navigate("Diagnosis", {diagnosis: diagnosis, role: role});
    }

    React.useEffect(() => {

        const initialSetup = async () => {
            try {
                const StoredUsername = await SecureStore.getItemAsync('username');
                const StoredRole = await SecureStore.getItemAsync('role');
                console.log(StoredUsername, StoredRole);
                const resUserData = await callBackendAPI(`/users/${StoredUsername}`, 'GET');
                console.log("user: " + resUserData.data['first_name'])
                if ( StoredRole === "VET" && !resUserData.data['is_validated']) {
                    navigation.navigate("NotValidated");
                }
                if (StoredRole === "VET") {
                    try {
                        const resDiagnosisValidationData = await callBackendAPI(`/diagnosis/validation/${StoredUsername}/notValidated`, 'GET');
                        setCardsList(resDiagnosisValidationData.data);
                    } catch (e) {
                        console.log(e);
                    }
                }
                else {
                    const resRecentDiagnosis = await callBackendAPI(`/diagnosis/recent/${StoredUsername}`, 'GET');
                    setCardsList(resRecentDiagnosis.data);
                }
                setUsername({ username: StoredUsername, name: resUserData.data['first_name'] });
                setRole(StoredRole);
            } catch (error) {
                console.log("ERROR: " + error)
            }
        }
        initialSetup();
    }, [isFocused])

    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, {userData.name}!</Text>
            <View style={{ width: '100%' }}>
                <Text style={styles.subsectionText}>{role === "VET" ? "Diagnósticos pendientes de validación" : "Diagnósticos recientes"}</Text>
                <View style={styles.diagnosisScrollContainer}>
                    <ScrollView style={{ width: '100%' }}>

                        {role === "VET" && cardsList.length !== 0 ? (
                            cardsList.map((elem, index) => {
                                if (index + 1 !== cardsList.length) {
                                    return <WhiteButtonCard key={index} callback={() => goToDiagnosis(elem.diagnosis)} title={elem.diagnosis.dog.name} subtext={parseDate(elem.diagnosis.date)} containerStyle={{ alignSelf: 'center' }} image={elem.diagnosis.dog.photoUrl} />
                                } else {
                                    return <WhiteButtonCard key={index} callback={() => goToDiagnosis(elem.diagnosis)} title={elem.diagnosis.dog.name} subtext={parseDate(elem.diagnosis.date)} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.diagnosis.dog.photoUrl} />
                                }
                            }
                            )
                        ) : ( role === "DEFAULT" && cardsList.length !== 0) ? (
                            cardsList.map((elem, index) => {
                                if (index + 1 !== cardsList.length) {
                                    return <WhiteButtonCard key={index} callback={() => goToDiagnosis(elem)} title={elem.dog.name} subtext={parseDate(elem.date)} containerStyle={{ alignSelf: 'center' }} image={elem.dog.photoUrl} />
                                } else {
                                    return <WhiteButtonCard key={index} callback={() => goToDiagnosis(elem)} title={elem.dog.name} subtext={parseDate(elem.date)} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.dog.photoUrl} />
                                }
                            })
                        ) : (
                            <View style={{
                                width: 370,
                                height: 80,
                                backgroundColor: '#FDFFFF',
                                borderRadius: 5,
                                paddingHorizontal: (role === "VET" ? 15 : 30),
                                paddingVertical: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                elevation: 8,
                                marginTop: 10,
                                alignSelf: 'center',
                                marginBottom: 11
                            }}>
                                <Text style={{ textAlign: 'center', fontFamily: 'PoppinsSemiBold', fontSize: 16 }}>{role === "VET" ? "Actualmente no tiene diagnósticos que validar" : "No ha generado diagnósticos en los últimos 7 días"}</Text>
                            </View>
                        )
                        }

                    </ScrollView>
                </View>
                <Text style={[styles.subsectionText, { marginTop: 10 }]}>¿Qué desea hacer?</Text>
                <View style={styles.bigButtonsContainer}>
                    <TouchableOpacity onPress={startQuestionary} style={[styles.bigButton, { marginRight: 20 }]}>        
                        <Text style={styles.bigButtonText}>Nuevo Cuestionario</Text>
                        <MaterialCommunityIcons name="clipboard-list-outline" size={80} color="#00A6B0" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleOnPressQR} style={styles.bigButton}>
                        <Text style={styles.bigButtonText}>{role === "VET" ? "Escaneo\n" : "Generar QR\n"} </Text>
                        <AntDesign name="qrcode" size={80} color="#00A6B0" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    diagnosisScrollContainer: {
        alignItems: 'center',
        height: 350,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'PoppinsRegular',
        fontSize: 48,
        color: '#00A6B0',
        textAlign: 'center',
    },
    subsectionText: {
        fontFamily: 'PoppinsBold',
        color: '#00767D',
        fontSize: 16,
        textAlign: 'center'
    },
    bigButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 15,
        marginBottom: 30
    },
    bigButton: {
        width: 170,
        height: 170,
        backgroundColor: '#FDFFFF',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 100,
        shadowRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginTop: 10
    },
    bigButtonText: {
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'PoppinsBold',
        color: '#00A6B0',
        fontSize: 16
    }
})