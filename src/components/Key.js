import React from 'react'
import { useContext } from 'react'
import App, { AppContext } from '../App'

function Key({ val, big }) {
    const { selectLetter, enterKey, deleteLetter, board, currAttempt, correctWord } = useContext(AppContext) // access from useContext API

    const processKey = () => {
        if (val === "Enter") {
            enterKey()
        } else if (val === "Delete") {
            deleteLetter()
        } else {
            selectLetter(val)
        }
    }

    var keyClass = ''

    const getClass = () => {
        for (let i = 0; i < currAttempt.attempt; i++) {
            for (let j = 0; j < correctWord.length; j++) {

                // console.log('i = ' + i + ' j = ' + j + ' - board[i][j] = ' + board[i][j])
                // console.log(correctWord.substring(j, j+1))
                if ((board[i][j] === val.toUpperCase()) & correctWord.substring(j, j + 1) === val.toUpperCase()) {
                    keyClass = 'keyCorrect'
                    // console.log(val + ' class = keyCorrect')
                    return 'keyCorrect'
                } if (board[i][j] === val.toUpperCase() & !correctWord.includes(val.toUpperCase())) {
                    keyClass = 'keyNotContain'
                    // console.log(val + ' class = keyNotContain')
                    return 'keyNotContain'
                } 
            }
        }
        for (let i = 0; i < currAttempt.attempt; i++){
            if (board[i].includes(val)){
                // console.log(val + ' keyclass = keyContain')
                return 'keyContain'
            } 
        }
        return 'key'
    }
        

    if (keyClass !== 'keyCorrect') keyClass = getClass()

    return (

        <div className={keyClass} id={big && "big"} onClick={processKey}>{val}
        </div>
    )
}

export default Key