import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { Link } from '@react-navigation/native';

export const WhiteButtonCard = ({ containerStyle, title, subtext, callback, image }) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} onPress={callback}>
            <View>
                <Text style={styles.title}>{title}</Text>
                {subtext && <Text style={styles.subtext}>{subtext}</Text>}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {image && <Image source={{uri: image}} style={{height: 60, width: 60, marginRight: 30, borderRadius: 5}}/>}
                <FontAwesome name="chevron-right" size={30} color="#00767D" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 370,
        height: 80,
        backgroundColor: '#FDFFFF',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 8,
        marginTop: 10
    },
    subtext: {
        fontFamily: 'PoppinsBold',
        fontSize: 16,
        color: '#000'
    },
    title: {
        fontFamily: 'PoppinsBold',
        color: '#00767D',
        fontSize: 16,
    }
})