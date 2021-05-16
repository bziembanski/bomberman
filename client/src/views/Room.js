import React, {useEffect} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';

const Ready = {
    backgroundColor: '#00ff00'
}

function Room(props) {
    const history = useHistory();
    const [selected, setSelected] = React.useState();
    const [isHost, setIsHost] = React.useState(true);
    const socket = props.socket;
    const id  = props.match.params.id

    const handleSubmit = () => {
        if (isHost) {
            history.push(`/game/{id}`, {from: `/room/{id}`});
        }
        //TODO
    }

    const handleSelect = (playerName) => {
        if(playerName !== gameInfo.host) {
            setSelected(playerName);
        }
    }


    useEffect(() => {
        socket.emit('getRoomData', {roomId: id})
        socket.on('roomData', roomData => {
            console.log(roomData);
        });

        return () => {
            socket.off('roomData');
        };
    },[]);

    let gameInfo = {
        id: 1,
        host: 'kox',
        maxNumberOfPlayers: 4,
        players: [
            {
                name: 'kox',
                isReady: true
            },
            {
                name: 'bob1',
                isReady: false
            },
            {
                name: 'bob2',
                isReady: true
            },
            {
                name: 'bob3',
                isReady: true
            }
        ]
    }

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row>
                <Col xs={{span: 4, offset: 1}}>
                    <Container bsPrefix='game-info'>
                        <Row className='header'>
                            <Col>game id</Col>
                        </Row>
                        <Row className='info'>
                            <Col>game {gameInfo.id}</Col>
                        </Row>
                        <Row className='header'>
                            <Col>host</Col>
                        </Row>
                        <Row className='info'>
                            <Col>{gameInfo.host}</Col>
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
                                gameInfo.players.map((player, i) => {
                                    return (
                                        <Container
                                            key={i}
                                            id={player.name}
                                            onClick={isHost ? () => handleSelect(player.name) : null}
                                            className={selected === player.name && 'selected'} 
                                            style={player.isReady ? Ready : null} 
                                        >
                                            <Row className='player'>
                                                <Col>{player.name}</Col>                 
                                            </Row>
                                        </Container>
                                    );
                                })
                            }
                        </Container>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 4, offset: 1}}>
                    <button className='main-button' onClick={() => handleSubmit()}>
                        {
                            isHost ? 'start' : 'ready'
                        }
                    </button>
                </Col>
                <Col xs={{span: 4, offset: 2}} className='right-col'>
                    <button className='red-bad-button' onClick={() => {history.goBack()}}>
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