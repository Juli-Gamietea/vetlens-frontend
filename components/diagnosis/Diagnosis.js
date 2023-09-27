import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export const Diagnosis = ({ route, navigation}) => {
    const { diagnosis, role } = route.params;
    React.useEffect(() => {
        diagnosis.anamnesis.inferences.forEach(element => {
            if (element.disease.name.toUpperCase() === diagnosis.anamnesis.result.toUpperCase() && (diagnosis.anamnesis.result.toUpperCase() !== "NO DISCERNIBLE")) {
                setProbability((parseFloat(element.probability.replace(",", "."))*100).toFixed(2));
                setTreatments(element.disease.treatments)
            }
        });
    }, [])
   
    const [probability, setProbability] = React.useState();
    const [treatments, setTreatments] = React.useState();
    const getAge = (fecha) => {
        
        var splitDate = fecha.split('-');
        var day = splitDate[0];
        var month = splitDate[1];
        var year = splitDate[2];

        var formatedDate = year + '-' + month + '-' + day;
        var dogBirthDate = new Date(formatedDate);
        var today = new Date();
        // Get difference in miliseconds
        var difference = today - dogBirthDate;
    
        var yearsDifference = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25));
        var monthsDifference = Math.floor((difference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
        
        if (monthsDifference === 1) {
            return yearsDifference + " año y " + monthsDifference + " mes"
        } else {
            return yearsDifference + " año y " + monthsDifference + " meses"
        }
    }

    const firstButton = () => {
        navigation.navigate('Anamnesis', {diagnosisId: diagnosis.id});
    }
    const secondButton = () => {
        navigation.navigate('Treatments', {diagnosis: diagnosis, treatments: treatments});
    }
    const thirdButton = () => {
        if (role === 'VET') {
            navigation.navigate('Validation');
        } else {
            navigation.navigate('GenerateQR', {diagnosisId: diagnosis});
        }
        
    }

    return(
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                 <Text style={styles.titleText}>Diagnóstico de{'\n'} {diagnosis.dog.name} - {diagnosis.date.replaceAll("-", "/")}</Text>
            </View>
            <View style={styles.dogInfoContainer}>
                <View style={styles.dogPhotoContainer}>
                    <Text style={styles.dogName}>Datos de {diagnosis.dog.name}</Text>
                    <Image source={{uri: diagnosis.dog.photoUrl}} style={styles.dogImage}/>
                </View>
                <View style={styles.dogBioContainer}>
                    <View style={styles.bioColumn}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textTitle}>Sexo:</Text>
                            <Text style={styles.textInfo}>  {diagnosis.dog.sex === 'MALE' ? 'Macho' : 'Hembra'}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textTitle}>Raza:</Text>
                            <Text style={styles.textInfo}>  {diagnosis.dog.dog_breed}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textTitle}>Edad:</Text>
                            <Text style={styles.textInfo}> {getAge(diagnosis.dog.date_of_birth)}</Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.textTitle}>Castrado:</Text>
                            <Text style={styles.textInfo}>  {(diagnosis.dog.is_castrated) ? 'Si' : 'No'}</Text>
                        </View>
                    </View>
                    <View style={styles.bioColumn}>
                        <MaterialCommunityIcons name="clipboard-account-outline" size={90} color="#00A6B0" />
                    </View>
                </View>
            </View>
            <View style={styles.resultContainer}>
                 <Text style={styles.titleText}>Resultados</Text>
                 {
                    (diagnosis.anamnesis.result.toUpperCase() === "NO DISCERNIBLE")
                    ?
                        <Text style={styles.resultText}>
                            VetLens no pudo determinar con exactitud la
                            enfermedad, puede tratarse de una enfermedad
                            fuera de nuestro alcance por el momento.
                        </Text>
                    :
                        <Text style={styles.resultText}>
                            Según VetLens, {diagnosis.dog.name} padece de
                            "{diagnosis.anamnesis.result[0].toUpperCase() + diagnosis.anamnesis.result.slice(1)}" con un {probability}% de confiabilidad
                        </Text>
                 }
            </View>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => firstButton()}>
                <View>
                    <Text style={styles.buttonTitle}>Ir al cuestionario</Text>  
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="chevron-right" size={30} color="#00767D" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => secondButton()}>
                <View>
                    <Text style={styles.buttonTitle}>{role === 'VET' ? 'Ver tratamientos' : 'Estado de validación'}</Text>  
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="chevron-right" size={30} color="#00767D" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer} onPress={() => thirdButton()}>
                <View>
                    <Text style={styles.buttonTitle}>{role === 'VET' ? 'Validar' : 'Generar código QR'}</Text>  
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name="chevron-right" size={30} color="#00767D" />
                </View>
            </TouchableOpacity>

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
            marginTop: 20
        },
        titleText: {
            fontSize: 30,
            fontFamily: 'PoppinsRegular',
            color: '#00A6B0',
            textAlign: 'center',
        },
        dogInfoContainer: {
            flex: 1,
            height: 320,
            margin: 20
        },
        dogPhotoContainer:{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        dogName:{
            fontFamily: 'PoppinsBold',
            fontSize: 20, 
            color: '#00767D'
        },
        dogImage: {
            height: 100,
            width: 100,
            borderRadius: 10,
            marginBottom: 5
        },
        dogBioContainer:{
            flex: 1,
            backgroundColor: '#FDFFFF',
            borderRadius: 5,
            elevation: 4,
            shadowColor: 'black',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row'
        },
        textInfo:{
            fontFamily: 'PoppinsRegular',
            fontSize: 18, 
        },
        textTitle:{
            fontFamily: 'PoppinsBold',
            fontSize: 18,
            color: '#00767D'
        },
        resultContainer:{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center'
        },
        resultText:{
            fontFamily: 'PoppinsSemiBold',
            fontSize: 15,
            textAlign: 'justify',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 10
        },
        buttonContainer: {
            height: 80,
            backgroundColor: '#FDFFFF',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 15,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            elevation: 8,
            marginTop: 10,
            marginBottom: 15,
            marginLeft: 20,
            marginRight: 20
        },
        buttonTitle: {
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            fontSize: 16,
        }
    }
)