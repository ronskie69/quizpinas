import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { FacebookShareButton, FacebookIcon  } from 'react-share'
import useLocalStorage from './localstorage'
//components
import FirstPage from './FirstPage'
import QuestionsPage from './QuestionsPage'
import LastPage from './LastPage'
import { easy, medium, hard, insane } from './questions'


function QuizApp() {

    const [page, setPage ] = useState(1);
    const [ questions, setQuestions ] = useState([])
    const [ questionType, setQuestionType ] =useState(null)
    const [ scores, setScores ] = useState(useLocalStorage());
    const [ corrects, setCorrects ] =useState(0)

    const shuffleQuestions = questions => {
        for(let i= questions.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        return questions;
    }

    const onSetQuestionType= useCallback((type) => {
        if(questions.length > 0) {
            setQuestions([])
            //setPage(1)
            return;
        }
        setQuestionType(type)
    }, [questionType])

    const onFinish = correct => {
        setPage(3)
        setCorrects(correct)

        if(questionType === "easy"){
            setScores(scores => ({...scores, easy: correct }))
        }
        if(questionType === "medium"){
            setScores(scores => ({...scores, medium: correct }))
        }
        if(questionType === "hard"){
            setScores(scores => ({...scores, hard: correct }))
        }
        if(questionType === "insane"){
            setScores(scores => ({...scores, insane: correct }))
        }
    }

    const retakeQuiz = () => {
        setQuestionType([])
        setPage(1)
        setQuestions([])
    }

    useEffect(() => {
        
        if(questionType === "easy"){
            setQuestions(shuffleQuestions(easy))
            setPage(2)
        }

        if(questionType === "medium"){
            setQuestions(shuffleQuestions(medium))
            setPage(2)
        }

        if(questionType === "hard"){
            setQuestions(shuffleQuestions(hard))
            setPage(2)
        }
        if(questionType === "insane"){
            setQuestions(shuffleQuestions(insane))
            setPage(2)
        }
       
    }, [questionType])

    useEffect(() => {
       localStorage.setItem("scores", JSON.stringify(scores))
    }, [scores])

    return (
        <div className ="container">
            {
                page === 1 &&
                <FirstPage 
                    easy = {scores.easy}
                    medium = {scores.medium}
                    hard = {scores.hard}
                    insane = {scores.insane}
                    questionType = {onSetQuestionType} />
            }
            {
                page === 2 &&
                <QuestionsPage 
                   questions = {questions}
                   onFinishQuiz = {onFinish} />
            }
            {
                page === 3 &&
                <LastPage 
                    length = {questions.length}
                    retake = {retakeQuiz}
                    totalScore = {corrects} 
                    questionType = {questionType} />
            }
            <FacebookShareButton url = {"http://quizpinas.surge.sh/"} quote = {"Please help me to answer the question!"} hashtag = "#QuizPinas">
                <FacebookIcon round={true} size={30} bgStyle={{fill: '#f4f5f6'}} iconFillColor={"#242428"}/>
            </FacebookShareButton>
        </div>
    )
}

export default QuizApp
