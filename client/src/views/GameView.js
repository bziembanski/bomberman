import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MuteButton from '../components/MuteButton';
import Game from '../game/Game';
import Timer from '../components/Timer';
import PlayerInfo from "../components/PlayerInfo";



function time(timer, setTimer){
    let interval = setInterval(() => {
        setTimer(timer => (timer - 0.1).toFixed(1));
    }, 100);
    if(parseFloat(timer) <= 0){
        clearInterval(interval);
    }
    return interval;
}

function GameView(props) {
    const history = useHistory();
    const [timer, setTimer] = useState('3.0');
    useEffect(() => {
        let interval = time(timer, setTimer)
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <Container fluid className='root'>
            <Row style={{justifyContent: 'center'}}>
                <Col xs={6} >
                    <Game />
                </Col>
                <Col xs={3}>
                    <Row>
                        <Col xs={6}>
                            <div style={{backgroundColor: '#C4C4C4', height: '75px'}}>
                                <Timer value={timer}/>
                            </div>
                        </Col>
                        <Col xs={6} className='right-col'>
                            <MuteButton isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Container fluid className='players-container'>
                                <Row style={{margin: '0 0 1rem 0'}}>
                                    <Col xs={12}>
                                        <PlayerInfo />
                                    </Col>
                                </Row>
                                <Row style={{margin: '0 0 1rem 0'}}>
                                    <Col xs={12}>
                                        <PlayerInfo />
                                    </Col>
                                </Row>
                                <Row style={{margin: '0 0 1rem 0'}}>
                                    <Col xs={12}>
                                        <PlayerInfo />
                                    </Col>
                                </Row>
                                <Row style={{margin: '0 0 1rem 0'}}>
                                    <Col xs={12}>
                                        <PlayerInfo />
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to='/'>
                                <button className='red-bad-button'>
                                    leave
                                </button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default GameView;