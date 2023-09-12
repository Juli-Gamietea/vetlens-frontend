import { Text, View, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ButtonVetLens } from '../common/ButtonVetLens';
import dogImage from '../../assets/icons/png/dog-smile.png'

export const MessageScreen = ({ route, navigation }) => {

    navigation.setOptions({
        headerTitleAlign: 'center',
        title: (action === "questionary") ? ('Cuestionario Finalizado') : ('Diagnóstico Finalizado'),
        headerTitleStyle: { fontFamily: 'PoppinsRegular' },
        headerStyle: { backgroundColor: "#FFF" }
    })

    const handleFilledButtonPress = () => {
        if (action === "questionary") {
            navigation.navigate('Picture', route.params);
        } else {
            navigation.navigate('Dashboard');
        }
    }

    const handleButtonPress = () => {
        if (action === "questionary") {
            navigation.goBack();
        } else {
            navigation.navigate('GenerateQR', {diagnosisId: route.params.diagnosisId});
        }
    }

    const { action } = route.params;



    return (
        <View style={styles.mainFrame}>
            <Image source={dogImage} style={styles.dogImage} />
            {(action === "questionary") ? (
                <>
                    <Text style={styles.message}>Ha finalizado el cuestionario. A continuación tendrá que tomar una foto de la lesión de su perro. Por favor, tenga en cuenta las siguientes recomendaciones:</Text>
                    <Text style={[styles.message, { textAlign: 'left', marginHorizontal: 40 }]}><Text style={{ fontFamily: 'PoppinsBold' }}>{'\n1. '}</Text>Tome la foto de la lesión con la mayor cercanía posible.<Text style={{ fontFamily: 'PoppinsBold' }}>{'\n2. '}</Text>Evite que la foto salga movida.<Text style={{ fontFamily: 'PoppinsBold' }}>{'\n3. '}</Text>Asegurese de que la lesión se vea de la forma más clara posible.{'\n'}</Text>
                </>) : (
                <Text style={[styles.message, {marginBottom: 240}]}>¡Excelente!, Su diagnóstico ha sido cargado con éxito.
                Ya podrá verlo en su historial. No olvide mostrar su código QR al acudir a una visita veterinaria.</Text>
            )}
            <ButtonVetLens text={action === "questionary" ? ("Siguiente") : ("Finalizar")} style={styles.button} filled callback={handleFilledButtonPress} />
            <ButtonVetLens text={action === "questionary" ? ("Volver") : ("Ver código QR")} style={styles.button} callback={handleButtonPress} />
        </View>
    );

}



const imageDimensions = 230

const styles = StyleSheet.create({
    mainFrame: {
        flex: 1,
        backgroundColor: "#FFF",
        flexDirection: 'column',
        alignItems: 'center'
    },
    dogImage: {
        width: imageDimensions,
        height: imageDimensions
    },
    message: {
        fontSize: 20,
        fontFamily: 'PoppinsRegular',
        textAlign: 'justify',
        marginHorizontal: 20
    },
    button: {
        width: 370,
        marginBottom: 10
    }
})