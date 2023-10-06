import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonVetLens } from '../common/ButtonVetLens';
import * as ImagePicker from 'expo-image-picker';
import placeholderImage from '../../assets/icons/png/gallery.png'
import * as React from 'react';
import { callBackendAPI } from '../../utils/CommonFunctions';

export const GalleryPictureSelection = ({ route, navigation }) => {

    const [image, setImage] = React.useState(null);
    const [currentImage, setCurrentImage] = React.useState(placeholderImage);
    const [imageChange, setImageChange] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false);
    const { diagnosisId } = route.params;

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const aux = result.uri
            setCurrentImage(result.uri);
            setImageChange(true)
            const data = new FormData();
            const getType = aux.split(".");
            const getFileName = aux.split("/");
            data.append('image', {
                uri: aux,
                type: `image/${getType[getType.length - 1]}`,
                name: getFileName[getFileName.length - 1]
            });

            setImage(data)
        }
    }

    const handleContinue = async () => {
        if (image) {
            setIsLoading(true);
            const obj = await callBackendAPI(`/diagnosis/conclude/${diagnosisId}`, "POST", image, {}, 'multipart/form-data')
            if (obj) {
                navigation.navigate("MessageScreen", { action: "finishDiagnosis", diagnosisId: obj.data.id })
            }
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            {!isLoading ? (<View style={styles.imagePickerContainer}>
                <TouchableOpacity onPress={pickImage}>
                    <Image source={!imageChange ? currentImage : { uri: currentImage }} style={styles.imageProfile} />
                </TouchableOpacity>
            </View>) :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', width: 250, height: 40, borderRadius: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'PoppinsRegular', color: '#FFF', fontSize: 20, textAlign: 'center' }}>Subiendo imagen...</Text>
                    </View>
                    <ActivityIndicator size={200} color="#00A6B0" />
                </View>}
            <ButtonVetLens text={"Continuar"} style={styles.button} filled callback={handleContinue} disabled={!image || isLoading} />
        </SafeAreaView>
    )
}

const styles = new StyleSheet.create({
    imagePickerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageProfile: {
        width: 300,
        height: 300,
        borderRadius: 10
    },
    button: {
        marginHorizontal: 15,
        marginBottom: 15
    }
})
