import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Game from './components/Game'
import Hanged from './components/Hanged'


const words = ["player", "deloitte", "consulting", "lockdown", "smartworking"];
const baseUrl = "https://random-word-api.herokuapp.com//word?number=1";

const App = () => {

  const [word, setWord] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [shownLetters, setShownLetters] = useState([]);
  const [missedLetters, setMissedLetters] = useState([]);
  const [gameStatus, setGameStatus] = useState('playable');

  console.log(word);
  console.log('missed letters',missedLetters);

  const twoRandomLetters = (w) => {
    const first = Math.floor(Math.random() * w.length);
    let second = first; 
    while (first === second) {
      second  = Math.floor(Math.random() * w.length);
    }
  
    let arrayLetters = w.split('');
    arrayLetters = arrayLetters.map( (el,index) => {
      if (index === first) {
        return {realLetter: el, foundLetter: w[first]}
      } else if (index === second) {
        return {realLetter: el, foundLetter: w[second]}
      } else {
        return {realLetter: el, foundLetter: null}
      }
    })

    setShownLetters(arrayLetters);
  }

  const handleStart = async () => {
    if (!gameStarted) {
      //let num = words.length;
      //let index = Math.floor(Math.random() * num);
      //setWord(words[index]);
      //twoRandomLetters(words[index]);
      let result = await axios.get(baseUrl);
      result = await result.data[0];
      setWord(result);

      twoRandomLetters(result);
      setGameStarted(!gameStarted);
    } else {
      setGameStarted(!gameStarted);
      setWord(null);
      setShownLetters([]);
    }
  }

  // const handleStart = () => {
  //   if (!gameStarted) {
  //     let num = words.length;
  //     let index = Math.floor(Math.random() * num);
  //     setWord(words[index]);
  //     twoRandomLetters(words[index]);
  //     setGameStarted(!gameStarted);
  //   } else {
  //     setGameStarted(!gameStarted);
  //     setWord(null);
  //     setShownLetters([]);
  //   }
  // }

  const handleRestart = () => {
    setWord(null);
    setGameStarted(false);
    setShownLetters([]);
    setMissedLetters([]);
    setGameStatus('playable');
  }

  if (gameStatus === 'playable') {
    return (
      <div className="App">
        <Game  click={handleStart} word={word} gameStarted={gameStarted} shownLetters={shownLetters} setShownLetters={setShownLetters} setMissedLetters={setMissedLetters} missedLetters={missedLetters} setGameStatus={setGameStatus} gameStatus={gameStatus} />
      </div>
  );
  } else if (gameStatus === 'lost') {
      return (
        <div className="App">
            <h1>Hangman Game</h1>
            <button onClick={() => handleRestart()}>Restart</button>
            <h3>Lost..</h3>
            <p>{missedLetters.length} missed attempts</p>
            <Hanged missedLetters={missedLetters} />
        </div>
  )
  } else if ( gameStatus === 'won') {
      return (
        <div className="App">
            <h1>Hangman Game</h1>
            <button onClick={() => handleRestart()}>Restart</button>
            <h3>Win!!</h3>
            <p>{missedLetters.length} missed attempts</p>
        </div>
      )
    }
}

export default App;
