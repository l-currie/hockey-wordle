import './App.css';
import { useEffect } from 'react'
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext } from 'react';
import { useState } from 'react';
import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })

  const correctWord = "RIGHT"

  const selectLetter = (val) => {
    console.log('selecting letter')
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = val
    setBoard(newBoard)
    setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos + 1 })
  }

  const deleteLetter = () => {
    if (currAttempt.letterPos > 0) {
      const newBoard = [...board]
      newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
      setBoard(newBoard)
      setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos - 1 })
    }
  }

  const enterKey = () => {
    if (currAttempt.letterPos !== 5) return
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
  }
  return (
    <div className="App">
      <nav>
        <h1> Hockey Wordle </h1>
      </nav>
      {/* context API.  Everything in this provider tag gets access to the states
      we pass since they are under the provider*/}
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, selectLetter, enterKey, deleteLetter }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>

  );
}

export default App;
