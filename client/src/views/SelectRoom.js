import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import MuteButton from '../components/MuteButton';


function SelectRoom() {

    const [selected, setSelected] = React.useState();
    const [name, setName] = React.useState('new_player');

    const handleSelect = (id) => {
        setSelected(id);
    }

    const handleInput = (event) => {
        if(event.target.value.length < 15)
            setName(event.target.value);
    }

    const handleSubmit = () => {

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
            <Row>
                <Col xs={{ span: 4, offset: 1 }} style={{ padding: 0 }}>
                    <MuteButton/>
                </Col>
                <Col xs={{ span: 4, offset: 2}} className='right-col'>
                    <NavLink to='/room-menu'>
                        <div className={'button' + ' ' + 'back-button'}/>
                    </NavLink>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span:10, offset: 1 }} style={{ backgroundColor: '#C4C4C4', height: '65vh' }}>
                    <Container fluid>
                        <Row className='room-select-header'>
                            <Col>game id</Col>
                            <Col>host</Col>
                            <Col>players</Col>
                        </Row>
                        { 
                            rooms.map((room) => {
                                return (
                                    <Container 
                                        fluid id={room.id} 
                                        className={selected === room.id ? 'selected' : ''} 
                                        onClick={() => handleSelect(room.id)}
                                    >
                                        <Row className='room'>
                                            <Col>{room.id}</Col>
                                            <Col>{room.host}</Col>
                                            <Col>{room.numberOfPlayers}-{room.maxNumberOfPlayers}</Col>
                                        </Row>
                                    </Container>
                                );
                            })
                        }
                    </Container>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 4, offset: 1}} style={{ padding: 0 }}>
                    <NavLink to='/404'>
                        <div className={'button' + ' ' + 'main-button'} onClick={handleSubmit}>
                            join
                        </div>
                    </NavLink>
                </Col>
                <Col xs={{span: 4, offset: 2}} className='right-col'>
                    <input 
                        className={'input'}
                        value={name}
                        onChange={handleInput}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default SelectRoom;