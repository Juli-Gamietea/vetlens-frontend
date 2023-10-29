import { ScrollView, View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import React from "react";

export const Treatments = ({ route, navigation }) => {
    const { diagnosis, treatments } = route.params;
    return (
        <ScrollView style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>Tratamientos de {diagnosis.anamnesis.result[0].toUpperCase() + diagnosis.anamnesis.result.slice(1)}</Text>
            </View>
            <View style={styles.treatmentsContainer}>
                <ScrollView style={styles.treatmentsList}>
                    {
                        treatments.map((elem, index) => {
                            return (
                                <TouchableOpacity key={index} style={styles.treatmentCard} onPress={() => {
                                    if (elem.source) {
                                        Linking.openURL(elem.source)
                                    }
                                }}>
                                    <View style={styles.treatmentInfo}>
                                        <Text style={styles.treatmentTitleText}>{elem.name}</Text>
                                        <Text style={styles.treatmentInfoText}>{elem.summary}</Text>
                                        <Text style={styles.treatmentLinkText}>
                                            Pulse para más información
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }

                </ScrollView>
            </View>
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
            marginTop: 50
        },
        titleText: {
            fontSize: 30,
            fontFamily: 'PoppinsRegular',
            color: '#00A6B0',
            textAlign: 'center',
        },
        treatmentsContainer: {
            flex: 1,
            marginTop: 25,
        },
        treatmentsList: {
            flex: 1,
            maxHeight: 630,
            minHeight: 630
        },
        treatmentCard: {
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
            elevation: 4
        },
        treatmentInfo: {
            flex: 1,
            flexDirection: 'column',
            width: '100%',
            height: 200
        },
        treatmentTitleText: {
            fontFamily: 'PoppinsBold',
            fontSize: 20,
            color: '#00767D',
            alignSelf: 'center',
            marginTop: 10
        },
        treatmentInfoText: {
            fontFamily: 'PoppinsRegular',
            fontSize: 18,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 10
        },
        treatmentLinkText: {
            position: 'absolute',
            fontFamily: 'PoppinsRegular',
            fontSize: 18,
            color: '#00767D',
            alignSelf: 'center',
            bottom: 0
        },
    }
)