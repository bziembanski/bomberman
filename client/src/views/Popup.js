import React from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

function Popup(props) {

    return (
       <Modal
           {...props}
           size="lg"
           centered
           backdrop="static">
           {!props.alert ? <EndGame {...props}/> : <Alert {...props}/>}
       </Modal>
    );
}

function Alert(props) {
    return (
        <Modal.Body>
            <Row style={{fontSize: '2.5em'}}>
                Alert!
            </Row>
            <Row style={{fontSize: '1.5em'}}>Set a player name</Row>
            <Row>
                <button className='red-button close-button' onClick={props.onHide}>close</button>
            </Row>
        </Modal.Body>
    )
}

function EndGame(props) {
    return (
        <Modal.Body>
            <Row style={{fontSize: '2em', borderBottom: '3px dashed #1a237e'}}>
                {props.win ? "You win!" : "You lost!"}
            </Row>
            <Row style={{fontSize: '1.5em'}}>Your score</Row>
            <Row style={{color: '#1a237e', fontSize: '1.5em'}}>{props.point}</Row>
            <Row>
                <button className='red-button close-button' onClick={props.onHide}>back room</button>
            </Row>
        </Modal.Body>
    )
}

export default Popup;
