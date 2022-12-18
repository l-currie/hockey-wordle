import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext } from 'react';
import { useState } from 'react';
import { boardDefault, playerNames } from './Words';
import Modal from './components/Modal';
import axios from 'axios';
import Axios from 'axios';
import TeamSelect from './components/TeamSelect';

export const AppContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false)


  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 })
  const [openModal, setOpenModal] = useState(false)
  const [team, setTeam] = useState()
  const [teamsData, setTeamsData] = useState()
  const [teamRoster, setTeamRoster] =  useState()

  const [modalText, setModalText] = useState({ title: "", body: "" })
  var tempCorrectWord = playerNames[Math.floor(Math.random() * playerNames.length)]
  const [correctWord, setCorrectWord] = useState(tempCorrectWord)

  const getInitialBoard = () => {
    var arr = []
    for (let i = 0; i < 6; i++) {
      var rowArr = []
      for (let i = 0; i < tempCorrectWord.length; i++) {
        rowArr.push("")
      }
      arr.push(rowArr)
    }
    return arr
  }

  const [board, setBoard] = useState(getInitialBoard());

  const selectLetter = (val) => {
    console.log('selecting letter')
    if (currAttempt.letterPos > correctWord.length - 1) return;
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
    console.log(currAttempt.attempt)
    if (attemptCorrect()) return handleWin()
    else if (currAttempt.attempt === 5) return handleLoss()
    if (currAttempt.letterPos !== (correctWord.length)) return
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
  }

  const handleLoss = () => {
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
    setOpenModal(true)
  }

  const handleWin = () => {
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
    setModalText({ title: "You Win!", body: "Congratulations! Guesses needed: " + (currAttempt.attempt + 1) })
    setOpenModal(true)
  }

  const attemptCorrect = () => {
    for (let i = 0; i < correctWord.length; i++) {
      if (correctWord.substring(i, i + 1) !== board[currAttempt.attempt][i]) return false
    }
    //if we make it through the string and no letters are wrong, then previous guess should be correct
    return true
  }

  const closeModal = () => {
    tempCorrectWord = playerNames[Math.floor(Math.random() * playerNames.length)]
    setCorrectWord(prevWord => (tempCorrectWord))
    setCurrAttempt({ attempt: 0, letterPos: 0 })
    setOpenModal(false)
    setBoard(getInitialBoard())
  }

  const selectTeam = () => {
    // setIsLoading(true)
    var index = document.getElementById('teamsDropdown').value
    var id = 0
    Axios.get('https://statsapi.web.nhl.com/api/v1/teams')
      .then(response => {
        console.log(response.data.teams)
        setTeamsData(response.data.teams)
        setIsLoading(false)
        id = response.data.teams[index].id
        console.log(id)
        Axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + id)
          .then(response => {
            console.log('team')
            console.log(response.data.teams[0])
            setTeam(response.data.teams[0])
            setIsLoading(false)
          })
      })

  }

  if (isLoading) return <div>hi</div>


  return (
    <div className="App">
      <nav>
        <h1> Hockey Wordle </h1>
      </nav>
      {/* context API.  Everything in this provider tag gets access to the states
      we pass since they are under the provider*/}

      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, selectLetter, enterKey, deleteLetter, correctWord, teamsData, setTeamsData, selectTeam }}>
        <TeamSelect />
        <div className='temp'>
          <div className='game'>
            {openModal && <Modal closeModal={closeModal} text={modalText} />}
            <Board board={board} />
            <Keyboard />
          </div>
        </div>
      </AppContext.Provider>
    </div>

  );
}

export default App;
