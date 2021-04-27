import React from 'react'
import mute from '../assets/mute_button/mute_button_40x25.png';
import unmute from '../assets/unmute_button/unmute_button_40x25.png';

const MuteBtn = {
    backgroundImage: `url(${mute})`
}

const UnmuteBtn = {
    backgroundImage: `url(${unmute})`
}

function MuteButton(props) {

    return (
        <button
            style={props.isMuted ? MuteBtn : UnmuteBtn} 
            className='mute'
            onClick={() => props.setIsMuted(!props.isMuted)}   
        />
    );
}

export default MuteButton;