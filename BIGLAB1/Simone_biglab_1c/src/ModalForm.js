import './App.css';
import dayjs from 'dayjs'

import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalBody from 'react-bootstrap/ModalBody'
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalTitle from 'react-bootstrap/ModalTitle'
import Alert from 'react-bootstrap/Alert'

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import {useState} from 'react'

function ModalForm(props){

    const [des, setDes] = useState("");
    const [date, setDate] = useState(dayjs());
    const [priv, setPriv] = useState(false);
    const [urg, setUrg] = useState(false);
    const [err, setErr] = useState(false);
    const isPrivate= () => { setPriv(!priv); };
    const isUrgent = () => { setUrg(!urg); };

    const handleSubmit= (event) => {
        event.preventDefault();
        let valid = true;
        setErr(!valid);

        if(des==="") { 
            valid = false; 
            setErr("Errore:  manca la descrizione del task"); 
        }
        if(des.length > 30) { 
            valid = false; 
            setErr("Errore: descrizione troppo lunga"); 
        }
        if(dayjs(date).isBefore(dayjs()) && dayjs(date).format("YYYY-MM-DD")!=dayjs().format("YYYY-MM-DD") ) { 
            valid = false; 
            setErr("Errore: Viaggio nel tempo ancora impossibile"); }

        if(valid){
            const task = {id: props.idTask, description: des, isPrivate: priv, isUrgent: urg, date: dayjs(date).format("dddd D MMMM YYYY H:mm") } 
            props.addTask(task);
            props.setModal(false);
            setDes("");
            setDate(dayjs());
            setPriv(false);
            setUrg(false);
        }  
      }

    return (<>
    <Modal show={props.modal} onHide={() => props.setModal(false)} size="lg" centered backdrop="static" keyboard={false}>
        <ModalHeader closeButton className="bg-dark" >
            <Col className="d-flex justify-content-center" >
                <ModalTitle className="text-white" >ToDO Add Task</ModalTitle>
            </Col>
        </ModalHeader>
        <ModalBody>
            <Form>
                {err ? <Alert variant="danger">{err}</Alert> : "" } 
                <Form.Group as={Row}>
                    <Form.Label column md={2} className="font-1_10">Description</Form.Label>
                    <Col md={10}>
                        <Form.Control type="text" placeholder="Insert a description" 
                                      value={des} onChange={ev => setDes(ev.target.value) }/>
                    </Col>
                </Form.Group> 

                <Form.Group as={Row}>
                    <Form.Label column md={2} className="font-1_10">Deadline(*)</Form.Label>
                    <Col md={10}>
                        <Form.Control type="date" placeholder="Insert a deadline" 
                                      value={date} onChange={ev => setDate(ev.target.value) } />
                        <Form.Label className="font-075">(*) data odierna come default</Form.Label>
                    </Col>
                </Form.Group> 

                <Form.Group as={Row}>
                    <Col md={2}>
                        <Form.Label className="font-1_10">Private</Form.Label>
                    </Col>
                    <Col md={2}>
                        <Form.Check type="checkbox" value={priv} onChange={() => isPrivate() } />
                    </Col>
                    <Col md={2}>
                        <Form.Label className="font-1_10">Urgent</Form.Label>
                    </Col>      
                    <Col md={2}>
                        <Form.Check type="checkbox" value={urg} onChange={() => isUrgent() } />
                    </Col>
                </Form.Group> 
            </Form>
        </ModalBody>
        <ModalFooter >
            <Button variant="info"  onClick={handleSubmit} >Save</Button>
            <Button variant="dark" onClick={() => props.setModal(false)}>Clear</Button>
        </ModalFooter>
    </Modal>
    </>
    );
}

export default ModalForm;