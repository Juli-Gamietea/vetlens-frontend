import React, {useState} from "react";
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { ButtonVetLens } from "../common/ButtonVetLens";
import * as SecureStore from 'expo-secure-store';
import { callBackendAPI } from "../../utils/CommonFunctions";
import { useIsFocused } from '@react-navigation/native';

export const MyDogs = ({ route, navigation }) => {
    const { action } = route.params;
    const isFocused = useIsFocused();
    const [dogs, setDogs] = React.useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentDog, setCurrentDog] = useState();
    const [currentAction, setCurrentAction] = useState();

    React.useEffect(() => { 
        if (action === 'questionary' && isFocused) {
            setModalVisible(true)
        }
        const getDogs = async () => {
            try {
                const StoredUsername = await SecureStore.getItemAsync('username');
                const dogsData = await callBackendAPI(`/users/dogs/${StoredUsername}`, 'GET');
                const result = dogsData.data.filter((dog) => dog.deleted === false);
                setDogs(result)
            } catch(error) {
                console.log(error)
            }
        }
        getDogs();
    }, [action, isFocused])

    const deleteDog = async () => {
        setModalVisible(!modalVisible)
        try{
            await callBackendAPI(`/users/dog/remove/${currentDog.id}`, 'DELETE');
            const actualDogs = dogs.filter((dog) => dog.id !== currentDog.id)
            setDogs(actualDogs)
        } catch(error) {
            console.log(error)
        }
    }

    const displayModal = (position, action) => {
        setModalVisible(!modalVisible)
        setCurrentDog(dogs[position])
        setCurrentAction(action)
    }

    const closeModal = () => {
        setModalVisible(!modalVisible)
        if (currentAction === 'edit') {
            navigation.navigate("DogProfile", {action: 'edit', dog: currentDog})
        } else {
            deleteDog()
        }
    }

    const goNextScreen = (index, type) => {
        if (action === 'mydogs') {
            setCurrentDog(dogs[index])
            navigation.navigate("DogProfile", {action: type, dog:dogs[index]})
        } else {
            navigation.navigate("Questions", {dog:dogs[index]})
        }
        
    }

    const addDog = () => {
        navigation.navigate("DogProfile", {action: 'add', variant: action})
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.titleContainer}>
                { 
                    action === 'questionary' 
                    ? <Text style={[styles.titleText, {marginTop: 0}]}>Seleccione el perro</Text>
                    : <Text style={styles.titleText}>Tus perros</Text>
                }
                    
                </View>
                <View style={styles.mainContainer}>
                    <ScrollView style={styles.cardContainer}>
                        { dogs.length != 0 
                        ? (
                            dogs.map((elem, index) => {
                                return (
                                    <TouchableOpacity key={index} style={styles.dogCard} onPress={()=> goNextScreen(index, 'view')} >
                                        <View style={styles.cardInfo}>
                                            <Image source={{uri:elem.photoUrl}} style={styles.dogImage} />
                                            <View style={styles.textContainer}>
                                                <View style={styles.firstLineContainer}>
                                                    <Text style={styles.name}> {elem.name} </Text>
                                                    { (action === 'mydogs') && 
                                                    <View style={styles.buttonsContainer}>
                                                        <TouchableOpacity style={styles.button}> 
                                                            <MaterialIcons name="edit" size={24} color="#00767D" onPress={() => displayModal(index, "edit")} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.button} onPress={() => displayModal(index, "delete")} > 
                                                            <FontAwesome name="trash" size={24} color="#00767D" />
                                                        </TouchableOpacity>
                                                    </View>
                                                    }
                                                </View>
                                                <Text style={styles.info}> {elem.dog_breed} </Text>
                                                <Text style={styles.info}> {elem.date_of_birth.replaceAll("-","/")} </Text>
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
                    <ButtonVetLens callback={()=> addDog()} style={styles.addButton} text={"Agregar"} filled={true} />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {
                                (action === 'questionary')
                                ?
                                <>
                                    <Text style={styles.modalText}>Pulse el perro a diagnosticar. {'\n'}
                                    Si desea registrar uno nuevo pulse "Agregar"</Text>
                                    <TouchableOpacity 
                                        style={[styles.buttonModal, styles.buttonConfirm]}
                                        onPress={() => closeModal()}
                                    >
                                        <Text style={styles.textConfirm}>Entendido</Text>
                                    </TouchableOpacity>
                                </>
                                   
                                :
                                    <>
                                        <Text style={styles.modalText}> 
                                        {
                                            (currentAction === 'edit') ? '¿Desea editar el perro?' : '¿Desea eliminar el perro?'
                                        }
                                        </Text>
                                            <TouchableOpacity 
                                                style={[styles.buttonModal, styles.buttonConfirm]}
                                                onPress={() => closeModal()}
                                            >
                                                <Text style={styles.textConfirm}>Confirmar</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity 
                                                style={[styles.buttonModal, styles.buttonCancel]}
                                                onPress={() => setModalVisible(!modalVisible)}
                                            >
                                                <Text style={styles.textCancel}>Cancelar</Text>
                                            </TouchableOpacity>
                                    </>
                            }
                        </View>
                    </View>
                </Modal>
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
            marginTop: 25,
        },
        cardContainer: {
            flex: 1,
            maxHeight: 585,
            minHeight: 585
        },
        addButton: {
            marginTop: 20,
            marginHorizontal: 15
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
        firstLineContainer:{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end'
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
            height: '100%'
        },
        name: {
            fontSize: 22,
            fontFamily: 'PoppinsBold',
            color: '#00767D',
            marginTop: 4
        },
        info: {
            color: '#00A6B0',
            fontSize: 20,
            fontFamily: 'PoppinsSemiBold'
        },

        // MODAL CSS PROPS
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
          },
          modalView: {
            margin: 20,
            backgroundColor: '#FDFAFA',
            borderRadius: 20,
            padding: 35,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          },
          buttonModal: {
            borderRadius: 20,
            padding: 10,
            elevation: 2,
            width: 120,
            marginBottom: 10
          },
          buttonConfirm: {
            backgroundColor: '#00A6B0',
          },
          buttonCancel: {
            backgroundColor: '#FFFFFF',
          },
          textConfirm:{
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'PoppinsRegular'
          },
          textCancel: {
            color: '#00A6B0',
            fontWeight: 'bold',
            textAlign: 'center',
            fontSize: 15,
            fontFamily: 'PoppinsRegular'
          },
          modalText: {
            marginBottom: 15,
            textAlign: 'center',
            fontFamily: 'PoppinsSemiBold'
          },
          modalTextQuestionary: {
            marginBottom: 15,
            textAlign: 'center',
            fontFamily: 'PoppinsSemiBold'
          }


    }
)