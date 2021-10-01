import React, { useState, useEffect, useRef } from 'react'

import { 
    laugh, 
    applause, 
    finalAnswer 
 } from './sounds.js'
//styles
import './styles/questions.css'
function QuestionsPage({ bgSound, onFinishQuiz, questions }) {

    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ correct, setCorrect ] = useState(0)
    const [ explanation, setExplanation ] = useState(false)
    const [ wrong, setWrong ] = useState(false)

    //sound effects
    const cheers = useRef(new Audio(applause.url))
    const laughs = useRef(new Audio(laugh.url))
    const finalAns = useRef(new Audio(finalAnswer.url))
    const bgSounds = useRef(new Audio(bgSound))
    bgSounds.current.loop = true

    const isFinalAnswer = () => {
        bgSounds.current.pause()
        finalAns.current.load()
        finalAns.current.play()
    }

    const onNext = ans => {
        finalAns.current.pause()
        if(ans){
            setCorrect(correct + 1)
           bgSounds.current.pause()
            cheers.current.play()
        } else {
            setWrong(true)
            bgSounds.current.pause()
            laughs.current.play()
        }
        setExplanation(true)

        //questionLength - 1 to start index 0 
        if(currentQuestion < questions.length-1){
           setTimeout(() => {
                setWrong(false)
                setExplanation(false)
                setCurrentQuestion(currentQuestion + 1)
            }, 5000);
        } else {
            bgSounds.current.pause()
            setTimeout(() => {
                
                let corrects = correct + (ans ? 1 : 0);
                onFinishQuiz(corrects) // + ans for the last element if correct
                //console.log(corrects)
            }, 6000);
        }
    }

    useEffect(() => {
        bgSounds.current.load() 
        bgSounds.current.play()
     }, [currentQuestion])


    return (
        <div className ="card card-question" style = {{animation: wrong ? 'animateError .3s infinite alternate' : ''}}>
            <h3>Question No. {currentQuestion + 1} out of {questions.length}</h3>
        {
            explanation ?
        <div className ="result-box">
            <h4>{wrong ? 'Wrong!' : 'Correct!'}</h4>
            <p>{questions[currentQuestion].explanation}</p>
            Please wait...
        </div>
        :
        <div className ="question-box">
            <h4>{questions[currentQuestion].question}</h4>
            <div className ="answers-holder">
            {
                questions[currentQuestion].answers.map((answers) =>{
                    return (
                        <button 
                            key = {Math.random()} 
                            className ="button-answers" 
                            onClick = {isFinalAnswer}
                            onDoubleClick = {() => onNext(answers.isCorrect)}>
                            {answers.answer}
                        </button>
                    )
                })
            }
            </div>
        </div>
        }
        </div>
    )
} 

export default QuestionsPage
