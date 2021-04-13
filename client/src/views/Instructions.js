import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function Instructions(props) {
    const history = useHistory();

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row>
                <Col xs={{ span:10, offset: 1 }}>
                    <div style={{ backgroundColor: '#C4C4C4', height: '75vh' }}>
                        tu beda instruckje es
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Instructions;