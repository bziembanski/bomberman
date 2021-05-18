import React from "react";
import {Container, Col, Row, Nav} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';
import {TabContainer} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import TabContent from "react-bootstrap/TabContent";
import TabPane from "react-bootstrap/TabPane";
import bomb from "../assets/upgrade_icons/bomb/bomb_50x50.png";
import explosion from "../assets/upgrade_icons/explosion/explosion_50x50.png";
import kick from "../assets/upgrade_icons/kick/kick_50x50.png";
import speed from "../assets/upgrade_icons/speed/speed_50x50.png";
import throwImg from "../assets/upgrade_icons/throw/throw_50x50.png";
import control from "../assets/control/control.png"

function Instructions(props) {
    const history = useHistory();

    React.useEffect(() => {
        history.replace('/instructions', {});
    }, []);

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row>
                <Col xs={{span: 10, offset: 1}}>
                    <div style={{backgroundColor: '#C4C4C4', height: '75vh'}}>
                        <TabContainer  defaultActiveKey='#game'>
                            <Nav variant="pills" className='flex-row'>
                                <Nav.Item>
                                    <Nav.Link eventKey='#game'>goal</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="#control">control</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey='#rules'>rules</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="#upgrades">upgrades</Nav.Link>
                                </Nav.Item>
                            </Nav>

                            <TabContent style={{height: '60vh'}}>
                                <TabPane eventKey="#game">
                                    <div>
                                        Eliminate your opponents and remain the last player on the board
                                    </div>
                                </TabPane>
                                <TabPane eventKey="#control">
                                    <div>
                                        The player is controlled by the keyboard
                                    </div>
                                    <div className='control'>
                                        <img src={control}/>
                                    </div>
                                    <div>
                                        To throw bombs: click the spacebar
                                    </div>
                                </TabPane>
                                <TabPane eventKey="#rules" className='rules'>
                                    <div>
                                        The game takes 3 minutes to play. Between 2 and 4 players can play on one board.
                                    </div>
                                    <div>
                                        <h3 style={{color: '#007bff'}}>
                                            Each player starts with:
                                        </h3>
                                    </div>
                                    <ul>
                                        <li>3 lives</li>
                                        <li>possibility of placing max 1 bomb at the same time</li>
                                        <li>collection of upgrades</li>
                                    </ul>
                                    <div>
                                        <h3 style={{color: '#007bff'}}>
                                            Attention!
                                        </h3>
                                    </div>
                                    <div>
                                        40 seconds before the end of the game, the board begins to shrink.
                                    </div>
                                </TabPane>
                                <TabPane eventKey="#upgrades" >
                                    <Row>
                                        <Col xs={1}  span={1} className='asset'>
                                            <img src={bomb}/>
                                        </Col>
                                        <Col xs={5} className='asset-description'>
                                            Increases the bomb limit (max 5)
                                        </Col>
                                        <Col xs={1} span={1} className='asset'>
                                            <img src={speed}/>
                                        </Col>
                                        <Col xs={5} className='asset-description'>
                                            Increases movement speed
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={1} span={1}  className='asset'>
                                            <img src={kick}/>
                                        </Col>
                                        <Col xs={5} className='asset-description'>
                                            It gives you the ability to kick bombs or increases the kick distance
                                        </Col>
                                        <Col xs={1} span={1} className='asset'>
                                            <img src={explosion}/>
                                        </Col>
                                        <Col xs={5} className='asset-description'>
                                            Increases the bomb's firing range
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </TabContainer>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Instructions;