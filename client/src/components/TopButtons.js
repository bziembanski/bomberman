import { Container, Col, Row } from 'react-bootstrap';
import MuteButton from '../components/MuteButton';

function TopButtons(props) {

    return (
        <Container fluid style={{padding: 0}}>
            <Row>
                <Col xs={{ span: 4, offset: 1 }}>
                    <MuteButton/>
                </Col>
                <Col xs={{ span: 4, offset: 2}} className='right-col'>
                    <button className='back-button' onClick={() => {props.history.goBack()}}/>
                </Col>
            </Row>
        </Container>
    )
}

export default TopButtons;