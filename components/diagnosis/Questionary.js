import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { questions } from "./Questions";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from 'react';

export const Questionary = ({ navigation }) => {

    const [selectedQuestion, setSelectedQuestion] = React.useState(0);

    const handleQuestionSelection = (selectedQuestion) => {
        setSelectedQuestion(selectedQuestion);
    }

    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#FFF"}}>
            <View style={{flex: 1}}>
                <ScrollView style={styles.questionsContainer} horizontal showsHorizontalScrollIndicator={false}>
                    {questions.map((question, index) => {
                        if (index + 1 !== questions.length) {
                            return (<TouchableOpacity style={selectedQuestion === index ? styles.selectedQuestionButton : styles.questionButton} onPress={() => handleQuestionSelection(index)} key={index}>
                                <Text style={selectedQuestion === index ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        } else {
                            return (<TouchableOpacity style={selectedQuestion === index ? [styles.selectedQuestionButton, {marginRight: 15}] : [styles.questionButton, {marginRight: 15}]} onPress={() => handleQuestionSelection(index)} key={index}>
                                <Text style={selectedQuestion === index ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        }
                    })}
                </ScrollView>
            </View>
            <View style={{backgroundColor: "#FFF"}}>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    questionsContainer: {
        flexDirection: 'row',
        backgroundColor: "#FFF"
    },
    questionButton: {
        backgroundColor: "#FFF",
        borderWidth: 2,
        borderColor: "#00A6B0",
        borderRadius: 20,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    selectedQuestionButton: {
        backgroundColor: "#005D63",
        borderRadius: 20,
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15,
    },
    questionText: {
        fontFamily: "PoppinsRegular",
        fontSize: 20,
        color: "#00A6B0"
    },
    selectedQuestionText: {
        fontFamily: "PoppinsBold",
        fontSize: 20,
        color: "#fff"
    }
})