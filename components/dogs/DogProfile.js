import React, {useState } from "react";
import { dogProfileReducer, initialState } from "./dogProfileReducer";
import { InputVetlens } from "../common/InputVetLens";
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Modal } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { FontAwesome5 } from '@expo/vector-icons'; 
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";

export const DogProfile = ({ route, navigation }) => {
    const { action, dog } = route.params;
    React.useEffect(() => {
        console.log(action)
        console.log(dog)
    }, [])
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [sex, setSex] = useState('MALE');
    const [castrated, setCastrated] = useState(true)
    const today = new Date();
    const startDate = getFormatedDate(
        "2000/01/01",
        "YYYY/MM/DD"
    );
    const [selectedStartDate, setSelectedStartDate] = useState("Fecha");
    const [startedDate, setStartedDate] = useState(today);

    function handleChangeStartDate(propDate) {
        setStartedDate(propDate);
    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    };
    const [dogProfile, dogProfileDispatch] = React.useReducer(dogProfileReducer, initialState);
    const { name, dogBreed, birthDate, 
            isNameValid, isDogBreedValid, isBirthDateValid,
            nameErrorMessage, dogBreedErrorMessage, birthDateErrorMessage
        } = dogProfile;

    const areInputsValid = () => {
        if (name === "")
            dogProfileDispatch({ type: "nameError", error: "No puede dejar este campo vacío" });
        if (dogBreed === "")
            dogProfileDispatch({ type: "dogBreedError", error: "No puede dejar este campo vacío" });
        if (birthDate === "")
            dogProfileDispatch({ type: "birthDateError", error: "Ingrese una fecha válida" });
        if (name !== "" && dogBreed !== "" && birthDate !== "") {
            return true;
        } else {
            return false;
        }
    }

    const nextScreen = async () => {
        if (areInputsValid()) {
           
        }
    }

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.logoContainer}>
                    <Image source={vetlensLogo} style={styles.logo} />
                </View>
                <View style={styles.formContainer}>
                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Nombre </Text>
                        <InputVetlens
                            placeholder='Nombre'
                            onChange={(text) => dogProfileDispatch({
                                type: "fieldUpdate",
                                field: "name",
                                value: text
                            })}
                            value={name}
                            isValid={isNameValid}
                            errorMessage={nameErrorMessage}
                        />
                    </View>

                    <View style={styles.formContainerItem}>
                        <Text style={styles.inputTitle}> Raza </Text>
                        <InputVetlens
                            placeholder='Raza'
                            onChange={(text) => dogProfileDispatch({
                                type: "fieldUpdate",
                                field: "dogBreed",
                                value: text
                            })}
                            value={dogBreed}
                            isValid={isDogBreedValid}
                            errorMessage={dogBreedErrorMessage}
                        />
                    </View >
                    
                    <View style={{flex:1, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', marginTop: 20}}>
                        <View style={{flex:1, flexDirection: 'column', alignItems:'center'}}>
                            <Text style={styles.inputGroupTitle}> Sexo </Text>
                            <RadioButtonGroup
                                containerStyle={styles.formContainerRadioButtons}
                                selected={sex}
                                onSelected={(value) => setSex(value)}
                                radioBackground="#00A6B0"
                            >
                                
                                <RadioButtonItem value="MALE" label={<Text style={styles.radioButtonText}>Macho</Text>}/>
                                <RadioButtonItem value="FEMALE" label={<Text style={styles.radioButtonText}>Hembra</Text>}/>
                            </RadioButtonGroup>
                        </View>
                        <View style={{flex:1, flexDirection: 'column', alignItems:'center'}}>
                            <Text style={styles.inputGroupTitle}> Castrado </Text>
                            <RadioButtonGroup
                                containerStyle={styles.formContainerRadioButtons}
                                selected={castrated}
                                onSelected={(value) => setCastrated(value)}
                                radioBackground="#00A6B0"
                            >
                                <RadioButtonItem value={true} label={<Text style={styles.radioButtonText}>Si</Text>}/>
                                <RadioButtonItem value={false} label={<Text style={styles.radioButtonText}>No</Text>}/>
                            </RadioButtonGroup>
                        </View>
                    </View>
                    <View style={styles.formContainerItemDate}>
                        <Text style={styles.inputTitle}>Fecha nac.</Text>
                        <TouchableOpacity
                            style={styles.dateInput}
                            onPress={handleOnPressStartDate}
                        >
                            <Text> {selectedStartDate} </Text>
                            <FontAwesome5 name="calendar-alt" size={20} color="#00A6B0"/>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={openStartDatePicker}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode="calendar"
                                    minimumDate={startDate}
                                    selected={startedDate}
                                    onDateChanged={handleChangeStartDate}
                                    onSelectedChange={(date) => setSelectedStartDate(date)}
                                    options={{
                                        backgroundColor: "#080516",
                                        textHeaderColor: "#00A6B0",
                                        textDefaultColor: "#FFFFFF",
                                        selectedTextColor: "#FFF",
                                        mainColor: "#00A6B0",
                                        textSecondaryColor: "#FFFFFF",
                                        borderColor: "rgba(122, 146, 165, 0.1)",
                                    }}
                                />
                                <TouchableOpacity onPress={handleOnPressStartDate}>
                                <Text style={{ color: "white" }}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.formContainerItem2}>
                        <ButtonVetLens callback={nextScreen} text={"Agregar"} filled={true} />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            resizeMode: 'cover',
            backgroundColor: '#fff',
        },
        image: {
            flex: 1,
            resizeMode: 'cover',
            justifyContent: 'center',
            marginTop: 40,
            width: 200,
            height: 200
        },
        text: {
            fontFamily: "PoppinsSemiBold",
            fontSize: 36,
            paddingBottom: 10,
        },
        textContainer: {
            flex: 1,
            marginTop: 70,
            alignItems: 'center'
        },
        radioButtonText:{
            fontFamily: "PoppinsRegular",
            fontSize: 14,
            color: '#00767D'
        },
        inputTitle:{
            fontFamily: "PoppinsBold",
            fontSize: 15,
            paddingBottom: 4,
            paddingLeft: 8,
            color: '#00767D'
        },
        inputGroupTitle:{
            fontFamily: "PoppinsBold",
            fontSize: 15,
            paddingLeft: 8,
            color: '#00767D'
        },
        dateInputText:{
            fontFamily: "PoppinsBold",
            fontSize: 15,
            color: '#00767D'
        },
        formContainer: {
            flex: 3,
            paddingLeft: 15,
            paddingRight: 15,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginBottom: 40,
            marginTop: 35
        },
        formContainerItem: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 15
        },
        formContainerRadioButtons:{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginVertical: 15,
            height: 65
        },
        formContainerItem2: {
            flex: 3,
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 65,
            marginBottom: 40
        },
        formContainerItemDate: {
            flex: 1,
            width: '45%',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginVertical: 20,
            alignSelf: 'center'
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 20
        },
        logo: {
            width: 120,
            height: 120
        },
        dateInput:{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: "#F1F0F0",
            borderRadius:10,
            borderColor: "#00A6B0",
            borderWidth:2,
            fontFamily: 'PoppinsRegular',
            fontSize:14,
            padding:15,
            textAlign:"left"
        },

        centeredView: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          },
          modalView: {
            margin: 20,
            backgroundColor: "#080516",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            padding: 35,
            width: "90%",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }

    }
)