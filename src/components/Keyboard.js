import React from 'react'
import Key from './Key'
import { useCallback } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

function Keyboard() {
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]
    const { selectLetter, enterKey, deleteLetter } = useContext(AppContext) // access from useContext API\

    const handleKeyboard = useCallback((e) => {
        if(e.key === "Enter") {
            enterKey()
        } else if (e.key === "Backspace" || e.key === "Delete") {
            deleteLetter()
        } else {
            if (e.keyCode >= 65 && e.keyCode <= 95) {
                selectLetter(String.fromCharCode(e.keyCode))
            }
        }
    })

    useEffect(() => {
        document.addEventListener('keydown', handleKeyboard)

        return () => {
            document.removeEventListener('keydown', handleKeyboard)
        }
    }, [handleKeyboard])

    return (
        <div className='keyboard'>
            <div className='line1'>{
                keys1.map((key) => {
                    return <Key val={key} />
                })
            }</div>
            <div className='line2'>{
                keys2.map((key) => {
                    return <Key val={key} />
                })
            }</div>
            <div className='line3'>
                <Key val={"Enter"} big/>
                {
                    keys3.map((key) => {
                        return <Key val={key} />
                    })
                }
                <Key val={"Delete"} big />
            </div>
        </div>
    )
}

export default Keyboard