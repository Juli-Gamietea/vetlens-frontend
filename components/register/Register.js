import React from "react";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity} from "react-native";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import dog from '../../assets/icons/png/dog-walking.png';
import vetimage from '../../assets/icons/png/vet.png';
import schoolHat from '../../assets/icons/png/school-hat.png';
import { SafeAreaView } from "react-native-safe-area-context";


export const Register = ({navigation}) => {

    const owner = () => {
        navigation.navigate("RegisterForm", {type: "owner"});
    }
    
    const vet = () => {
        navigation.navigate("RegisterForm", {type: "vet"});
    }

    const student = () => {
        navigation.navigate("RegisterForm", {type: "student"});
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image source={vetlensLogo} style={styles.logo} />
                <Text style={styles.logoText}>¿Cómo deseas{'\n'} registrarte?</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={owner} style={styles.button}>
                    <Text style={styles.buttonText}>Dueño</Text>
                    <Image source={dog} style={styles.buttonImage} />
                    
                </TouchableOpacity>
                <TouchableOpacity onPress={vet} style={styles.button}>
                    <Text style={styles.buttonText}>Veterinario</Text>
                    <Image source={vetimage} style={styles.buttonImage} />  
                </TouchableOpacity>
                <TouchableOpacity onPress={student} style={styles.button}>
                    <Text style={styles.buttonText}>Estudiante</Text>
                    <Image source={schoolHat} style={styles.buttonHat} />   
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            marginLeft: 100, 
            marginRight: 100,
            minHeight: 450,
            flexGrow: 1
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 50,
            marginBottom: 60
        },
        logoText: {
            fontSize: 36,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            marginTop: 30,
            textAlign: 'center',
        },
        logo: {
            width: 120,
            height: 120
        },
        button: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            backgroundColor: '#FDFAFA',
            marginBottom: 30,
            borderRadius: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.25,
            elevation: 4,
            flexGrow: 1
        },
        buttonText: {
            fontSize: 22,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            marginTop: 20
        },
        buttonImage: {
            width: 65,
            height: 65,
            marginBottom: 15
        },
        buttonHat: {
            width: 80,
            height: 65,
            marginBottom: 15
        }

    }
)