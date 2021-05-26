import { Container, Col, Row } from 'react-bootstrap';
import MuteButton from '../components/MuteButton';
import { useHistory } from 'react-router-dom';

function MainMenu(props) {
    const history = useHistory();

    return (
        <Container fluid className='root'>
            <Row>
                <Col xs={{ span:4 , offset: 1 }}>
                    <MuteButton isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:10, offset: 1 }}>
                    <div style={{ backgroundColor: '#C4C4C4', height: '45vh' }}>
                        tu bedzie fajne logo benc
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:6 , offset: 3 }} className='main-col'>
                    <button className='main-button' onClick={() => history.push("/room-menu", { from: "/" })}>
                        play game
                    </button>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }} className='main-col'>
                    <button className='main-button' onClick={() => history.push("/instructions", { from: "/" })}>
                        instructions
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

export default MainMenu;