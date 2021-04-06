import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import MuteButton from '../components/MuteButton';

function MainMenu() {

    return (
        <Container fluid className='root'>
            <Row>
                <Col xs={{ span:4 , offset: 1 }} style={{ padding: 0 }}>
                    <MuteButton/>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '45vh' }}>
                    tu bedzie fajne logo benc
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:6 , offset: 3 }} className='main-col'>
                    <NavLink to='/room-menu'>
                        <div className={'button' + ' ' + 'main-button'}>
                            play game
                        </div>
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }} className='main-col'>
                    <NavLink to='/instructions'>
                        <div className={'button' + ' ' + 'main-button'}>
                            instructions
                        </div>
                    </NavLink>
                </Col>
            </Row>
        </Container>
    );
}

export default MainMenu;