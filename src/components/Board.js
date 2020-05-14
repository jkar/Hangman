import React from 'react';
import Word from './Word'
import Hanged from './Hanged';

const Board = ( { shownLetters, inputLetters, handleSubmit, handleChange, missedLetters } ) => {

    return (
        <>
            <Word shownLetters={shownLetters} />
            <form onSubmit={(event) => handleSubmit(event, inputLetters)}> 
                <input value={inputLetters} onChange={handleChange} />
                <input type="submit" value="Submit" /> 
            </form>
            <Hanged missedLetters={missedLetters} />
        </>
    )
}

export default Board;