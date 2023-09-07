import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import { questions } from "./Questions";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from 'react';
import { ButtonVetLens } from "../common/ButtonVetLens";

export const Questionary = ({ navigation }) => {

    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [questionList, setQuestionList] = React.useState([]);
    const [embeddedQuestions, setEmbeddedQuestions] = React.useState({});
    const [shownAnswers, setShownAnswers] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [shownEmbeddedQuestionIdx, setShownEmbeddedQuestionIdx] = React.useState(0);

    const handleQuestionSelection = (selectedQuestion) => {
        setShownAnswers(questionList[selectedQuestion][shownEmbeddedQuestionIdx].answers);
        setSelectedQuestion(selectedQuestion);
    }

    const handleAnswer = (index, answer) => {
        if (shownEmbeddedQuestionIdx + 1 === questionList[selectedQuestion].length ) {
            setShownEmbeddedQuestionIdx(0);
            setSelectedQuestion(selectedQuestion + 1);
        }
        else {
            if (answer.answer === questionList[selectedQuestion][shownEmbeddedQuestionIdx + 1].associatedAnswer) {
                setShownEmbeddedQuestionIdx(shownEmbeddedQuestionIdx + 1);
            } else {
                setShownEmbeddedQuestionIdx(0);
                setSelectedQuestion(selectedQuestion + 1);
            }
        }
    }

    function extractEmbeddedQuestions(quest, parentAnswer = null) {
        const result = [];

        if (quest.question) {
            result.push({
                embedded_question: quest.question,
                help: quest.help,
                associatedAnswer: parentAnswer,
                answers: quest.answers
            });
        }

        if (quest.answers && quest.answers.length > 0) {
            quest.answers.forEach(answer => {
                if (answer.embedded_question) {
                    result.push(...extractEmbeddedQuestions(answer.embedded_question, answer.answer));
                }
            });
        }

        return result;
    }


    React.useEffect(() => {
        const qlist = []
        for (q of questions) {
            qlist.push(extractEmbeddedQuestions(q));
        }
        console.log(qlist[0]);
        setQuestionList(qlist);
        setShownAnswers(qlist[selectedQuestion][shownEmbeddedQuestionIdx].answers);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.questionsContainer} horizontal showsHorizontalScrollIndicator={false}>
                    {questions.map((question, index) => {
                        if (index + 1 !== questions.length) {
                            return (<TouchableOpacity style={selectedQuestion === index ? styles.selectedQuestionButton : styles.questionButton} onPress={() => handleQuestionSelection(index)} key={index}>
                                <Text style={selectedQuestion === index ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        } else {
                            return (<TouchableOpacity style={selectedQuestion === index ? [styles.selectedQuestionButton, { marginRight: 15 }] : [styles.questionButton, { marginRight: 15 }]} onPress={() => handleQuestionSelection(index)} key={index}>
                                <Text style={selectedQuestion === index ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        }
                    })}
                </ScrollView>
            </View>
            {questionList &&  questionList.length > 0 && <View style={{ flex: 5, backgroundColor: "#FFF", flexDirection: "column" }}>
                <View>
                    <Text style={styles.questionTitle}>Pregunta {selectedQuestion + 1}{shownEmbeddedQuestionIdx > 0 ? `.${shownEmbeddedQuestionIdx}` : ""}</Text>
                    <Text style={styles.question}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"]}</Text>
                    {questions[selectedQuestion].help && <Text style={styles.questionHelp}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx].help}</Text>}
                </View>
                <View>
                    {shownAnswers.map((answer, index) => {
                        return (
                            <ButtonVetLens callback={() => handleAnswer(index, answer)} text={answer.answer} filled={false} style={styles.answers} />
                        )
                    })}
                </View>

            </View>}
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
    },
    questionTitle: {
        fontFamily: "PoppinsBold",
        color: "#00767D",
        fontSize: 20,
        textAlign: 'center'
    },
    question: {
        fontFamily: "PoppinsRegular",
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 30,
        marginBottom: 15
    },
    answers: {
        marginHorizontal: 50,
        marginTop: 10
    },
    questionHelp: {
        fontFamily: "PoppinsRegular",
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 30,
        marginBottom: 20
    }
})