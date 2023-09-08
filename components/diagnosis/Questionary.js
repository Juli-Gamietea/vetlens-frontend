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
        setShownEmbeddedQuestionIdx(0);
        setShownAnswers(questionList[selectedQuestion][0].answers);
        setSelectedQuestion(selectedQuestion);
    }

    const handleMiniButtonPress = (index) => {
        setShownEmbeddedQuestionIdx(index);
        setShownAnswers(questionList[selectedQuestion][index].answers);
    }

    const handleAnswer = (index, answer) => {

        let currentAnswer = answers[selectedQuestion]; // objeto de la preg principal respondida

        if (Object.keys(currentAnswer).length === 0) {
            currentAnswer = createEmptyStructure(questionList[selectedQuestion].length)
        }


        const newAnswer = {
            question: questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"],
            answer: answer.answer,
        }

        fillStructure(currentAnswer, newAnswer, shownEmbeddedQuestionIdx);

        const updatedAnswers = answers;
        updatedAnswers[selectedQuestion] = currentAnswer;

        setAnswers(updatedAnswers);
        if (selectedQuestion + 1 !== questionList.length) {
            if (shownEmbeddedQuestionIdx + 1 === questionList[selectedQuestion].length) {
                setShownEmbeddedQuestionIdx(0);
                setShownAnswers(questionList[selectedQuestion + 1][0].answers);
                setSelectedQuestion(selectedQuestion + 1);
            }
            else {
                if (answer["embedded_question"] !== null) {
                    for (let i = index; i < questionList[selectedQuestion].length; i++) {
                        console.log("ans: " + JSON.stringify(answer["embedded_question"].question));
                        console.log("q: " + JSON.stringify(questionList[selectedQuestion][i]["embedded_question"]))
                        if (answer["embedded_question"].question === questionList[selectedQuestion][i]["embedded_question"] &&
                            answer.answer === questionList[selectedQuestion][i].associatedAnswer) {
                            const questionListCopy = [...questionList];
                            questionListCopy[selectedQuestion][i].shown = true;
                            setQuestionList(questionListCopy);
                            setShownAnswers(questionList[selectedQuestion][i].answers)
                            setShownEmbeddedQuestionIdx(i);

                            return;
                        }
                    }
                } else {

                    setShownEmbeddedQuestionIdx(0);
                    setShownAnswers(questionList[selectedQuestion + 1][0].answers);
                    setSelectedQuestion(selectedQuestion + 1);
                }

            }
        } else {
            for (let i = 0; i < answers.length; i++) {
                if (Object.keys(answers[i]).length === 0) {
                    setSelectedQuestion(i);
                    setShownEmbeddedQuestionIdx(0);
                    setShownAnswers(questionList[i][0].answers)
                    return;
                }
            }
            navigation.navigate("Dashboard");
        }
    }

    function extractEmbeddedQuestions(quest, parentAnswer = null) {
        const result = [];

        if (quest.question) {
            result.push({
                embedded_question: quest.question,
                help: quest.help,
                associatedAnswer: parentAnswer,
                answers: quest.answers,
                shown: false,
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

    const createEmptyStructure = (levels) => {
        if (levels <= 0) {
            return null;
        }

        return {
            question: "",
            answers: [
                {
                    answer: "",
                    embedded_question: createEmptyStructure(levels - 1)
                }
            ]
        };
    }

    const fillStructure = (obj, data, currentLevel) => {
        if (currentLevel === 0) {
            // Fill the data at the specified level
            obj.question = data.question;
            obj.answers[0].answer = data.answer;
            return;
        }

        if (data.answer) {
            fillStructure(obj.answers[0].embedded_question, data, currentLevel - 1);
        }
    }


    React.useEffect(() => {
        const qlist = []
        for (q of questions) {
            qlist.push(extractEmbeddedQuestions(q));
        }
        for (q of qlist) {
            q[0].shown = true;
        }
        setQuestionList(qlist);
        setShownAnswers(qlist[selectedQuestion][shownEmbeddedQuestionIdx].answers);

        const auxArray = [];
        for (let i = 0; i < qlist.length; i++) {
            auxArray.push({});
        }

        setAnswers(auxArray);
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
            {questionList && questionList.length > 0 &&
                <View style={{ flex: 5, backgroundColor: "#FFF", flexDirection: "column", justifyContent: 'space-around' }}>
                    <View>
                        <Text style={styles.questionTitle}>Pregunta {selectedQuestion + 1}{shownEmbeddedQuestionIdx > 0 ? `.${shownEmbeddedQuestionIdx}` : ""}</Text>
                        <Text style={styles.question}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"]}</Text>
                        {questionList[selectedQuestion].help && <Text style={styles.questionHelp}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx].help}</Text>}
                    </View>
                    <View>
                        {shownAnswers.map((answer, index) => {
                            return (
                                <ButtonVetLens key={index} callback={() => handleAnswer(index, answer)} text={answer.answer} filled={answer.selected} style={styles.answers} />
                            )
                        })}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, height: 15 }}>
                        {questionList[selectedQuestion].length > 1 &&
                            <>
                                {
                                    questionList[selectedQuestion].map((elem, index) => {
                                        if (elem.shown) {
                                            if (shownEmbeddedQuestionIdx === index) {
                                                return <TouchableOpacity onPress={() => handleMiniButtonPress(index)} style={[styles.miniButtons, { backgroundColor: "#00A6B0", borderWidth: 0 }]} />
                                            } else {
                                                return <TouchableOpacity onPress={() => handleMiniButtonPress(index)} style={styles.miniButtons} />
                                            }
                                        }
                                    })
                                }
                            </>
                        }
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
    },
    miniButtons: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: "#00A6B0",
        backgroundColor: "#FFF",
        borderRadius: 50,
        marginHorizontal: 3
    }
})