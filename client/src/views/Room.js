import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';

const Ready = {
    backgroundColor: '#00ff00'
}

function Room(props) {
    const history = useHistory();
    const [selected, setSelected] = useState();
    const [isHost, setIsHost] = useState(false);
    const [gameInfo, setGameInfo] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const socket = props.socket;
    const playerId = socket.id;
    const id = props.match.params.id

    const handleSubmit = () => {
        if (isHost) {
            history.push(`/game/${id}`, {from: `/room/${id}`});
        }
        else {
            socket.emit('isPlayerReadyUpdate', gameInfo.players.map(player => {return player.playerId === playerId ? {...player, isReady: !player.isReady} : player}));
        }
    }

    //todo check if it can be replaced with isHost
    const handleSelect = (playerId_) => {
        if(playerId_ !== gameInfo.players.filter(n=>n.position===1)[0].playerId) {
            if(playerId_ === selected) {
                setSelected(null);
            }
            else {
                setSelected(playerId_);
            }
        }
    }

    const handleLeave = () => {
        if (isHost && selected != null) {
            socket.emit("playerLeave", {clientId: selected})
        }
        else if (!isHost) {
            socket.emit('playerLeave', {clientId: playerId});
            history.replace('/room-menu');
        }
    }

    useEffect(() => {
        console.log("elo use effect");
        socket.emit('getRoomData', {roomId: id});
        socket.on('roomData', roomData => {
            setGameInfo({...roomData});
            console.log(roomData);
            if(roomData.players.length === 1){
                setIsHost(true);
            }
            setIsLoading(false);
        });
        socket.on("dataChange", () => {
            socket.emit("getRoomData", {roomId: id});
        });
        socket.on('kick', () => {
            history.replace('/room-menu');
        });
        return () => {
            socket.off('roomData');
            socket.off("dataChange");
            socket.off('kick');
            socket.emit("disco");
        };
    },[]);

    useEffect(() => {
        if(gameInfo.players && selected && !(gameInfo.players.map(player => player.playerId).includes(selected))) {
            setSelected(null);
        }
    },[gameInfo])
    // let gameInfo = {
    //     id: 1,
    //     maxNumberOfPlayers: 4,
    //     players: [
    //         {
    //             name: 'kox',
    //             isReady: true
    //         },
    //         {
    //             name: 'bob1',
    //             isReady: false
    //         },
    //         {
    //             name: 'bob2',
    //             isReady: true
    //         },
    //         {
    //             name: 'bob3',
    //             isReady: true
    //         }
    //     ]
    // }

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            {
                !isLoading
                ? (
                    <Row>
                        <Col xs={{span: 4, offset: 1}}>
                            <Container bsPrefix='game-info'>
                                <Row className='header'>
                                    <Col onClick={()=>{
                                        socket.emit("dataChange");
                                    }}>game id</Col>
                                </Row>
                                <Row className='info'>
                                    <Col>game {gameInfo.id}</Col>
                                </Row>
                                <Row className='header'>
                                    <Col>host</Col>
                                </Row>
                                <Row className='info'>
                                    <Col>{gameInfo.players.filter(n=>n.position===1)[0] ? gameInfo.players.filter(n=>n.position===1)[0].nickname : "nie ma hosta"}</Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col xs={{span: 4, offset: 2}} className='right-col'>
                            <Container bsPrefix='players-info'>
                                <Row className='header'>
                                    <Col>players</Col>
                                </Row>
                                <Container fluid>
                                    {
                                        gameInfo.players.map((player) => {
                                            return (
                                                <Container
                                                    key={player.playerId}
                                                    id={player.playerId}
                                                    onClick={isHost ? () => handleSelect(player.playerId) : null}
                                                    className={selected === player.playerId && 'selected'}
                                                    style={player.isReady ? Ready : null}
                                                >
                                                    <Row className='player-name'>
                                                        <Col>{player.nickname}</Col>
                                                    </Row>
                                                </Container>
                                            );
                                        })
                                    }
                                </Container>
                            </Container>
                        </Col>
                    </Row>
                )
                : (
                    <h1>Loading</h1>
                )
            }
            <Row>
                <Col xs={{span: 4, offset: 1}}>
                    <button className='main-button' onClick={handleSubmit}>
                        {
                            isHost
                                ? 'start'
                                : gameInfo && gameInfo.players && gameInfo.players.filter(p=>p.playerId===playerId)[0].isReady
                                ? 'not ready'
                                : 'ready'
                        }
                    </button>
                </Col>
                <Col xs={{span: 4, offset: 2}} className='right-col'>
                    <button className='red-bad-button' onClick={handleLeave}>
                        {
                            isHost ? 'kick' : 'leave'
                        }
                    </button>
                </Col>
            </Row>
        </Container>
    )
}

export default Room;