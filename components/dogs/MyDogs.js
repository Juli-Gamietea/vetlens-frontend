import React from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';

export const MyDogs = ({ route, navigation }) => {
    React.useEffect(() => {

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
                        <TouchableOpacity style={styles.dogCard}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button}> 
                                    <MaterialIcons name="edit" size={24} color="#00767D" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}> 
                                    <FontAwesome name="trash" size={24} color="#00767D" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardInfo}>
                                <Image source={vetlensLogo} style={styles.dogImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}> Rocco </Text>
                                    <Text style={styles.info}> Golden Retriever </Text>
                                    <Text style={styles.info}> 13/07/2022 </Text>
                                    <Text style={styles.info}> Macho </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dogCard}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button}> 
                                    <MaterialIcons name="edit" size={24} color="#00767D" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}> 
                                    <FontAwesome name="trash" size={24} color="#00767D" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardInfo}>
                                <Image source={vetlensLogo} style={styles.dogImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}> Rocco </Text>
                                    <Text style={styles.info}> Golden Retriever </Text>
                                    <Text style={styles.info}> 13/07/2022 </Text>
                                    <Text style={styles.info}> Macho </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dogCard}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button}> 
                                    <MaterialIcons name="edit" size={24} color="#00767D" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}> 
                                    <FontAwesome name="trash" size={24} color="#00767D" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardInfo}>
                                <Image source={vetlensLogo} style={styles.dogImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}> Rocco </Text>
                                    <Text style={styles.info}> Golden Retriever </Text>
                                    <Text style={styles.info}> 13/07/2022 </Text>
                                    <Text style={styles.info}> Macho </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dogCard}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button}> 
                                    <MaterialIcons name="edit" size={24} color="#00767D" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}> 
                                    <FontAwesome name="trash" size={24} color="#00767D" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardInfo}>
                                <Image source={vetlensLogo} style={styles.dogImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}> Rocco </Text>
                                    <Text style={styles.info}> Golden Retriever </Text>
                                    <Text style={styles.info}> 13/07/2022 </Text>
                                    <Text style={styles.info}> Macho </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dogCard}>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity style={styles.button}> 
                                    <MaterialIcons name="edit" size={24} color="#00767D" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}> 
                                    <FontAwesome name="trash" size={24} color="#00767D" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.cardInfo}>
                                <Image source={vetlensLogo} style={styles.dogImage} />
                                <View style={styles.textContainer}>
                                    <Text style={styles.name}> Rocco </Text>
                                    <Text style={styles.info}> Golden Retriever </Text>
                                    <Text style={styles.info}> 13/07/2022 </Text>
                                    <Text style={styles.info}> Macho </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
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
        mainContainer:{
            flex:1,
            marginLeft: 15,
            marginRight: 15,
            marginBottom: 40,
            marginTop: 25,
        },
        cardContainer: {
            flex: 1,
            maxHeight: 585
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