import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

function Spinner(props) {
    return (
        <div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
            <BeatLoader color="#5B9BD5" margin={5} speedMultiplier={0.6} />
        </div>
    );
}

export default Spinner;