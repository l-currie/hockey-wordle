import { useContext } from "react"
import {AppContext} from '../App'
import React from 'react'


function Letter({ letterPos, attemptValue }) {
    const { board, correctWord, currAttempt } = useContext(AppContext) // now we have access to board using the context API
    const letter = board[attemptValue][letterPos]

    const isCorrect = () => {
        return letter === correctWord.substring(letterPos, letterPos+1) ? true : false
    }
    const isContained = () => {
        var numLeftInWord = 0
        for(let i = 0; i < correctWord.length; i++){
            if (correctWord.substring(i, i+1).toUpperCase() === letter.toUpperCase()) numLeftInWord++
        }
        for (let j = 0; j < correctWord.length; j++) {
            if (board[attemptValue][j] === letter.toUpperCase() & (correctWord.substring(j,j+1) === letter.toUpperCase())){
                numLeftInWord--
            }
        }

        return numLeftInWord > 0 ? true : false
    }

    const getId = () => {
        if (board[attemptValue][letterPos] === '') return 
        if (isCorrect()) return "correct"
        else if (isContained()) return "contain"
        else return "error"
    }
    return (
        <div className='letter' id={attemptValue < currAttempt.attempt ? getId() : "" }> {letter}</div>
    )
}

export default Letter