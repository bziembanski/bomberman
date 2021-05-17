import React from 'react';
import MainMenu from './views/MainMenu';
import RoomMenu from './views/RoomMenu';
import Instructions from './views/Instructions';
import SelectRoom from './views/SelectRoom';
import CreateRoom from './views/CreateRoom';
import GameView from './views/GameView';
import Room from './views/Room';
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory, useParams } from 'react-router-dom';
import io from 'socket.io-client';


const socket = io('localhost:3001');

function RoomSelection() { //TODO()
    const history = useHistory();

    useEffect(() => {
        socket.on('joined room', (id) => {
            history.push(`/room/${id}`);
        });

        return () => {
            socket.off('joined room');
        };
    });

    const handleButton = id => {
        socket.emit('join room', id);
    };

    return (
        <div>
            <button onClick={() => handleButton(1)}>room1</button>
            <button onClick={() => handleButton(2)}>room2</button>
        </div>
    );
}

function __depracate__Room() { //TODO()
    let { id } = useParams();

    if (!(['1', '2'].includes(id))) {
        throw "wrong room id";
    }

    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', msg => {
            setMessages([...messages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    });

    const handleChange = event => {
        setInputValue(`${event.target.value}`);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (inputValue) {
            socket.emit('chat message', inputValue);
            setInputValue('');
        }
    };

    return (
        <div>
            <ul>
                {messages.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input value={inputValue} onChange={handleChange} />
                <button>Send</button>
            </form>
        </div>
    );
}

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
    audio.loop = true;
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        playing ? audio.play() : audio.pause();
      },
      [playing]
    );

    return [playing, toggle];
  };

function App() {
    const url = 'https://vgmsite.com/soundtracks/bomberman-music-from/lspcxxsshh/09.%20BGM1.mp3';
    const url2 = 'https://vgmsite.com/soundtracks/kirby-battle-royale-gamerip/lervhazs/02.%20Banner%20Intro.mp3';
    const [isMuted, setIsMuted] = useAudio(url);

    return (
        <Router>
            <Switch>
                <Route exact path='/' render={(props) => (<MainMenu {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} />
                <Route path='/room-menu' render={(props) => (<RoomMenu {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} />
                <Route path='/instructions' render={(props) => (<Instructions {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} />
                <Route path='/select-room' render={(props) => (<SelectRoom {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} />
                <Route path='/create-room' render={(props) => (<CreateRoom {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} />
                <Route path='/room' render={(props) => (<Room {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} /> {/* uber stupid, just temporary */}
                <Route path='/game' render={(props) => (<GameView {...props} isMuted={isMuted} setIsMuted={setIsMuted} />)} /> {/* uber stupid, just temporary */}
            </Switch>
        </Router>
    );
}

export default App;
