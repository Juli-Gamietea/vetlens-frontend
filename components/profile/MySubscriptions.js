import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import basicBanner from '../../assets/plans/banner-basic.png';
import fullBanner from '../../assets/plans/banner-full.png';
import vetBanner from '../../assets/plans/banner-vet.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';

export const MySubscriptions = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: '#FFF' }}>
            <ScrollView style={{ width: "100%" }}>
                <Text style={styles.actual}>Plan Actual: <Text style={{ color: "#000" }}>Gratuito</Text></Text>
                <TouchableOpacity style={styles.card}>
                    <Image source={basicBanner} style={{ width: 350, height: 100 }} />
                    <View style={styles.whiteCard}>
                        <Text style={styles.features}> • Hasta 15 diagnósticos al mes</Text>
                        <Text style={[styles.price, { color: "#00A6B0" }]}>$8 USD/mes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <Image source={fullBanner} style={{ width: 350, height: 100 }} />
                    <View style={styles.whiteCard}>
                        <Text style={styles.features}> • Cantidad ilimitada de diagnósticos al mes</Text>
                        <Text style={[styles.price, { color: "#E2CC00" }]}>$15 USD/mes</Text>

                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.card, { marginBottom: 10 }]}>
                    <Image source={vetBanner} style={{ width: 350, height: 100 }} />
                    <View style={styles.whiteCard}>
                        <Text style={styles.features}> • Cantidad ilimitada de diagnósticos al mes al mes</Text>
                        <Text style={styles.features}> • Requiere de un mínimo de 3 cuentas de veterinario</Text>
                        <Text style={[styles.price, { color: "#B04DFF" }]}>$12 USD/mes</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    whiteCard: {
        width: 350,
        backgroundColor: '#FFF',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        padding: 15
    },
    price: {
        textAlign: 'center',
        fontFamily: 'PoppinsBold',
        fontSize: 25
    },
    features: {
        fontFamily: 'PoppinsRegular',
    },
    actual: {
        fontFamily: 'PoppinsBold',
        fontSize: 20,
        color: "#00A6B0",
        textAlign: 'center'
    },
    card: {
        elevation: 8,
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: '#FFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
})
