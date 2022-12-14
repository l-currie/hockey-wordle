import { useContext } from "react"
import React from 'react'
import {AppContext} from '../App'

function Letter({ letterPos, attemptValue }) {
    const { board } = useContext(AppContext) // now we have access to board using the context API
    const letter = board[attemptValue][letterPos]
    return (
        // Use the letters id=? (correct / almost / error / default) for color
        // use conditionals to figure out of correct (if the letter in same pos is same letter)
        // substring (i, i+1) to get the char in word, compare to letter, loop through word to see if matches 
        // error = default gray
        <div className='letter' id={"correct"}> {letter}</div>
    )
}

export default Letter