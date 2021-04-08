import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function SelectRoom() {
    const history = useHistory();
    const [selected, setSelected] = React.useState();
    const [name, setName] = React.useState('new_player');

    const handleInput = (event) => {
        if(event.target.value.length < 12)
            setName(event.target.value);
    }

    const handleSubmit = () => {
        history.push("/room", { from: "/select-room" })
        //TODO
    }

    const rooms = [
        {
            id: 1,
            host: 'kox',
            numberOfPlayers: 1,
            maxNumberOfPlayers: 4
        },
        {
            id: 2,
            host: 'kox',
            numberOfPlayers: 1,
            maxNumberOfPlayers: 4
        },
        {
            id: 3,
            host: 'kox',
            numberOfPlayers: 1,
            maxNumberOfPlayers: 4
        },
    ]

    return (
        <Container fluid className='root'>
            <TopButtons history={history} />
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '62vh' }}>
                    <Container fluid style={{textAlign: 'center'}}>
                        <Row className='header'>
                            <Col>game id</Col>
                            <Col>host</Col>
                            <Col>players</Col>
                        </Row>
                        <Container fluid style={{overflowY: 'auto', maxHeight: '50vh'}}>
                            { 
                                rooms.map((room) => {
                                    return (
                                        <Container 
                                            fluid id={room.id} 
                                            className={selected === room.id && 'selected'} 
                                            onClick={() => setSelected(room.id)}
                                        >
                                            <Row className='room'>
                                                <Col>{room.id}</Col>
                                                <Col>{room.host}</Col>
                                                <Col>{room.numberOfPlayers} - {room.maxNumberOfPlayers}</Col>
                                            </Row>
                                        </Container>
                                    );
                                })
                            }
                        </Container>
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 4, offset: 1}}>
                    <button className='main-button' onClick={() => handleSubmit()}>
                        join
                    </button>
                </Col>
                <Col xs={{span: 4, offset: 2}} className='right-col'>
                    <input 
                        className='input'
                        value={name}
                        onChange={(event) => handleInput(event)}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SelectRoom;