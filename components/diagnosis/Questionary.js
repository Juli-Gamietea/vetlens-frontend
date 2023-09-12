import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as React from 'react';
import { ButtonVetLens } from "../common/ButtonVetLens";
import { NotificationModal } from "../common/NotificationModal";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import { FontAwesome5 } from '@expo/vector-icons';
import { callBackendAPI } from '../../utils/CommonFunctions';

export const Questionary = ({ navigation }) => {

    const [selectedQuestion, setSelectedQuestion] = React.useState(0);
    const [questionList, setQuestionList] = React.useState([]);
    const [shownAnswers, setShownAnswers] = React.useState([]);
    const [answers, setAnswers] = React.useState([]);
    const [answeredQuestions, setAnsweredQuestions] = React.useState([]);
    const [shownEmbeddedQuestionIdx, setShownEmbeddedQuestionIdx] = React.useState(0);
    const [notification, setNotification] = React.useState(false);
    const [openDatePicker, setOpenDatePicker] = React.useState(false);


    const startDate = getFormatedDate(
        "01/01/2000", "DD-MM-YYYY"
    );


    navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => handleFinalize()}>
                <Text style={{ fontFamily: "PoppinsRegular", fontSize: 15 }}>Finalizar</Text>
            </TouchableOpacity>
        )
    })

    const [selectedDate, setSelectedDate] = React.useState("Fecha");
    const [initialDate, setInitialDate] = React.useState("12/12/2023");
    const [isDateValid, setIsDateValid] = React.useState(true)

    function handleChangeInitialDate(propDate) {
        setInitialDate(propDate);
    }

    const handleOnPressCloseDatePicker = () => {
        if (openDatePicker) {
            handleDateAnswer(selectedDate);
        }
        setOpenDatePicker(!openDatePicker);
    };

    const changeDate = (date) => {
        setIsDateValid(true)
        const splitDate = date.split("/");
        const parsedDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

        setSelectedDate(parsedDate);

    }


    const handleQuestionSelection = (selectedQuestion) => {
        setShownEmbeddedQuestionIdx(0);
        setShownAnswers(questionList[selectedQuestion][0].answers);
        setSelectedQuestion(selectedQuestion);
    }

    const handleMiniButtonPress = (index) => {
        setShownEmbeddedQuestionIdx(index);
        setShownAnswers(questionList[selectedQuestion][index].answers);
    }

    const showNotification = () => {
        setNotification(true);
        setTimeout(() => {
            setNotification(false);
        }, 5000);

    }

    const handleAnswer = (index, answer) => {

        const currentAnswer = getCurrentAnswer();

        const newAnswer = getNewAnswer(answer);

        checkIfQuestionIsComplete(newAnswer);

        fillStructure(currentAnswer, newAnswer, shownEmbeddedQuestionIdx);

        updateAnswers(currentAnswer);

        const allQuestionsAnswered = isQuestionaryComplete();

        if (selectedQuestion + 1 !== questionList.length && !allQuestionsAnswered) {
            if (shownEmbeddedQuestionIdx + 1 === questionList[selectedQuestion].length) {
                setShownEmbeddedQuestionIdx(0);
                setShownAnswers(questionList[selectedQuestion + 1][0].answers);
                setSelectedQuestion(selectedQuestion + 1);
            }
            else {
                if (answer["embedded_question"] !== null) {
                    for (let i = index; i < questionList[selectedQuestion].length; i++) {

                        if (answer["embedded_question"].question === questionList[selectedQuestion][i]["embedded_question"] &&
                            answer.answer === questionList[selectedQuestion][i].associatedAnswer) {

                            markEmbeddedQuestionAsShown(i);
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

            for (let i = 0; i < answeredQuestions.length; i++) {
                if (!answeredQuestions[i]) {
                    setSelectedQuestion(i);
                    setShownEmbeddedQuestionIdx(0);
                    setShownAnswers(questionList[i][0].answers)
                    return;
                }
            }

        }

    }

    const handleMultiAnswer = (index, answer, isSelected) => {

        const currentAnswer = getCurrentAnswer();

        if (!isSelected) {

            const newAnswer = getNewAnswer(answer);

            checkIfQuestionIsComplete(newAnswer);

            fillMultiStructure(currentAnswer, newAnswer, shownEmbeddedQuestionIdx);

        } else {

            deleteSelectedOption(currentAnswer, answer.answer, shownEmbeddedQuestionIdx);

            if (currentAnswer.answers.length === 1) {
                const answeredQuestionsCopy = [...answeredQuestions];
                answeredQuestionsCopy[selectedQuestion] = false;
                setAnsweredQuestions(answeredQuestionsCopy);
            }
            setShownAnswers([...shownAnswers])

        }

        updateAnswers(currentAnswer);
    }

    const handleDateAnswer = (date) => {

        const currentAnswer = getCurrentAnswer();

        const newAnswer = {
            question: questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"],
            answer: date,
            isLast: questionList[selectedQuestion][shownEmbeddedQuestionIdx].answers[0]["embedded_question"] ? false : true
        }


        checkIfQuestionIsComplete(newAnswer);

        fillStructure(currentAnswer, newAnswer, shownEmbeddedQuestionIdx);

        updateAnswers(currentAnswer);

    }


    const getNewAnswer = (answer) => {
        return {
            question: questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"],
            answer: answer.answer,
            isLast: answer["embedded_question"] ? false : true
        }
    }

    const getCurrentAnswer = () => {
        let currentAnswer = answers[selectedQuestion];

        if (Object.keys(currentAnswer).length === 0) {
            currentAnswer = createEmptyStructure(questionList[selectedQuestion].length)
        }

        return currentAnswer;
    }

    const checkIfQuestionIsComplete = (answer) => {
        if (answer.isLast) {
            const answeredQuestionsCopy = [...answeredQuestions];
            answeredQuestionsCopy[selectedQuestion] = true;
            setAnsweredQuestions(answeredQuestionsCopy);
        }
    }

    const updateAnswers = (answer) => {

        const updatedAnswers = answers;
        updatedAnswers[selectedQuestion] = answer;
        setAnswers(updatedAnswers);
    }

    const isQuestionaryComplete = () => {

        if (answeredQuestions.length > 0) {
            for (qa of answeredQuestions) {
                if (!qa) {
                    return false
                }
            }

            return true;
        }

        return false;
    }

    const markEmbeddedQuestionAsShown = (index) => {
        const questionListCopy = [...questionList];
        questionListCopy[selectedQuestion][index].shown = true;
        setQuestionList(questionListCopy);
    }

    function extractEmbeddedQuestions(quest, parentAnswer = null) {
        const result = [];

        if (quest.question) {
            result.push({
                embedded_question: quest.question,
                help: quest.help,
                type: quest.type,
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

            obj.question = data.question;
            obj.answers[0].answer = data.answer;
            return;
        }

        if (data.answer) {
            fillStructure(obj.answers[0].embedded_question, data, currentLevel - 1);
        }
    }

    const fillMultiStructure = (obj, data, currentLevel) => {
        if (currentLevel === 0) {
            obj.question = data.question;
            obj.answers.push({ answer: data.answer });

            return;
        }

        if (data.answer) {
            fillStructure(obj.answers[0].embedded_question, data, currentLevel - 1);
        }
    }

    const questionIsAnswered = (obj, level, targetAnswer, isMulti = false) => {

        if (!isMulti) {

            if (level === 0) {
                return obj.answers[0].answer === targetAnswer;
            }

            if (obj["answers"][0]["embedded_question"]) {
                return questionIsAnswered(obj["answers"][0]["embedded_question"], level - 1, targetAnswer);
            }

            return false;

        } else {

            if (level === 0) {

                for (ans of obj.answers) {

                    if (ans.answer === targetAnswer) {
                        return true;
                    }
                }

                return false;
            }

            if (obj["answers"][0]["embedded_question"]) {
                return questionIsAnswered(obj["answers"][0]["embedded_question"], level - 1, targetAnswer);
            }

            return false;
        }
    }

    const deleteSelectedOption = (obj, targetAnswer, currentLevel) => {
        if (currentLevel === 0) {

            for (let i = 0; i < obj.answers.length; i++) {
                if (obj.answers[i].answer === targetAnswer) {
                    obj.answers.splice(i, 1);
                }
            }
            return;
        }

        if (data.answer) {
            fillStructure(obj.answers[0].embedded_question, targetAnswer, currentLevel - 1);
        }
    }

    const handleFinalize = () => {

        if (isQuestionaryComplete()) {
            navigation.navigate("Dashboard");
        }
        else {
            showNotification();
        }
    }

    React.useEffect(() => {
        const getQuestions = async () => {

            try {
                const qlist = []
                const auxList = []

                const res = await callBackendAPI("/diagnosis", 'GET');

                for (q of res.data) {
                    qlist.push(extractEmbeddedQuestions(q));
                    auxList.push(false);
                }
                for (q of qlist) {
                    q[0].shown = true;
                }


                setQuestionList(qlist);
                setAnsweredQuestions(auxList);
                setShownAnswers(qlist[selectedQuestion][shownEmbeddedQuestionIdx].answers);

                const auxArray = [];
                for (let i = 0; i < qlist.length; i++) {
                    auxArray.push({});
                }

                setAnswers(auxArray);

                
            }
            catch (error) {
                console.log(error.response);
            }
        }
        getQuestions();

    }, [])


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
            <NotificationModal
                visible={notification}
                onRequestClose={() => setNotification(!notification)}
                onPress={() => setNotification(!notification)}
                message={"Aún tiene preguntas pendientes por responder. Por favor, respondalas para poder continuar"}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={openDatePicker}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode="calendar"
                            minimumDate={startDate}
                            selected={initialDate}
                            onDateChanged={handleChangeInitialDate}
                            onSelectedChange={(date) => changeDate(date)}
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
                        <TouchableOpacity onPress={handleOnPressCloseDatePicker}>
                            <Text style={{ color: "white" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <View style={{ flex: 1 }}>
                <ScrollView style={styles.questionsContainer} horizontal showsHorizontalScrollIndicator={false}>
                    {questionList.length > 0 && questionList.map((question, index) => {
                        if (index + 1 !== questionList.length) {
                            return (<TouchableOpacity key={index} style={((selectedQuestion === index) && answeredQuestions[index]) ? styles.selectedQuestionButton : (selectedQuestion === index) ? styles.selectedQuestionButton : answeredQuestions[index] ? styles.completedQuestion : styles.questionButton} onPress={() => handleQuestionSelection(index)}>
                                <Text style={(selectedQuestion === index || answeredQuestions[index]) ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        } else {
                            return (<TouchableOpacity key={index} style={((selectedQuestion === index) && answeredQuestions[index]) ? styles.completedQuestion : (selectedQuestion === index) ? styles.selectedQuestionButton : answeredQuestions[index] ? styles.completedQuestion : [styles.questionButton, { marginRight: 15 }]} onPress={() => handleQuestionSelection(index)}>
                                <Text style={(selectedQuestion === index || answeredQuestions[index]) ? styles.selectedQuestionText : styles.questionText}>Preg. {index + 1}</Text>
                            </TouchableOpacity>)
                        }
                    })}
                </ScrollView>
            </View>
            {questionList && questionList.length > 0 && answers.length > 0 &&
                <View style={{ flex: 5, backgroundColor: "#FFF", flexDirection: "column", justifyContent: 'space-around' }}>
                    <View>
                        <Text style={styles.questionTitle}>Pregunta {selectedQuestion + 1}{shownEmbeddedQuestionIdx > 0 ? `.${shownEmbeddedQuestionIdx}` : ""}</Text>
                        <Text style={styles.question}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx]["embedded_question"]}</Text>
                        {questionList[selectedQuestion].help && <Text style={styles.questionHelp}>{questionList[selectedQuestion][shownEmbeddedQuestionIdx].help}</Text>}
                    </View>
                    <View>
                        {shownAnswers.map((answer, index) => {

                            let filled = false;

                            switch (questionList[selectedQuestion][shownEmbeddedQuestionIdx].type) {
                                case "single":
                                    if (Object.keys(answers[selectedQuestion]).length > 0) {
                                        filled = questionIsAnswered(answers[selectedQuestion], shownEmbeddedQuestionIdx, answer.answer)
                                    }
                                    return (
                                        <ButtonVetLens key={index} callback={() => handleAnswer(index, answer)} text={answer.answer} filled={filled} style={styles.answers} />
                                    )
                                case "multi":
                                    if (Object.keys(answers[selectedQuestion]).length > 0) {
                                        filled = questionIsAnswered(answers[selectedQuestion], shownEmbeddedQuestionIdx, answer.answer, true)
                                    }
                                    return (
                                        <ButtonVetLens key={index} callback={() => { handleMultiAnswer(index, answer, filled) }} text={answer.answer} filled={filled} style={styles.answers} />
                                    )
                                case "date":
                                    return (
                                        <View key={index} style={styles.formContainerItemDate}>
                                            <TouchableOpacity
                                                style={isDateValid ? styles.dateInput : styles.dateInputInvalid}
                                                onPress={handleOnPressCloseDatePicker}
                                            >
                                                <FontAwesome5 name="calendar-alt" size={20} color={isDateValid ? "#00A6B0" : "#FF6D6D"} />
                                                <Text> {selectedDate} </Text>
                                            </TouchableOpacity>
                                            {!isDateValid && <Text style={styles.error}>Fecha inválida</Text>}
                                        </View>
                                    )


                            }

                        })}
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30, height: 15 }}>
                        {questionList[selectedQuestion].length > 1 &&
                            <>
                                {
                                    questionList[selectedQuestion].map((elem, index) => {
                                        if (elem.shown) {
                                            if (shownEmbeddedQuestionIdx === index) {
                                                return <TouchableOpacity key={index} onPress={() => handleMiniButtonPress(index)} style={[styles.miniButtons, { backgroundColor: "#00A6B0", borderWidth: 0 }]} />
                                            } else {
                                                return <TouchableOpacity key={index} onPress={() => handleMiniButtonPress(index)} style={styles.miniButtons} />
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
    completedQuestion: {
        backgroundColor: "#00A6B0",
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
    },
    formContainerItemDate: {
        width: 200,
        height: 60,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginVertical: 20,
        alignSelf: 'center'
    },
    dateInputText: {
        fontFamily: "PoppinsBold",
        fontSize: 15,
        color: '#00767D'
    },
    dateInput: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#F1F0F0",
        borderRadius: 10,
        borderColor: "#00A6B0",
        borderWidth: 2,
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        padding: 15,
        textAlign: "left"
    },
    dateInputInvalid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#F1F0F0",
        borderRadius: 10,
        borderColor: "#FF6D6D",
        borderWidth: 2,
        fontFamily: 'PoppinsRegular',
        fontSize: 14,
        padding: 15,
        textAlign: "left"
    },
    error: {
        color: "#FF6D6D",
        fontFamily: 'PoppinsSemiBold',
        marginLeft: 10,
        fontSize: 14
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

})