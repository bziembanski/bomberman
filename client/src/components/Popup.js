import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function Popup(props) {
    return (
       <Modal {...props} size='lg' centered>
           <Modal.Body>
               <Row style={{fontSize: '2em', borderBottom: '3px dashed #1a237e'}}>
                   {props.win ? 'You win!' : 'You lost!'}
               </Row>
               <Row>
                   Your score
               </Row>
               <Row style={{color: '#1a237e'}}>
                   {props.point}
               </Row>
               <Row>
                   <button className='red-bad-button' onClick={props.onHide}>
                       back room
                   </button>
               </Row>
           </Modal.Body>
       </Modal>
    );
}

export default Popup;
