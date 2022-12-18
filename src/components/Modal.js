import React from 'react'
import '../components/Modal.css'

function Modal({ closeModal, text }) {
    return (
            <div className='modalBackground'>
                <div className='modalContainer'>
                    <div className='title'>
                        <h1> {text.title} </h1>
                    </div>
                    <div className='body'>
                        <p> {text.body} </p>
                    </div>
                    <div className='footer'>
                        <button onClick={closeModal}> Restart </button>
                    </div>
                </div>
            </div>

    )
}

export default Modal