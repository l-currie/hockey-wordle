import React from 'react'
import { useContext } from 'react'
import App, { AppContext } from '../App'

function Key({ val, big }) {
    const { selectLetter, enterKey, deleteLetter } = useContext(AppContext) // access from useContext API

    const processKey = () => {
        if (val === "Enter") {
            enterKey()
        } else if (val === "Delete") {
            deleteLetter()
        } else {
            selectLetter(val)
        }
    }
    return (
        <div className='key' id={big && "big"} onClick={processKey}>{val}</div>
    )
}

export default Key