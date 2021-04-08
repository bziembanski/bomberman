import React from 'react'
import mute from '../assets/mute_button/mute_button_40x25.png';
import unmute from '../assets/unmute_button/unmute_button_40x25.png';

const MuteBtn = {
    backgroundImage: `url(${mute})`
}

const UnmuteBtn = {
    backgroundImage: `url(${unmute})`
}

function MuteButton() {

    const [isMuted, setIsMuted] = React.useState(false);

    const handleClick = () => {
        setIsMuted(!isMuted);
        console.log('isMuted? ' + isMuted);
    }

    return (
        <div
            style={isMuted ? MuteBtn : UnmuteBtn} 
            className="button"
            onClick={()=>handleClick()}   
        />
    );
}

export default MuteButton;