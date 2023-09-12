import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as CommmonFunctions from '../../utils/CommonFunctions'
import qrFrame from '../../assets/icons/png/QR-Frame-Round.png'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';

export const QRCodeScanner = ({ navigation }) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        const res = await CommmonFunctions.callBackendAPI(`/diagnosis/${data}`, 'GET', {}, {}, 'application/json');
        if (res.status === 200) {
            Alert.alert("Éxito", "El diagnóstico fue encontrado!");
            // aca habría que poner el cambio de pantalla
        } else {
            Alert.alert("Error", "No se ha encontrado el diagnóstico.")
        }
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
            <View style={styles.container}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={[{}, styles.cameraFeed]}
                >
                    <Image source={qrFrame} style={{ height: 250, width: 250}} />
                    <View style={styles.frame}>
                        <Text style={styles.text}>Esceneá el código QR</Text>
                    </View>
                </BarCodeScanner>
                {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    cameraFeed: {
        flex: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    frame: {
        backgroundColor: 'rgba(0 , 0, 0, 0.85)',
        borderRadius: 50,
        height: 40,
        width: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 200,
        marginTop: 100
    },
    text: {
        textAlign: 'center',
        color: '#FFF',
        textAlignVertical: 'center',
        fontFamily: 'PoppinsRegular',
        fontSize: 18
    },
    topContainer: {
        flex: 1,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end'
    },
    textContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-end',
        fontFamily: 'PoppinsRegular',
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        marginBottom: 6
    }
});
