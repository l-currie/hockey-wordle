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
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord.substring(i, i+1) === letter) return true
        }
        return false
    }

    const getId = () => {
        if (board[attemptValue][letterPos] == '') return 
        if (isCorrect()) return "correct"
        else if (isContained()) return "contain"
        else return "error"
    }
    return (
        // Use the letters id=? (correct / almost / error / default) for color
        // use conditionals to figure out of correct (if the letter in same pos is same letter)
        // substring (i, i+1) to get the char in word, compare to letter, loop through word to see if matches 
        // error = default gray
        <div className='letter' id={attemptValue < currAttempt.attempt ? getId() : "" }> {letter}</div>
    )
}

export default Letter