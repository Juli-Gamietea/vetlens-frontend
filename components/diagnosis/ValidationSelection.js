import { Text, View, StyleSheet } from "react-native";
import * as React from 'react';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { InputVetlens } from "../common/InputVetLens";
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { ScrollView } from "react-native";

export const ValidationSelection = ({ navigation }) => {

    const data = [{
        value: "NOT_VALIDATED",
        vetName: "Nombre1"
    }, {
        value: "NOT_VALIDATED",
        vetName: "Nombre2"
    }, {
        value: "NOT_VALIDATED",
        vetName: "Nombre3"
    }, {
        value: "NOT_VALIDATED",
        vetName: "Nombre4"
    }, {
        value: "VALIDATED",
        vetName: "Nombre5"
    }, {
        value: "NOT_VALIDATED",
        vetName: "Nombre6"
    }, {
        value: "VALIDATED",
        vetName: "Nombre7"
    }]

    const sortedData = data.sort((a, b) => {
        if (a.value === "VALIDATED" && b.value !== "VALIDATED") {
            return -1;
        } else if (a.value !== "VALIDATED" && b.value === "VALIDATED") {
            return 1;
        } else {
            return a.vetName.localeCompare(b.vetName);
        }
    });

    const [validations, setValidations] = React.useState(sortedData);

    const goToValidation = (status) => {
        if (status === "VALIDATED") {
            navigation.navigate("Validation");
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Diagnóstico de:{'\n'} {"Tito"} - {"10/10/2023"}</Text>
            <Text style={styles.subtitle}>Veterinarios que han visto el diagnóstico</Text>
            <View style={{ alignItems: 'center', backgroundColor: '#FFF', flex: 1 }}>
                <ScrollView>
                    {validations && validations.map((validation, index) => {
                        return <WhiteButtonCard title={`${validation.vetName} - ${validation.value === "VALIDATED" ? "Validado" : "No Validado"}`} containerStyle={{ marginHorizontal: 5, marginVertical: 6 }} dontShowChevron={validation.value === "NOT_VALIDATED"} callback={() => goToValidation(validation.value)}/>
                    })}
                </ScrollView>
            </View>
        </View>
    )

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
        color: "#00767D",
        textAlign: 'center'
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