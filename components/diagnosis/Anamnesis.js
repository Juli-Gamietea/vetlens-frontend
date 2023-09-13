import { Text, View, Image, ScrollView, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { callBackendAPI } from '../../utils/CommonFunctions';
import { ButtonVetLens } from '../common/ButtonVetLens';
import * as React from 'react';


export const Anamnesis = ({ navigation, route }) => {

    const { diagnosisId } = route.params;
    const [answers, setAnswers] = React.useState(null);
    const [diagnosis, setDiagnosis] = React.useState(null);

    const parseDate = (date) => {
        const splitDate = date.split("-");
        return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;
    }

    function processQuestions(questions) {
        const result = [];

        for (const question of questions) {
            const answers = question.answers
                .map((answer) => answer.answer)
                .filter((answer) => answer !== null && answer.trim() !== '');

            const embeddedQuestions = question.answers
                .map((answer) => answer.embedded_question)
                .filter((embeddedQuestion) => embeddedQuestion !== null);

            const embeddedQAs = [];

            for (const embeddedQuestion of embeddedQuestions) {
                const embeddedAnswersArray = embeddedQuestion.answers
                    .map((answer) => answer.answer)
                    .filter((answer) => answer !== null && answer.trim() !== '');

                if (embeddedAnswersArray.length > 0) {
                    embeddedQAs.push({
                        question: embeddedQuestion.question,
                        answer: embeddedAnswersArray[0], // Take the first answer
                    });
                }
            }

            let mainAnswer = null;

            if (answers.length > 1) {
                mainAnswer = answers.join(', ');
            } else if (answers.length === 1) {
                mainAnswer = answers[0];
            }

            const questionData = {
                main_question: question.question,
                main_answer: mainAnswer,
                embedded_qa: embeddedQAs,
            };

            result.push(questionData);
        }

        return result;
    }




    React.useEffect(() => {
        const getDiagnosisAnswers = async () => {
            const resQA = await callBackendAPI(`/diagnosis/questions/${diagnosisId}`);
            const resDiagnosis = await callBackendAPI(`/diagnosis/${diagnosisId}`);
            if (resQA && resDiagnosis) {
                const qa = processQuestions(resQA.data.questions);
                qa.push({
                    main_question: "Imágen de la lesión",
                    uri: resDiagnosis.data.image_url,
                    embedded_qa: []
                });

                setAnswers(qa);
                resDiagnosis.data.date = parseDate(resDiagnosis.data.date);
                setDiagnosis(resDiagnosis.data);
            }
        }
        getDiagnosisAnswers();
    }, [])

    return (
        <SafeAreaView style={styles.frame}>
            {diagnosis && <Text style={styles.screenTitle}>Diagnóstico de:{'\n'} {diagnosis.dog.name} - {diagnosis.date} </Text>}
            {answers && <FlatList
                data={answers}
                renderItem={({ item }) => {
                    return <Item mainQuestion={item.main_question}
                        mainAnswer={item.main_answer}
                        embeddedQa={item.embedded_qa}
                        uri={item.uri} />
                }}
                keyExtractor={item => item.id}
                style={{ flex: 1, width: '100%' }}
            />}
            <ButtonVetLens text={"Salir"} filled callback={() => navigation.goBack()} style={{width: 370, marginVertical: 20}}/>
        </SafeAreaView>
    );
}

const Item = ({ mainQuestion, mainAnswer, embeddedQa, uri }) => {

    if (!uri) {
        return (
            <View style={styles.whiteCardView}>
                <Text style={styles.cardTitle}>{mainQuestion + '\n'}</Text>
                <Text style={styles.cardSubtext}>
                    <Text style={styles.cardSubtextTitle}>Respuesta: </Text>
                    {mainAnswer}
                </Text>
                {
                    embeddedQa.map((qa, index) => {
                        return <View key={index}>
                            <Text style={styles.cardSubtext}>
                                <Text style={styles.cardSubtextTitle}>Pregunta Relacionada: </Text>
                                {qa.question}
                            </Text>
                            <Text style={styles.cardSubtext}>
                                <Text style={styles.cardSubtextTitle}>Respuesta: </Text>
                                {qa.answer}
                            </Text>
                        </View>
                    })
                }
            </View>
        )
    } else {

        return <View style={styles.whiteCardView}>
                <Text style={styles.cardTitle}>{mainQuestion + '\n'}</Text>
                <Image source={{uri: uri}} style={{width: 300, height: 300, alignSelf: 'center', borderRadius: 5}}/>
            </View>
        
    }
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        backgroundColor: "#FFF",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    screenTitle: {
        fontFamily: 'PoppinsRegular',
        fontSize: 40,
        textAlign: 'center',
        color: "#00A6B0",
        marginBottom: 20
    },
    whiteCardView: {
        backgroundColor: "#FFF",
        elevation: 8,
        width: 390,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 5
    },
    cardTitle: {
        fontFamily: 'PoppinsBold',
        fontSize: 20,
        color: "#00767D",
    },
    cardSubtext: {
        fontSize: 17,
        fontFamily: "PoppinsBold",
    },
    cardSubtextTitle: {
        color: "#00767D",
    }
})