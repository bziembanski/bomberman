import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import MuteButton from '../components/MuteButton';

function RoomMenu() {

    return (
        <Container fluid className='root'>
            <Row>
                <Col xs={{ span: 4, offset: 1 }} style={{ padding: 0 }}>
                    <MuteButton/>
                </Col>
                <Col xs={{ span: 4, offset: 2}} className='right-col'>
                    <NavLink to='/'>
                        <div className={'button' + ' ' + 'back-button'}/>
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '45vh' }}>
                    tu bedzie fajne logo benc
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:6 , offset: 3 }} className='main-col'>
                    <NavLink to='/'>
                        <div className={'button' + ' ' + 'main-button'}>
                            create room
                        </div>
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }} className='main-col'>
                    <NavLink to='/select-room'>
                        <div className={'button' + ' ' + 'main-button'}>
                            find room
                        </div>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default RoomMenu;