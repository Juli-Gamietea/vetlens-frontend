import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { ButtonVetLens } from "../common/ButtonVetLens";
import * as SecureStore from 'expo-secure-store';
import { callBackendAPI } from "../../utils/CommonFunctions";

export const MyDogs = ({ route, navigation }) => {

    const [dogs, setDogs] = React.useState([])

    React.useEffect(() => {
        const getDogs = async () => {
            try {
                const StoredUsername = await SecureStore.getItemAsync('username');
                const dogsData = await callBackendAPI(`/users/dogs/${StoredUsername}`, 'GET');
                setDogs(dogsData.data)
            } catch(error) {
                console.log(error)
            }
        }
        getDogs();
    }, [])
    const goProfile = () => {

    }
    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Tus perros</Text>
                </View>
                <View style={styles.mainContainer}>
                    <ScrollView style={styles.cardContainer}>
                        { dogs.length != 0 
                        ? (
                            dogs.map((elem, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.dogCard}>
                                        <View style={styles.buttonsContainer}>
                                            <TouchableOpacity style={styles.button}> 
                                                <MaterialIcons name="edit" size={24} color="#00767D" />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.button}> 
                                                <FontAwesome name="trash" size={24} color="#00767D" />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.cardInfo}>
                                            <Image source={{uri:elem.photoUrl}} style={styles.dogImage} />
                                            <View style={styles.textContainer}>
                                                <Text style={styles.name}> {elem.name} </Text>
                                                <Text style={styles.info}> {elem.dog_breed} </Text>
                                                <Text style={styles.info}> {elem.date_of_birth} </Text>
                                                { (elem.sex === "MALE")
                                                    ? <Text style={styles.info}> Macho </Text>
                                                    : <Text style={styles.info}> Hembra </Text>
                                                }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                );
                            }
                        ))
                        : <Text style={styles.defaultText}> Aún no tiene{'\n'} perros guardados :( </Text>
                        }
                        
                    </ScrollView>
                    <ButtonVetLens style={styles.addButton} text={"Agregar"} filled={true} />
                </View>
            </SafeAreaView>
        </ScrollView>
    )
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
            justifyContent: 'space-evenly',
            marginTop: 40
        },
        titleText: {
            fontSize: 32,
            fontFamily: 'PoppinsBold',
            color: '#00A6B0',
            textAlign: 'center',
        },
        defaultText: {
            fontSize: 32,
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            textAlign: 'center',
            marginTop: 220
        },
        mainContainer:{
            flex:1,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 40,
            marginTop: 25,
        },
        cardContainer: {
            flex: 1,
            maxHeight: 585,
            minHeight: 585
        },
        addButton: {
            marginTop: 20
        },
        dogCard: {
            flex: 1,
            margin: 10,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRadius: 5,
            backgroundColor: '#FDFAFA',
            shadowColor: 'rgba(0, 0, 0, 0.75)',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 4,
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%',
            paddingTop: 4
        },
        button: {
            marginLeft: 5,
            marginRight: 10
        },
        cardInfo: {
            flex: 3,
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%'
        },
        dogImage: {
            width: 120,
            height: 120,
            margin: 10,
            borderRadius: 5
        },
        textContainer: {
            flex:1,
            width: '100%',
            height: '100%',
            marginBottom: 5
        },
        name: {
            fontSize: 22,
            fontFamily: 'PoppinsBold',
            color: '#00767D'
        },
        info: {
            color: '#00A6B0',
            fontSize: 20,
            fontFamily: 'PoppinsSemiBold',
        }


    }
)