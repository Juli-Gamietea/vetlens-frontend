import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, {useState} from "react";
import * as SecureStore from 'expo-secure-store';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { parseDate } from "../../utils/CommonFunctions";
import { useIsFocused } from '@react-navigation/native';

export const History = ({route, navigation}) => {
    
    let qr;
    if (route.params) {
        qr = route.params.qr;
    }

    const [diagnosis, setDiagnosis] = useState([])
    const [validationsValidated, setValidationsValidated] = useState([]);
    const [validationsNotValidated, setValidationsNotValidated] = useState([]);
    const [role, setRole] = useState([])
    const isFocused = useIsFocused();

    React.useEffect(() => { 
        
        const getDiagnosis = async () => {
            try {
                const storedUsername = await SecureStore.getItemAsync('username');
                const storedRole = await SecureStore.getItemAsync('role');
                const diagnosisData = await callBackendAPI(`/diagnosis/user/${storedUsername}`, 'GET');
                const aux = diagnosisData.data
                setDiagnosis(aux.reverse())
                setRole(storedRole)

                if (!qr && storedRole === "VET") {
                    const notValidated = await getValidations(storedUsername, "NOT_VALIDATED");
                    const correct = await getValidations(storedUsername, "CORRECT");
                    const incorrect = await getValidations(storedUsername, "INCORRECT");

                    setValidationsNotValidated(notValidated);
                    setValidationsValidated(correct.concat(incorrect));
                }
                
            } catch(error) {
                console.log(error)
            }
        }

        const getValidations = async (username, state) => {
            try {
                const validationsData = await callBackendAPI(`/diagnosis/validation/${username}/${state}`);
                if (validationsData) {
                    const data = validationsData.data;
                    return data;
                }
                return [];
            } catch (error) {
                return [];
            }
        }
        getDiagnosis();
    }, [isFocused])

    const viewDiagnosis = (index) => {
        if (qr) {
            console.log(diagnosis[index].id)
            navigation.navigate("GenerateQR", {diagnosisId: diagnosis[index].id})
        } else {
            navigation.navigate("Diagnosis", {diagnosis: diagnosis[index], role: role})
        }
    }

    const viewValidation = (diagnosis) => {
        navigation.navigate("Diagnosis", {diagnosis: diagnosis, role: role})
    }

    return (
        <ScrollView style = {styles.container} nestedScrollEnabled={true}>
            <View style={styles.titleContainer}>
                 <Text style={styles.titleText}>Diagnósticos{'\n'} realizados</Text>
            </View>
            <ScrollView style={styles.cardContainer} nestedScrollEnabled={true}>
            {   
                (diagnosis.length !== 0)
                ?   (diagnosis.map((elem, index) => {
                        return(
                            <WhiteButtonCard callback={()=> viewDiagnosis(index)} key={index} title={'Diagnóstico - ' + elem.dog.name} subtext={parseDate(elem.date)} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.dog.photoUrl} />
                        );
                    }))
                : <View style={{
                    width: 370,
                    height: 80,
                    backgroundColor: '#FDFFFF',
                    borderRadius: 5,
                    paddingHorizontal: (role === "VET" ? 15 : 30),
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 8,
                    marginTop: 10,
                    alignSelf: 'center',
                    marginBottom: 11
                }}>
                    <Text style={{ textAlign: 'center', fontFamily: 'PoppinsSemiBold', fontSize: 15 }}>Aún no tiene diagnosticos realizados</Text>
                </View>
            }
            </ScrollView>

            { !qr && role === "VET" &&
            <>
            <View style={styles.subTitleContainer}>
                <Text style={styles.titleText}>Diagnósticos{'\n'} No Validados</Text>
            </View>
                <ScrollView style={styles.cardContainer} nestedScrollEnabled={true}>
                {   
                    (validationsNotValidated.length !== 0)
                    ?   (validationsNotValidated.map((elem, index) => {
                            return(
                                <WhiteButtonCard callback={()=> viewValidation(elem.diagnosis)} key={index} title={'Diagnóstico - ' + elem.diagnosis.dog.name} subtext={parseDate(elem.diagnosis.date)} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.diagnosis.dog.photoUrl} />
                            );
                        }))
                    : <View style={{
                        width: 370,
                        height: 80,
                        backgroundColor: '#FDFFFF',
                        borderRadius: 5,
                        paddingHorizontal: (role === "VET" ? 15 : 30),
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 8,
                        marginTop: 10,
                        alignSelf: 'center',
                        marginBottom: 11
                    }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'PoppinsSemiBold', fontSize: 15 }}>No tiene diagnósticos pendientes por validar</Text>
                    </View>
                }
                </ScrollView>
                <View style={styles.subTitleContainer}>
                    <Text style={styles.titleText}>Diagnósticos{'\n'} validados</Text>
                </View>
                <ScrollView style={styles.cardContainer} nestedScrollEnabled={true}>
                {   
                    (validationsValidated.length !== 0)
                    ?   (validationsValidated.map((elem, index) => {
                            return(
                                <WhiteButtonCard callback={()=> viewValidation(elem.diagnosis)} key={index} title={'Diagnóstico - ' + elem.diagnosis.dog.name} subtext={parseDate(elem.diagnosis.date)} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.diagnosis.dog.photoUrl} />
                            );
                        }))
                    : <View style={{
                        width: 370,
                        height: 80,
                        backgroundColor: '#FDFFFF',
                        borderRadius: 5,
                        paddingHorizontal: (role === "VET" ? 15 : 30),
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 8,
                        marginTop: 10,
                        alignSelf: 'center',
                        marginBottom: 30
                    }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'PoppinsSemiBold', fontSize: 16, marginLeft: 40 }}>Aún no ha validado ningún diagnóstico</Text>
                    </View>
                    
                }
                </ScrollView>
            </> 
            }

        </ScrollView>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: '#ffff'
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 50,
            marginBottom: 30
        },
        titleText: {
            fontSize: 32,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            textAlign: 'center',
        },
        cardContainer: {
            flex: 1,
            maxHeight: 350,
            minHeight: 0,
        },
        defaultText: {
            fontSize: 32,
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            textAlign: 'center',
            marginTop: 150
        },
        subTitleContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 50,
        },
        defaultSubText: {
            fontSize: 20,
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            textAlign: 'center',
            marginTop: 30
        }
    }
)