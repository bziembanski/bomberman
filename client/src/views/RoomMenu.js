import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function RoomMenu() {
    const history = useHistory();


    return (
        <Container fluid className='root'>
            <TopButtons history={history}/>
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '45vh' }}>
                    tu bedzie fajne logo benc
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:6 , offset: 3 }} className='main-col'>
                    <button className='main-button' onClick={() => history.push("/create-room", { from: "/room-menu" })}>
                        create room
                    </button>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }} className='main-col'>
                    <button className='main-button' onClick={() => history.push("/select-room", { from: "/room-menu" })}>
                        find room
                    </button>
                </Col>
            </Row>
        </Container>
    );
}

export default RoomMenu;