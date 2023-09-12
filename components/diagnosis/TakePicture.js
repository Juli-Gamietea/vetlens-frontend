import { Text, View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { callBackendAPI } from '../../utils/CommonFunctions';
import * as React from 'react';

export const TakePicture = ({ navigation, route }) => {

    const { diagnosisId } = route.params;

    const [type, setType] = React.useState(CameraType.back);
    const [camera, setCamera] = React.useState(null);
    const [permission, setPermission] = Camera.useCameraPermissions();
    const [cameraReady, setCameraReady] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    if (!permission) {
        return <View><Text>Cargando...</Text></View>
    }

    if (!permission.granted) {
        return <Text>No diste permisos</Text>
    }

    const takePicture = async () => {
        if (cameraReady) {
            try {
                const image = await camera.takePictureAsync({ ratio: '16:3' });
                if (image) {
                    setIsLoading(true);
                    const data = new FormData();
                    const getType = image.uri.split(".");
                    const getFileName = image.uri.split("/");
                    data.append('image', {
                        uri: image.uri,
                        type: `image/${getType[getType.length - 1]}`,
                        name: getFileName[getFileName.length - 1]
                    });

                    const obj = await callBackendAPI(`/diagnosis/conclude/${diagnosisId}`, "POST", data, {}, 'multipart/form-data')
                    if (obj) {
                        console.log(obj.data);
                        navigation.navigate("MessageScreen", {action: "finishDiagnosis", diagnosisId: obj.data.id})
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
    }




    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={type} ratio='16:9'
                onCameraReady={() => setCameraReady(true)}
                ref={ref => setCamera(ref)}>
                {!isLoading ?
                    (<View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={takePicture} />
                    </View>) : (
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', width: 250, height: 40, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'PoppinsRegular', color: '#FFF', fontSize: 20, textAlign: 'center'}}>Subiendo imagen...</Text>
                            </View>
                            <ActivityIndicator size={200} color="#00A6B0" />
                        </View>
                    )}

            </Camera>
        </View>
    );
}

const buttonDimensions = 70;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        margin: 64,
    },
    button: {
        width: buttonDimensions,
        height: buttonDimensions,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "#00A6B0"
    },
    buttonInside: {
        width: buttonDimensions - 15,
        height: buttonDimensions - 15,
        backgroundColor: 'grey',
        borderRadius: 50
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },

});