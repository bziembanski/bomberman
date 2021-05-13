import React from "react";
import {Col, Container, Row} from "react-bootstrap";

function PlayerInfo(props) {

    return (
        <div>
            <p style={{fontSize: '1.2rem', textAlign: 'center', margin: 0}}>name</p>
            <Container fluid className='player'>
                <Row style={{marginBottom: '0', height: '100%'}}>
                    <Col xs={3} style={{justifyContent: 'center'}}>
                        <div className='avatar' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/player_icons/' + 'blue.png'})`}}>
                        </div>
                    </Col>
                    <Col xs={9} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className='upgrade' style={{backgroundImage: 'url(/assets/upgrade_icons/bomb/bomb_50x50.png)'}}>1</div>
                        <div className='upgrade' style={{backgroundImage: 'url(/assets/upgrade_icons/speed/speed_50x50.png)'}}>0</div>
                        <div className='upgrade' style={{backgroundImage: 'url(/assets/upgrade_icons/kick/kick_50x50.png)'}}>1</div>
                        <div className='upgrade' style={{backgroundImage: 'url(/assets/upgrade_icons/throw/throw_50x50.png)'}}>1</div>
                        <div className='upgrade' style={{backgroundImage: 'url(/assets/upgrade_icons/explosion/explosion_50x50.png)'}}>1</div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default PlayerInfo;