import './App.css';
import Board from './components/Board';
import Keyboard from './components/Keyboard';
import { createContext } from 'react';
import { useState, useEffect } from 'react';
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
    const [hintData, setHintData] = useState("")

    const [modalText, setModalText] = useState({ title: "", body: "" })
    const [correctWord, setCorrectWord] = useState(playerNames[Math.floor(Math.random() * playerNames.length)])

    function getInitialBoard() {
        var arr = []
        for (let i = 0; i < 6; i++) {
            var rowArr = []
            for (let i = 0; i < correctWord.length; i++) {
                rowArr.push("")
            }
            arr.push(rowArr)
        }
        return arr
    }

    const [board, setBoard] = useState([]);

    useEffect(() => {
        setBoard(getInitialBoard())
        setIsLoading(false)
    }, [correctWord])

    function selectLetter(val) {
        console.log('selecting letter')
        if (currAttempt.letterPos > correctWord.length - 1) return;
        const newBoard = [...board]
        newBoard[currAttempt.attempt][currAttempt.letterPos] = val
        setBoard(newBoard)
        setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos + 1 })
    }

    function deleteLetter() {
        if (currAttempt.letterPos > 0) {
            const newBoard = [...board]
            newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = ''
            setBoard(newBoard)
            setCurrAttempt({ attempt: currAttempt.attempt, letterPos: currAttempt.letterPos - 1 })
        }
    }

    function enterKey() {
        if (attemptCorrect()) return handleWin()
        else if (currAttempt.attempt === 5 & (currAttempt.letterPos === correctWord.length)) return handleLoss()
        if (currAttempt.letterPos !== (correctWord.length)) return undefined
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
        console.log(board)
    }

    function handleLoss() {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
        setModalText({ title: "You Lose!", body: "The correct name was: " + correctWord })
        setOpenModal(true)
    }

    function handleWin() {
        setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 })
        setModalText({ title: "You Win!", body: "Congratulations! Guesses needed: \n" + (currAttempt.attempt + 1) })
        setOpenModal(true)
    }

    function attemptCorrect() {
        for (let i = 0; i < correctWord.length; i++) {
            if (correctWord.substring(i, i + 1) !== board[currAttempt.attempt][i]) return false
        }
        //if we make it through the string and no letters are wrong, then previous guess should be correct
        return true
    }

    function closeModal() {
        selectTeam()
        setOpenModal(false)
    }

    function selectTeam() {
        var index = document.getElementById('teamsDropdown').value
        var id = teamsData[index].id
        Axios.get('https://statsapi.web.nhl.com/api/v1/teams/' + id + '/roster')
            .then(response => {
                console.log('team roster')
                var len = response.data.roster.length
                console.log(len)
                var playerIndex = Math.floor(Math.random() * len)
                var newCorrect = String((String(response.data.roster[playerIndex].person.fullName)).split(' ').slice(-1)).toUpperCase()
                // Ensure we get a new player
                while (newCorrect === correctWord) {
                    playerIndex = Math.floor(Math.random() * len)
                    newCorrect = String((String(response.data.roster[playerIndex].person.fullName)).split(' ').slice(-1)).toUpperCase()
                }
                hint = "Hint: the players position is: "
                var hint = hint + String(response.data.roster[playerIndex].position.type)
                setHintData(hint)
                setCurrAttempt({ attempt: 0, letterPos: 0 })
                setCorrectWord(newCorrect)
            })
    }

    if (isLoading) return <board></board>

    if (!isLoading) return (
        <div className="App">
            <nav>
                <h1 className='title'> Hockey Wordle </h1>
            </nav>
            {/* context API.  Everything in this provider tag gets access to the states
      we pass since they are under the provider*/}

            <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, selectLetter, enterKey, deleteLetter, correctWord, teamsData, setTeamsData, selectTeam }}>
                
            <TeamSelect />
                <div className='temp'>
                    <div className='game'>
                        {(currAttempt.attempt > 2) && <div>{hintData}</div>}
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