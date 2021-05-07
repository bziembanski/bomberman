import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MuteButton from '../components/MuteButton';
import Game from '../game/Game';
import Timer from "../components/Timer";



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
    const [timer, setTimer] = useState("3.0");
    useEffect(() => {
        let interval = time(timer, setTimer)
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <Container fluid className='root'>
            <Row>
                <Col xs={{span: 6, offset: 1}} >
                    <Game />
                </Col>
                <Col xs={{span: 3, offset: 1}}>
                    <Row>
                        <Col xs={8}>
                            <div style={{ backgroundColor: '#C4C4C4', height: '75px'}}>
                                <Timer value={timer}/>
                            </div>
                        </Col>
                        <Col xs={4} className="right-col">
                            <MuteButton isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{ backgroundColor: '#C4C4C4', height: '65vh', width: '450px'}}>

                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Link to="/">
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