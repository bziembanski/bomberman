import React, {useEffect, useState} from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import TopButtons from '../components/TopButtons';


function SelectRoom(props) {
    const history = useHistory();
    const [selected, setSelected] = React.useState();
    const [name, setName] = React.useState('new_player');
    const socket = props.socket;
    const [rooms, setRooms] = useState([]);

    const handleInput = (event) => {
        if(event.target.value.length < 12)
            setName(event.target.value);
    }

    const handleSubmit = () => {
        socket.emit("joinRoom", {roomId: selected, nickname: name});
        history.push(`/room/${selected}`, { from: "/select-room" });
    }

    useEffect(() => {
        socket.emit('getRooms');

        socket.on('rooms', rooms => {
            setRooms(rooms);
        });

        return () => {
            socket.off('rooms');
        };
    },[]);

    return (
        <Container fluid className='root'>
            <TopButtons history={history} isMuted={props.isMuted} setIsMuted={props.setIsMuted}/>
            <Row>
                <Col xs={{span: 10, offset: 1}} style={{justifyItems: 'center', alignSelf: 'center'}}>
                    <Container fluid style={{textAlign: 'center', backgroundColor: '#C4C4C4', height: '64vh'}}>
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
                                            key={room.roomId}
                                            fluid id={room.roomId}
                                            className={selected === room.roomId && 'selected'}
                                            onClick={() => setSelected(room.roomId)}
                                        >
                                            <Row className='room'>
                                                <Col>{room.roomId}</Col>
                                                <Col>{room.host}</Col>
                                                <Col>{room.numOfPlayers} - {room.maxPlayers}</Col>
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