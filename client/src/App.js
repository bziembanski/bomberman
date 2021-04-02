import './App.css';
import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory, useParams} from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('localhost:3001');

function RoomSelection() {
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

function Room() {
    let {id} = useParams();

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
                <input value={inputValue} onChange={handleChange}/>
                <button>Send</button>
            </form>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={RoomSelection} exact/>
                <Route path="/room/:id" component={Room}/>
            </Switch>
        </Router>
    )
}

export default App;
