import { Text, View, StyleSheet } from "react-native";
import * as React from 'react';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { InputVetlens } from "../common/InputVetLens";

export const Validation = ({ navigation }) => {

    const [notes, setNotes] = React.useState("");
    const role = "VET";

    if (role === "VET") {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>Diagnóstico de:{'\n'} {"Tito"} - {"10/10/2023"}</Text>
                <Text style={styles.subtitle}>Resultados</Text>
                <Text style={styles.text}>VetLens propuso "{"dermatofitosis"}" como diagnóstico.</Text>
                <Text style={styles.text}>¿Está de acuerdo?</Text>
                <View style={styles.buttonsContainer}>
                    <ButtonVetLens text={"Si"} style={{ width: 80, marginRight: 10 }} />
                    <ButtonVetLens text={"No"} style={{ width: 80, marginLeft: 10 }} />
                </View>
                <Text style={styles.subtitle}>Notas</Text>
                <InputVetlens placeholder='Escriba notas relevantes aqui...'
                    onChange={(text) => setNotes(text)}
                    value={notes}
                    isValid
                    style={{ height: 200, textAlignVertical: 'top', marginVertical: 15 }}
                    multiline={true}
                />
                <ButtonVetLens text={"Hecho"} filled />
            </View>
        )
    }
    else {
        return (<View style={styles.mainContainer}>
                <Text style={styles.titleText}>Diagnóstico de:{'\n'} {"Tito"} - {"10/10/2023"}</Text>
                <Text style={styles.subtitle}>Resultados</Text>
                <Text style={styles.text}>El veterinario ha confirmado que su perro padece de "{"dermatofitosis"}".</Text>
                <Text style={styles.text}>Contáctese con su veterinario si aún no lo ha hecho para tener más detalles.</Text>
                <View style={{height: 320}}/>
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