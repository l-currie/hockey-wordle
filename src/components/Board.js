import React from 'react'
import { AppContext } from '../App'
import Letter from './Letter'
import { useContext } from 'react'

class Board extends React.Component {
    render() {
        const board = this.props.board
        console.log(board)
        return <div className='board'>
            {board.map((row, i) => {
                return <div className='row'>
                    {row.map((_, j) => {
                        return <Letter letterPos={j} attemptValue={i} />
                    })}
                </div>
            })}
        </div>
    }
}

export default Board