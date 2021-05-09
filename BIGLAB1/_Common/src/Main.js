import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { filters, tl } from './data';
import { filterToUrl } from './utils';
import { TaskAdder } from './AdderComponents';
import TaskList from './TaskComponents';

import { Col, Container } from 'react-bootstrap';

import React, { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

function Main(props) {
    const [tasks, setTasks] = useState([...tl]);
    const [editMode, setEditMode] = useState(-1);    

    const [show, setShow] = useState(false);
    const [description, setDescription] = useState({value: '', isValid: false});
    const [isPrivate, setIsPrivate] = useState(false);
    const [isImportant, setIsImportant] = useState(false);
    const [date, setDate] = useState({value: '', isValid: false});
    const [time, setTime] = useState('00:00');
    const [validated, setValidated] = useState(false);

    const deleteTask = (tskID) => {
        setTasks(tsks => tsks.filter(t => t.id !== tskID));
    }

    const editTask = (tskID) => {
        if(tskID >= 0) {
            const currentTask = tasks.find(task => task.id === tskID);

            //qui la checkDescValidity dovrebbe essere inutile
            setDescription({ value: currentTask.description, isValid: checkDescValidity(currentTask.description) });
            setIsPrivate(currentTask.isPrivate);
            setIsImportant(currentTask.isUrgent);
            setDate({ value: currentTask.date.format("YYYY-MM-DD"), isValid: checkDateValidity(currentTask.date) });
            setTime(currentTask.date.format("HH:MM"));
        }
        else clearForm();

        setEditMode(tskID);
    };
    
    const handleShow = () => {
        setEditMode(-1);
        setShow(true);
    }
    const handleClose = () => {
        setShow(false);
        setValidated(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let id;        

        if (description.isValid && date.isValid) {
            if(editMode >= 0) {
                id = editMode;
                deleteTask(id);
            }
            else id = tasks.sort((a, b) => a.id - b.id)[tasks.length - 1].id + 1;

            const task = { id: id, description: description.value, isPrivate: isPrivate, 
                isUrgent: isImportant, date: dayjs.tz(`${date.value}T${time}:00.000Z`)
            };

            setTasks(tsks => [...tsks, task].sort((a, b) => a.id - b.id));
            handleClose();
            clearForm();

            setEditMode(-1);
        }
        else setValidated(true);        
    };

    const handleDescChange = (ev) => {
        setDescription({ value: ev.target.value, isValid: checkDescValidity(ev.target.value) });
    };

    const handleDateChange = (ev) => {
        setDate({ value: ev.target.value, isValid: checkDateValidity(ev.target.value) });
    };

    const handleTimeChange = (ev, value) => {
        setTime(value);
    };

    const checkDescValidity = (desc) => !!desc;

    const checkDateValidity = (date) => dayjs(date) >= dayjs().startOf('d');

    const clearForm = () => {
        setValidated(false);
        setDescription({value: '', isValid: false});
        setIsPrivate(false);
        setIsImportant(false);
        setDate({value: '', isValid: false});
        setTime('00:00');
    };
    
    const formProps = {
        lg: props.lg, editMode, editTask, description, isPrivate, isImportant, date, time, validated,
        setIsPrivate, setIsImportant, handleSubmit, handleDateChange, handleDescChange, handleTimeChange
    };

    const filterName = filters.filter( filter => filterToUrl(filter.text) === props.activeFilter);

    return (
        <Col as="main" lg={8} className="py-3">
            <h1>{filterName[0] ? filterName[0].text : ""}</h1>
            <TaskList tasks={tasks} deleteTask={deleteTask} activeFilter={props.activeFilter} {...formProps} />
            <Container fluid className="fixed-bottom d-flex flex-row-reverse px-4 mb-4">
                <TaskAdder clearForm={clearForm} show={show} handleShow={handleShow} handleClose={handleClose} {...formProps} />
            </Container>
        </Col>
    );
}

export default Main;