import { Text, View, StyleSheet, ScrollView } from "react-native";
import * as React from 'react';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { InputVetlens } from "../common/InputVetLens";
import * as SecureStore from 'expo-secure-store';

export const Validation = ({ route, navigation }) => {

    const [notes, setNotes] = React.useState("");
    const [validatedOption, setValidatedOption] = React.useState("");
    const { diagnosis } = route.params;
    const [role, setRole] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [disease, setDisease] = React.useState("");
    const [diseaseError, setDiseaseError] = React.useState("");
    const [validationId, setValidationId] = React.useState("");

    const handleYes = () => {
        setValidatedOption("Si");
        setDisease("");
    }
    
    const handleNo = () => {
        setValidatedOption("No");
    }

    const handleWrite = (text) => {
        setDisease(text);
        setDiseaseError("");
    } 

    const validateInputs = () => {
        if (validatedOption === "No") {
            if (!disease) {
                return false;
            }
        }
        return true;
    }

    const handleDone = async () => {
        try {
            if (validateInputs()) {

                const data = {
                    id: validationId,
                    value: validatedOption === "Si" ? "CORRECT" : "INCORRECT",
                    notes: notes ? notes : null,
                    disease: disease ? disease : diagnosis.anamnesis.result
                }

                console.log(data)

                const res = await callBackendAPI('/diagnosis/validate', 'PUT', data);

            } else {
                setDiseaseError("Por favor, ingrese una enfermedad");
            }

        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const role = await SecureStore.getItemAsync("role");
                const username = await SecureStore.getItemAsync("username");
                setRole(role);
                setUsername(username);
                const res = await callBackendAPI(`/diagnosis/${diagnosis.id}/${username}`)
                if (res.data.disease === diagnosis.anamnesis.result) {
                    setValidatedOption("Si");
                } else if ( res.data.disease ){
                    setValidatedOption("No");
                    setDisease(res.data.disease);
                }
                setValidationId(res.data.id)
                if (res.data.notes) {
                    setNotes(res.data.notes);
                }
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, [])

    if (role === "VET") {
        return (
            <ScrollView style={styles.mainContainer}>
                <Text style={styles.titleText}>Diagnóstico de:{'\n'} {"Tito"} - {"10/10/2023"}</Text>
                <Text style={styles.subtitle}>Resultados</Text>
                <Text style={styles.text}>VetLens propuso "{diagnosis.anamnesis.result}" como diagnóstico.</Text>
                <Text style={styles.text}>¿Está de acuerdo?</Text>
                <View style={styles.buttonsContainer}>

                    <ButtonVetLens text={"Si"}
                        style={{ width: 80, marginRight: 10 }}
                        filled={validatedOption === "Si"}
                        callback={handleYes} />

                    <ButtonVetLens text={"No"}
                        style={{ width: 80, marginLeft: 10 }}
                        filled={validatedOption === "No"}
                        callback={handleNo} />

                </View>
                {validatedOption === "No" && 
                <>
                <Text style={styles.subtitle}>Enfermedad propuesta</Text>
                <InputVetlens placeholder={"Escriba la enferemdad aqui..."}
                onChange={(text) => handleWrite(text)}
                value={disease}
                isValid={diseaseError === ""}
                errorMessage={diseaseError}
                />
                </>}
                <Text style={styles.subtitle}>Notas</Text>
                <InputVetlens placeholder='Escriba notas relevantes aqui...'
                    onChange={(text) => setNotes(text)}
                    value={notes}
                    isValid
                    style={{ height: 200, textAlignVertical: 'top', marginVertical: 15 }}
                    multiline={true}
                />
                <ButtonVetLens text={"Hecho"} 
                filled 
                style={{marginBottom: 50}}
                callback={handleDone}
                disabled={validatedOption === ""}
                />
            </ScrollView>
        )
    }
    else {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>Diagnóstico de:{'\n'} {"Tito"} - {"10/10/2023"}</Text>
                <Text style={styles.subtitle}>Resultados</Text>
                <Text style={styles.text}>El veterinario ha confirmado que su perro padece de "{"dermatofitosis"}".</Text>
                <Text style={styles.text}>Contáctese con su veterinario si aún no lo ha hecho para tener más detalles.</Text>
                <View style={{ height: 320 }} />
                <ButtonVetLens text={"Volver"} />
            </View>)
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 15,
    },
    titleText: {
        fontSize: 40,
        fontFamily: 'PoppinsRegular',
        color: '#00A6B0',
        textAlign: 'center',
    },
    subtitle: {
        alignSelf: 'center',
        marginVertical: 15,
        fontSize: 20,
        fontFamily: "PoppinsBold",
        color: "#00767D"
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: "PoppinsRegular",
        marginVertical: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})