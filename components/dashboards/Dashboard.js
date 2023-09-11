import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, View, StyleSheet } from 'react-native';
import { callBackendAPI } from "../../utils/CommonFunctions";
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Dashboard = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [userData, setUsername] = React.useState({
        username: "",
        name: "",
    })
    const [role, setRole] = React.useState("");
    const [notValidatedDiagnosisList, setNotValidatedDiagnosisList] = React.useState([]);

    React.useEffect(() => {

        const initialSetup = async () => {
            try {
                const StoredUsername = await SecureStore.getItemAsync('username');
                const StoredRole = await SecureStore.getItemAsync('role');
                
                const resUserData = await callBackendAPI(`/users/${StoredUsername}`, 'GET');
                if (StoredRole === "VET") {
                    const resDiagnosisValidationData = await callBackendAPI(`/diagnosis/validation/${StoredUsername}/notValidated`, 'GET');
                    // setNotValidatedDiagnosisList(resDiagnosisValidationData.data);
                    console.log('updated');
                }
                setUsername({username: StoredUsername, name: resUserData.data['first_name']});
                setRole(StoredRole);
            } catch(error) {
                console.log(error)
            }
        }
        initialSetup();
    }, [])

    const startQuestionary = () => {
        navigation.navigate("MyDogs", {action: "questionary"})
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, {userData.name}!</Text>
            <View style={{ width: '100%' }}>
                <Text style={styles.subsectionText}>Diagnósticos pendientes de validación</Text>
                <View style={styles.diagnosisScrollContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        { notValidatedDiagnosisList.length !== 0 ? (
                            
                            notValidatedDiagnosisList.map((elem, index) => {
                                if (index + 1 !== notValidatedDiagnosisList.length) {
                                    return <WhiteButtonCard title={elem.diagnosis.dog.name} subtext={elem.diagnosis.date.replaceAll("-", "/")} containerStyle={{ alignSelf: 'center' }} image={elem.diagnosis.dog.photoUrl}/>
                                } else {
                                    return <WhiteButtonCard title={elem.diagnosis.dog.name} subtext={elem.diagnosis.date.replaceAll("-", "/")} containerStyle={{ alignSelf: 'center',marginBottom: 8 }} image={elem.diagnosis.dog.photoUrl}/>
                                }
                            }   
                            )
                        ): (
                            <View style={{width: 370,
                                height: 80,
                                backgroundColor: '#FDFFFF',
                                borderRadius: 5,
                                paddingHorizontal: 15,
                                paddingVertical: 15,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                elevation: 8,
                                marginTop: 10,
                                alignSelf: 'center',
                                marginBottom: 11}}>
                                <Text style={{textAlign: 'center', fontFamily: 'PoppinsSemiBold', fontSize: 16}}>Actualmente no posee diagnósticos sin validar</Text>
                            </View>
                        )
                        }
                        
                    </ScrollView>
                </View>
                <Text style={[styles.subsectionText, {marginTop: 10}]}>¿Qué desea hacer?</Text>
                <View style={styles.bigButtonsContainer}>
                    <TouchableOpacity onPress={()=> startQuestionary()} style={[styles.bigButton, { marginRight: 20 }]}>
                        <Text style={styles.bigButtonText}>Nuevo Cuestionario</Text>
                        <MaterialCommunityIcons name="clipboard-list-outline" size={80} color="#00A6B0" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bigButton}>
                        <Text style={styles.bigButtonText}>Escaneo{'\n'} </Text>
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
        marginHorizontal: 15
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