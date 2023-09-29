import { Text, View, StyleSheet } from "react-native";
import * as React from 'react';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { ButtonVetLens } from "../common/ButtonVetLens";
import { InputVetlens } from "../common/InputVetLens";
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { ScrollView } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { parseDate } from "../../utils/CommonFunctions";

export const ValidationSelection = ({ route, navigation }) => {

    const isFocused = useIsFocused();
    
    const { diagnosisId, dogName, date } = route.params;

    const [validations, setValidations] = React.useState([]);



    const parseData = (data) => {

        const parsedData = [];

        data.map((elem) => {
            parsedData.push({
                value: elem.value,
                vetName: elem.vet["first_name"] + " " + elem.vet["last_name"],
            })
        })

        const sortedData = parsedData.sort((a, b) => {
            if (a.value === "VALIDATED" && b.value !== "VALIDATED") {
                return -1;
            } else if (a.value !== "VALIDATED" && b.value === "VALIDATED") {
                return 1;
            } else {
                return a.vetName.localeCompare(b.vetName);
            }
        });

        return sortedData;
    }



    const goToValidation = (status) => {
        if (status === "VALIDATED") {
            navigation.navigate("Validation");
        }
    }

    React.useEffect(() => {
        const getData = async () => {
            try {
                const res = await callBackendAPI(`/diagnosis/validations/${diagnosisId}`);
                if (res.data) {
                    setValidations(parseData(res.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [isFocused])

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.titleText}>Diagnóstico de:{'\n'} {dogName} - {parseDate(date)}</Text>
            <Text style={styles.subtitle}>Veterinarios que han visto el diagnóstico</Text>
            <View style={{ alignItems: 'center', backgroundColor: '#FFF', flex: 1 }}>
                {validations.length > 0 ? <ScrollView>
                    {validations && validations.map((validation, index) => {
                        return <WhiteButtonCard key={index} title={`${validation.vetName} - ${validation.value === "VALIDATED" ? "Validado" : "No Validado"}`} containerStyle={{ marginHorizontal: 5, marginVertical: 6 }} dontShowChevron={validation.value === "NOT_VALIDATED"} callback={() => goToValidation(validation.value)} />
                    })}
                </ScrollView> : (
                    <Text style={styles.nothingToShowText}>Ningún Veterinario ha visto el diagnóstico aún :(</Text>
                )}
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
    },
    nothingToShowText: {
        fontFamily: "PoppinsBold", 
        fontSize: 18, 
        textAlign: 'center', 
        marginTop: 50
    }
})