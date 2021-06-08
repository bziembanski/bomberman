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
            <Row style={{fontSize: '2.5em'}}>
                {props.win ? "You win!" : "You lost!"}
            </Row>
            <Row>
                <button className='red-button close-button' onClick={props.onHide}>back room</button>
            </Row>
        </Modal.Body>
    )
}

export default Popup;
