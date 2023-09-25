import { ScrollView, View, Text, StyleSheet } from "react-native";
import React, {useState} from "react";
import * as SecureStore from 'expo-secure-store';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { WhiteButtonCard } from "../common/WhiteButtonCard";

export const History = ({navigation}) => {
    const [diagnosis, setDiagnosis] = useState([])
    const [role, setRole] = useState([])
    React.useEffect(() => { 
        
        const getDiagnosis = async () => {
            try {
                const storedUsername = await SecureStore.getItemAsync('username');
                const storedRole = await SecureStore.getItemAsync('role');
                const diagnosisData = await callBackendAPI(`/diagnosis/user/${storedUsername}`, 'GET');
                const aux = diagnosisData.data
                setDiagnosis(aux.reverse())
                setRole(storedRole)
                
            } catch(error) {
                console.log(error)
            }
        }
        getDiagnosis();
    }, [])

    const viewDiagnosis = (index) => {
        navigation.navigate("Diagnosis", {diagnosis: diagnosis[index], role: role})
    }

    return (
        <ScrollView style = {styles.container}>
            <View style={styles.titleContainer}>
                 <Text style={styles.titleText}>Diagnósticos{'\n'} realizados</Text>
            </View>
            <ScrollView style={styles.cardContainer}>
            {   
                (diagnosis.length !== 0)
                ?   (diagnosis.map((elem, index) => {
                        return(
                            <WhiteButtonCard callback={()=> viewDiagnosis(index)} key={index} title={'Diagnóstico - ' + elem.dog.name} subtext={elem.date.replaceAll("-", "/")} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} image={elem.dog.photoUrl} />
                        );
                    }))
                : <Text style={styles.defaultText}> Aún no tiene diagnósticos {'\n'}realizados :( </Text>
            }
            </ScrollView>
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
            maxHeight: 600,
            minHeight: 600
        },
        defaultText: {
            fontSize: 32,
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            textAlign: 'center',
            marginTop: 220
        }
    }
)