import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';
import {TabContainer} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import TabContent from "react-bootstrap/TabContent";
import React from "react";
import TabPane from "react-bootstrap/TabPane";
import bomb from "../assets/upgrade_icons/bomb/bomb_50x50.png";
import explosion from "../assets/upgrade_icons/explosion/explosion_50x50.png";
import kick from "../assets/upgrade_icons/kick/kick_50x50.png";
import speed from "../assets/upgrade_icons/speed/speed_50x50.png";
import throwImg from "../assets/upgrade_icons/throw/throw_50x50.png";
import control from "../assets/control/control.png"

function Instructions(props) {
    const history = useHistory();

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row>
                <Col xs={{span: 10, offset: 1}}>
                    <div style={{backgroundColor: '#C4C4C4', height: '75vh'}}>
                        <TabContainer  defaultActiveKey="#game">
                            <ListGroup style={{flexDirection: 'row', minHeight: '75px'}}>
                                <ListGroup.Item action href="#game">
                                    AIM OF THE GAME
                                </ListGroup.Item>
                                <ListGroup.Item action href="#control">
                                    CONTROL
                                </ListGroup.Item>
                                <ListGroup.Item action href="#rules">
                                    RULES
                                </ListGroup.Item>
                                <ListGroup.Item action href="#upgrades">
                                    UPGRADES
                                </ListGroup.Item>
                            </ListGroup>

                            <TabContent style={{height: '60vh'}}>
                                <TabPane eventKey="#game">
                                    <Row>Eliminate your opponents and remain the last player on the board.</Row>
                                </TabPane>
                                <TabPane eventKey="#control">
                                    <Row>
                                        The player is controlled by the keyboard
                                    </Row>
                                    <Row className='control'>
                                        <img src={control}/>
                                    </Row>
                                    <Row>
                                        To throw bombs: double click the drop bomb
                                    </Row>
                                </TabPane>
                                <TabPane eventKey="#rules" className='rules'>
                                    <Row>The game takes 3 minutes to play. Between 2 and 4 players can play on one board.</Row>
                                    <div style={{color: '#1a237e'}}>Each player has a starter:</div>
                                    <ul>
                                        <li>3 lives</li>
                                        <li>possibility of placing max 1 bomb at the same time</li>
                                        <li>collection of upgrades</li>
                                    </ul>
                                    <Row><h3 style={{color: '#1a237e'}}>Attention!</h3></Row>
                                    <Row>40 seconds before the end of the game, the board begins to shrink.</Row>
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
                                    <Row>
                                        <Col xs={1} span={1} className='asset'>
                                            <img src={throwImg}/>
                                        </Col>
                                        <Col xs={5} className='asset-description'>
                                            Gives you the ability to throw bombs or increases the throw range
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