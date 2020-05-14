import React from 'react'
import Loader from 'react-loader-spinner'

const LoadingIndicator = ({ spinner }) => {

    const mystyle = {
        marginTop: "100px",
      };

    if (spinner) {
        return (
            <div style={mystyle}>
                <Loader type="Circles" color="#392458" height={220} width={220}/>
            </div>
        );  
    } else if (!spinner) {
        return null
    }
}

export default LoadingIndicator;