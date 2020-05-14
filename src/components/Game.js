import React, { useState } from 'react';
//import Word from './Word'
import Board from './Board'
import LoadingIndicator from './LoadingIndicator'

const Game = ({ click, gameStarted, shownLetters, setShownLetters, word, setMissedLetters, missedLetters, setGameStatus, gameStatus, spinner }) => {
    const [inputLetters, setInputLetters] = useState('');

    const arraysEqual = (arr1, arr2) => {

        // Check if the arrays are the same length
        if (arr1.length !== arr2.length) return false;
    
        // Check if all items exist and are in the same order
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i].foundLetter !== arr2[i].foundLetter ) return false;
        }
    
        // Otherwise, return true
        return true;
    
    };

    const checkGameStatus = (ml, sl) => {
        if (ml.length>=6) {
            setGameStatus('lost');
        }
        let remainingLetters = sl.filter(el => el.foundLetter === null);
        console.log('remaining letters',remainingLetters)
        if (remainingLetters.length === 0) {
            setGameStatus('won');
        }
    }


    const handleChange = (event) => {

        let val = event.target.value[event.target.value.length-1];
        if (val === undefined) {
            val = '';
        }
        setInputLetters(val);
      }

      const handleSubmit = (ev, il) => {
        ev.preventDefault();
        if (il === '') {
            return
        }
        let sl = shownLetters.map(el => {
            if (el.realLetter === il) {
                return { realLetter : el.realLetter, foundLetter: il }
            } else {
                return { realLetter : el.realLetter, foundLetter: el.foundLetter }
            }
        });
        checkGameStatus(missedLetters.concat(il), sl);
        if (arraysEqual(sl,shownLetters)) {
            setMissedLetters(missedLetters.concat(il));
        }
        setShownLetters(sl);
        setInputLetters('');
      }

      return (
        <>
            <h1>Hangman Game</h1>
            <button onClick={ () => click() }>{gameStarted ? 'Stop Game' : 'Start Game'}</button>
            <LoadingIndicator spinner={spinner} />
            { gameStarted ?
                <Board shownLetters={shownLetters} inputLetters={inputLetters} handleSubmit={handleSubmit} handleChange={handleChange} missedLetters={missedLetters} /> 
            :
                null
            }
        </>
    )
 
        // return (
        //     <>
        //         <h1>Hangman Game</h1>
        //         <button onClick={ () => click() }>{gameStarted ? 'Stop Game' : 'Start Game'}</button>
        //         { shownLetters.length > 0 ? <Word shownLetters={shownLetters} /> : null}
        //         {gameStarted ?
        //         <form onSubmit={(event) => handleSubmit(event, inputLetters)}> 
        //             <input value={inputLetters} onChange={handleChange} />
        //             <input type="submit" value="Submit" /> 
        //         </form>
        //         :
        //         null}
        //     </>
        // )
}

export default Game