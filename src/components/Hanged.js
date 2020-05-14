import React from 'react'
import hanged0 from '../images/hanged0.png'
import hanged1 from '../images/hanged1.png'
import hanged2 from '../images/hanged2.png'
import hanged3 from '../images/hanged3.png'
import hanged4 from '../images/hanged4.png'
import hanged5 from '../images/hanged5.png'
import hanged6 from '../images/hanged6.png'

const Hanged = ({ missedLetters }) => {
    let counter = missedLetters.length;
    if ( counter === 0) {
        return (
            <img src={hanged0} height="350px"  alt='hanged0' />
        )
    } else if (counter === 1) {
        return (
            <img src={hanged1} height="350px" alt='hanged1' />
        )
    } else if (counter === 2) {
        return (
            <img src={hanged2} height="350px" alt='hanged2' />
        )
    } else if (counter === 3) {
        return (
            <img src={hanged3} height="350px" alt='hanged3' />
        )
    } else if (counter === 4) {
        return (
            <img src={hanged4} height="350px" alt='hanged4' />
        )
    } else if (counter === 5) {
        return (
            <img src={hanged5} height="350px" alt='hanged5' />
        )
    } else if (counter === 6) {
        return (
            <img src={hanged6} height="350px" alt='hanged6' />
        )
    }
    
}

export default Hanged;