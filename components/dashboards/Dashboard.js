import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { Text, View, StyleSheet } from 'react-native';
import { callBackendAPI } from "../../utils/CommonFunctions";
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { WhiteButtonCard } from "../common/WhiteButtonCard";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";

export const Dashboard = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [username, setUsername] = React.useState("")
    const [role, setRole] = React.useState("");

    React.useEffect(() => {

        const test = async () => {
            const StoredUsername = await SecureStore.getItemAsync('username');
            setUsername(StoredUsername);
            const StoredRole = await SecureStore.getItemAsync('role');
            setRole(StoredRole);
        }
        test();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>¡Bienvenido, {username}!</Text>
            <View style={{ width: '100%' }}>
                <Text style={styles.subsectionText}>Diagnósticos pendientes de validación</Text>
                <View style={styles.diagnosisScrollContainer}>
                    <ScrollView style={{ width: '100%' }}>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} image={'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'}/>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} image={'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2023/07/top-20-small-dog-breeds.jpeg.jpg'}/>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} image={'https://www.hartz.com/wp-content/uploads/2022/04/small-dog-owners-1.jpg'}/>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} image={'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'}/>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} image={'https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'}/>
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} subtext={"20/08/2023"} containerStyle={{ alignSelf: 'center' }} />
                        <WhiteButtonCard title={"Diagnóstico - Rocco"} containerStyle={{ alignSelf: 'center', marginBottom: 8 }} />
                    </ScrollView>
                </View>
                <Text style={[styles.subsectionText, {marginTop: 10}]}>¿Qué desea hacer?</Text>
                <View style={styles.bigButtonsContainer}>
                    <TouchableOpacity style={[styles.bigButton, { marginRight: 20 }]}>
                        <Text style={styles.bigButtonText}>Nuevo Cuestionario</Text>
                        <MaterialCommunityIcons name="clipboard-list-outline" size={80} color="#00A6B0" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bigButton}>
                        <Text style={styles.bigButtonText}>Escaneo{'\n'} </Text>
                        <AntDesign name="qrcode" size={80} color="#00A6B0" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    diagnosisScrollContainer: {
        alignItems: 'center',
        height: 350,
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'PoppinsRegular',
        fontSize: 48,
        color: '#00A6B0',
        textAlign: 'center',
    },
    subsectionText: {
        fontFamily: 'PoppinsBold',
        color: '#00767D',
        fontSize: 16,
        textAlign: 'center'
    },
    bigButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 15
    },
    bigButton: {
        width: 170,
        height: 170,
        backgroundColor: '#FDFFFF',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 4 },
        shadowOpacity: 100,
        shadowRadius: 4,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        marginTop: 10
    },
    bigButtonText: {
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: 'PoppinsBold',
        color: '#00A6B0',
        fontSize: 16
    }
})