import React from 'react'

function LastPage({totalScore, questionType, length, retake}) {
    return (
        <div class="card card-finished">
            <h1>Quiz Finished</h1>
            <h3>Difficulty: {questionType.charAt(0).toUpperCase() + questionType.substr(1)}</h3>
            <h3>Score:  {totalScore} / {length}</h3>
            <button className = "retake-btn" onClick = {retake}>Retake Quiz</button>
        </div>
    )
}

export default LastPage
