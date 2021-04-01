import './App.css';
import {useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('localhost:3001');

function App() {
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('chat message', (msg) => {
            setMessages([...messages, msg]);
        });

        return () => {
            socket.off('chat message');
        };
    })

    const handleChange = event => {
        setInputValue(`${event.target.value}`);
    }

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
                <input value={inputValue} onChange={handleChange}/>
                <button>Send</button>
            </form>
        </div>
    );
}

export default App;
