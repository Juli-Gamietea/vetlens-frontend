import { Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { callBackendAPI } from "../../utils/CommonFunctions";
import * as React from 'react';
import { ButtonVetLens } from "../common/ButtonVetLens";

export const GenerateQR = ({ navigation, route }) => {

    const { diagnosisId } = route.params;
    const [qrCode, setQrCode] = React.useState(null);
    const [diagnosis, setDiagnosis] = React.useState(null);

    const parseDate = (date) => {
        const splitDate = date.split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    }

    React.useEffect(() => {
        const getDiagnosisAndQR = async () => {
            try {

                const resDiagnosis = await callBackendAPI(`/diagnosis/${diagnosisId}`);
                const resQrCode = await callBackendAPI(`/diagnosis/qr/${diagnosisId}`);
                if (resDiagnosis && resQrCode) {
                    setQrCode(resQrCode.data);
                    resDiagnosis.data.date = parseDate(resDiagnosis.data.date);
                    setDiagnosis(resDiagnosis.data);

                }
            } catch (error) {
                console.log(error);
            }
        }
        getDiagnosisAndQR();
    }, [])


    return (
        <SafeAreaView style={styles.frame}>
            {diagnosis && qrCode && 
            <>
                <Text style={styles.screenTitle}>Diagnóstico de:{'\n'} {diagnosis.dog.name} - {diagnosis.date} </Text>
                <Image source={{ uri: `data:image/png;base64,${qrCode}` }} style={styles.qrCode} />
                <ButtonVetLens text={"Salir"} style={styles.button} callback={() => navigation.navigate("Dashboard")} filled />
            </>
            }
        </SafeAreaView>
    );
}

const qrCodeDimensions = 300;

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    qrCode: {
        width: qrCodeDimensions,
        height: qrCodeDimensions
    },
    screenTitle: {
        fontFamily: 'PoppinsRegular',
        fontSize: 40,
        textAlign: 'center',
        color: "#00A6B0"
    },
    button: {
        width: 370
    }
})