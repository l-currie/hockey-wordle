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
            e.preventDefault()
            enterKey()
        } else if (e.key === "Backspace" || e.key === "Delete") {
            deleteLetter()
        } else {
            if (e.keyCode >= 65 && e.keyCode <= 90) {
                selectLetter(String.fromCharCode(e.keyCode))
                //handle '-' since some players have a '-' in their lastname
            } else if (e.keyCode === 189) {
                selectLetter('-')
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
        <div className='keyboard' >
            <div className='line1'>{
                keys1.map((key, i) => {
                    return <Key val={key} key={i+100} />
                })
            }</div>
            <div className='line2'>{
                keys2.map((key,i) => {
                    return <Key val={key} key={i+200}/>
                })
            }</div>
            <div className='line3'>
                <Key val={"Enter"} key={123123} big/>
                {
                    keys3.map((key,i) => {
                        return <Key val={key} key={i+300} />
                    })
                }
                <Key val={"Delete"} big key={5123}/>
            </div>
        </div>
    )
}

export default Keyboard