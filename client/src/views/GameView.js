import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import MuteButton from '../components/MuteButton';
import Game from '../game/Game';
import Popup from "./Popup";

function GameView(props) {
    const history = useHistory();

    const [modalShow, setModalShow] = React.useState(false);
    const [win, setWin] = React.useState(false);
    const [point, setPoint] = React.useState('100');

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
                                timer pewnie mniejszy XD
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
                            <button className='red-bad-button' onClick={() => setModalShow(true)}>
                                popup
                            </button>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Popup show={modalShow} win={win} point={point}
                   onHide={() => { setModalShow(false);
                   setWin(!win)}}/>

        </Container>
    )
}

export default GameView;
