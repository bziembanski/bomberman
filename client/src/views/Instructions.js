import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import MuteButton from '../components/MuteButton';

function Instructions() {

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
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '75vh' }}>
                    tu beda instruckje es
                </Col>
            </Row>
        </Container>
    );
}

export default Instructions;