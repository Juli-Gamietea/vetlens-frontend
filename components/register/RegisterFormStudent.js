import React from "react";
import { registerReducer, initialState } from "./registerReducer";

import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { ButtonVetLens } from "../common/ButtonVetLens";
import vetlensLogo from '../../assets/icons/png/vetlens-logo.png';
import { SafeAreaView } from "react-native-safe-area-context";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { FontAwesome } from '@expo/vector-icons';

export const RegisterFormStudent = ({ route, navigation }) => {

  const { firstname, lastname, email, username, type, password } = route.params;
  const [selectedFile, setSelectedFile] = React.useState(null);

  const nextScreen = async () => {
      navigation.navigate("TermsAndConditions", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        type: type,
        password: password,
        file: selectedFile
      })
  }

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'],
        copyToCacheDirectory: false,
        multiple: false
      });

      if (result.type === 'success') {
        setSelectedFile(result);
      }
    } catch (error) {
      console.error('Error picking file', error);
    }
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={vetlensLogo} style={styles.logo} />
        <Text style={styles.logoText}>Por favor, completa los {'\n'}siguientes datos</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formContainerItem}>
          <Text style={styles.inputTitle}> Cargar certificado de alumno regular</Text>
          <Text style={styles.inputTitle}> Formatos válidos: PDF, JPG y PNG</Text>
          <ButtonVetLens callback={handleFilePicker} text={"Seleccionar archivo"} style={{ marginTop: 20 }} disabled={selectedFile} />

          {selectedFile && (
            <View style={styles.previewContainer}>
              <Text style={styles.fileName}>{selectedFile.name.length > 30 ? `${selectedFile.name.slice(0, 25)}...${selectedFile.name.slice(-8)}` : selectedFile.name}</Text>

              <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteFile}>
                <FontAwesome name="trash-o" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}

        </View>

        <View style={styles.formContainerItem2}>
          <ButtonVetLens callback={nextScreen} text={"Continuar"} filled={true} disabled={selectedFile === null} />
        </View>
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
    inputTitle: {
      fontFamily: "PoppinsBold",
      fontSize: 15,
      paddingBottom: 4,
      paddingLeft: 8,
      color: '#00767D'
    },
    formContainer: {
      flex: 3,
      paddingLeft: 15,
      paddingRight: 15,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#FFFF',
    },
    formContainerItem: {
      flex: 2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginVertical: 7
    },
    formContainerItem2: {
      flex: 3,
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: 55,
      marginBottom: 0
    },
    logoContainer: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: 40,
      marginBottom: 40
    },
    logoText: {
      fontSize: 26,
      fontFamily: 'PoppinsBold',
      color: '#00A6B0',
      marginTop: 20,
      textAlign: 'center',
    },
    logo: {
      width: 120,
      height: 120
    },
    deleteButton: {
      padding: 10,
      backgroundColor: '#e74c3c',
      borderRadius: 5,
      marginVertical: 10,
    },
    fileName: {
      fontFamily: "PoppinsSemiBold",
      fontSize: 15,
      paddingBottom: 4,
      paddingLeft: 8,
      color: 'black',
      textAlign: 'center',
      marginTop: 10,
      marginRight: 15
    },
    previewContainer: {
      alignSelf: 'center',
      marginTop: 10,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center'
    }

  }
)