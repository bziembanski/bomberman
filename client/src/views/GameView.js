import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useLocation, Link } from 'react-router-dom';
import MuteButton from '../components/MuteButton';
import Game from '../game/Game';
import PlayerInfo from '../components/PlayerInfo';
import Popup from '../components/Popup';


function __dev_test_time(timer, setTimer){
    let interval = setInterval(() => {
        setTimer(timer => (timer - 0.1).toFixed(1));
    }, 100);
    if(parseFloat(timer) <= 0){
        clearInterval(interval);
    }
    return interval;
}

function GameView(props) {
    const location = useLocation();
    const [modalShow, setModalShow] = React.useState(false);
    const [win, setWin] = React.useState(false);
    const [timer, setTimer] = useState("180.0");
    const [positionInRoom, setPosition] = useState(0);
    const [loading, setLoading] = useState(true);
    const socket = props.socket;
    const id = props.match.params.id

    useEffect(() => {
        socket.on("timer", timer => {
           setTimer(timer);
        });
    }, [timer]);

    useEffect(()=>{
        console.log(location);
        setPosition(location.state.positionInRoom);
        setLoading(false);
    }, [location]);

    function timerClick(){
        socket.emit("timer", "");
        console.log("click");
    }

    return (
        <Container fluid className='root'>
            <Row style={{justifyContent: 'center'}}>
                <Col xs={6} id='phaser-game'>
                    <Game positionInRoom={location.state.positionInRoom} roomId={id} socket={socket}/>
                </Col>
                <Col xs={{span: 3, offset: 1}}>
                    <Row className='game-topActions'>
                        <Col xs={8}>
                            <div onClick={timerClick} className='timer'>
                                {timer}
                            </div>
                        </Col>
                        <Col xs={4} className='right-col' style={{padding: 0}}>
                            <MuteButton isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Container className='players-container'>
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
            <Popup
                show={modalShow} alert={false} win={win}
                onHide={() => {
                    setModalShow(false);
                }}
            />
        </Container>
    )
}

export default GameView;
