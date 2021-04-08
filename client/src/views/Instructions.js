import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function Instructions() {
    const history = useHistory();

    return (
        <Container fluid className='root'>
            <TopButtons history={history}/>
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '75vh' }}>
                    tu beda instruckje es
                </Col>
            </Row>
        </Container>
    );
}

export default Instructions;