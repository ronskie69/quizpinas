import React, { useState, useEffect, useCallback } from 'react'
import { FacebookShareButton, FacebookIcon, TwitterIcon  } from 'react-share'
import useLocalStorage from './localstorage'
//components
import FirstPage from './FirstPage'
import QuestionsPage from './QuestionsPage'
import LastPage from './LastPage'
import { easy, medium, hard, insane } from './questions'
import {  
    easyBgSound, 
    mediumBgSound, 
    hardBgSound, 
    insaneBgSound } from './sounds.js'

function QuizApp() {

    const [page, setPage ] = useState(1);
    const [ questions, setQuestions ] = useState([])
    const [ questionType, setQuestionType ] =useState(null)
    const [ scores, setScores ] = useState(useLocalStorage());
    const [ corrects, setCorrects ] =useState(0)
    const [ bgSound, setBgSound ] = useState(null)

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
        setQuestionType("")
        setPage(1)
        setQuestions([])
    }

    const shareOnTwitter = () => {
        let tweet = "Nabaliw ako rito! Ang babaeng pinag-awayan nina Dr. Jose Rizal at Hen. Antonio Luna! Sana all! #QuizPinasChallenge #ChallengeAccepted #NewCraze http://quizpinas.surge.sh/ "
        document.getElementById("sharer-twitter")
        .setAttribute("href", `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`);
    }

    useEffect(() => {
        
        if(questionType === "easy"){
            setQuestions(shuffleQuestions(easy))
            setBgSound(easyBgSound.url)
            setPage(2)
        }

        if(questionType === "medium"){
            setQuestions(shuffleQuestions(medium))
            setBgSound(mediumBgSound.url)
            setPage(2)
        }

        if(questionType === "hard"){
            setQuestions(shuffleQuestions(hard))
            setBgSound(hardBgSound.url)
            setPage(2)
        }
        if(questionType === "insane"){
            setQuestions(shuffleQuestions(insane))
            setBgSound(insaneBgSound.url)
            setPage(2)
        }
       
    }, [questionType])

    useEffect(() => {
       localStorage.setItem("scores", JSON.stringify(scores))
    }, [scores])

    return (
        <div className ="container">
            {/* <marquee style = {{color: '#f4f5f6', fontSize: '14px', marginBottom: '10px'}}>Don't mind the grammar! XD</marquee> */}
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
                   bgSound = {bgSound}
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
            <p style = {{fontSize: '11px', marginTop: '0px', color: '#f4f5f6'}}>Double tap to confirm your answer.</p>
            <div style = {{display: 'flex'}}>
                <FacebookShareButton url = {"http://quizpinas.surge.sh/"} quote = {"Challenge Accepted! Nakaka-baliw at nakaka-adik HAHAHAHA!"} hashtag = "#ChallengeAccepted">
                    <FacebookIcon round={true} size={30} bgStyle={{fill: '#f4f5f6'}} iconFillColor={"#242428"}/>
                </FacebookShareButton>
                <a id = "sharer-twitter" target ="_blank" onClick={shareOnTwitter}>
                    <TwitterIcon size={30} round={true} bgStyle={{fill: '#f4f5f6'}} iconFillColor={"#242428"} />
                </a>
            </div>
        </div>
    )
}

export default QuizApp
