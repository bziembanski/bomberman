import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MuteButton from '../components/MuteButton';
import Game from '../game/Game';
import PlayerInfo from "../components/PlayerInfo";
import Popup from "./Popup";


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
    const history = useHistory();
    const [modalShow, setModalShow] = React.useState(false);
    const [win, setWin] = React.useState(false);
    const [point, setPoint] = React.useState('100');
    const [timer, setTimer] = useState("300.0");
    const socket = props.socket;
    useEffect(() => {
        socket.on("timer", timer => {
           setTimer(timer);
        });
    }, [timer]);
    function timerClick(){
        socket.emit("timer", "");
        console.log("click");
    }

    return (
        <Container fluid className='root'>
            <Row style={{justifyContent: 'center'}}>
                <Col xs={6} id='phaser-game'>
                    <Game />
                </Col>
                <Col xs={{span: 3, offset: 1}}>
                    <Row>
                        <Col xs={8}>
                            <div onClick={timerClick} style={{ backgroundColor: '#C4C4C4', height: '75px'}}>
                                <div style={{fontSize:25, height:"100%", display:"flex", flexDirection:"column", margin:"auto", textAlign:"center", justifyContent:"center"}}>
                                    {timer}
                                </div>
                            </div>
                        </Col>
                        <Col xs={4} className='right-col'>
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
                            <button className='red-bad-button' onClick={() => setModalShow(true)}>
                                popup
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Popup
                show={modalShow} win={win} point={point}
                onHide={() => {
                    setModalShow(false);
                    setWin(!win);
                }}
            />
        </Container>
    )
}

export default GameView;