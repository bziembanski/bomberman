import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function CreateRoom(props) {
    const history = useHistory();
    const [name, setName] = React.useState('new_player');
    const [numberOfPlayers, setNumberOfPlayers] = React.useState();

    const handleInput = (event) => {
        if(event.target.value.length < 12)
            setName(event.target.value);
    }

    const handleSubmit = () => {
        //TODO
        history.push('/room/1', {from: '/create-room'})
    }


    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row style={{paddingTop: '6rem'}}>
                <Col xs={{span: 4, offset: 2}}>
                    <div className='label'>
                        your name
                    </div>
                </Col>
                <Col xs={{span: 4, offset: 0}} className='right-col'>
                    <input 
                        className='input'
                        value={name}
                        onChange={(event) => handleInput(event)}
                    />
                </Col>
            </Row>
            <Row style={{paddingTop: '2rem'}}>
                <Col xs={{span: 4, offset: 2}}>
                    <div className='label'>
                        players
                    </div>
                </Col>
                <Col xs={{span: 4, offset: 0}} className='right-col'>
                    <div className='select-number'>
                        <button className={numberOfPlayers === 2 ? 'selected' + ' ' + 'option' : 'option'} onClick={() => setNumberOfPlayers(2)}>2</button>
                        <button className={numberOfPlayers === 3 ? 'selected' + ' ' + 'option' : 'option'} onClick={() => setNumberOfPlayers(3)}>3</button>
                        <button className={numberOfPlayers === 4 ? 'selected' + ' ' + 'option' : 'option'} onClick={() => setNumberOfPlayers(4)}>4</button>
                    </div>
                </Col>
            </Row>
            <Row style={{paddingTop: '5rem'}}>
                <Col xs={{span: 6, offset: 3}} className='main-col'>
                    <button className='main-button' onClick={() => handleSubmit()}>
                        create
                    </button>
                </Col>
            </Row>
        </Container>
    )
}

export default CreateRoom;