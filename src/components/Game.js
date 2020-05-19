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
        //console.log('remaining letters',remainingLetters)
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
        //console.log('shownletters', shownLetters)
        //pernaei to input sto sl ,sta foundLetter an exei vrethei swsto gramma, an de brethike tote paramenei idio me to shownletters  
        let sl = shownLetters.map(el => {
            if (el.realLetter === il) {
                return { realLetter : el.realLetter, foundLetter: il }
            } else {
                return { realLetter : el.realLetter, foundLetter: el.foundLetter }
            }
        });
        //console.log('sl', sl)
        //AN einai idia to shownLetters me to sl, tote to input den yparxei opote tsekarei an ta missedLetters mazi (concat) me to input einai 6 k pernaei t input sta missedLetter, an einai 6 exase
        //An den einai idia , to input uparxei ara chekarei ta sl an einai ola ta foundLetters NON null, an einai ola NON null kerdise
        if (arraysEqual(sl,shownLetters)) {
            checkGameStatus(missedLetters.concat(il), sl);
            setMissedLetters(missedLetters.concat(il));
        } else {
            checkGameStatus(missedLetters, sl);
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