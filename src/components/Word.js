import React from 'react';

const Word = ({ shownLetters }) => {
    //console.log(shownLetters);
    return (
        <div>
        {shownLetters.map((letter, index) => {
            return letter.foundLetter ? <p style={{display: 'inline'}} key={index}> {letter.foundLetter} </p> : <p style={{display: 'inline'}} key={index}> _ </p>}
        )}
        </div>
    )
}

export default Word;