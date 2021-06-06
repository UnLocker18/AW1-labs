import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { filters } from './data';
import { filterToUrl, jsonMapperInverse } from './utils';
import { TaskAdder } from './AdderComponents';
import TaskList from './TaskComponents';

import { Col, Container, Alert } from 'react-bootstrap';

import { ArrowRepeat } from 'react-bootstrap-icons';

import React, { useEffect, useState } from 'react';

import API from './API';

import { Redirect } from 'react-router-dom';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault(dayjs.tz.guess());

function Main({ ...props }) {
  const { lg, selectedFilter, message, logged, justLogged, setJustLogged } =
    props;
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState(selectedFilter);

  const filterName = filters.filter(
    filter => filterToUrl(filter.text) === selectedFilter
  );

  useEffect(() => {
    async function loading() {
      if (filterName.length === 0) return <Redirect to="/all" />;

      let filter = filterName[0].text;
      if (filter === 'Next 7 Days') filter = 'next_7_days';

      const data = await API.loadFilteredData(filter.toLowerCase());
      setTasks(data);
      setUpdate(false);
      setLoading(false);
    }

    if (update) loading();
    else {
      if (selectedFilter !== activeFilter) {
        setActiveFilter(selectedFilter);
        loading();
      }
    }
  }, [update, selectedFilter, activeFilter, filterName]);

  useEffect(() => {
    const time = setTimeout(() => setJustLogged(false), 5000);
    return function cleanup() {
      clearTimeout(time);
    };
  }, [justLogged, setJustLogged]);

  /***********  Form States ***********/
  const [editMode, setEditMode] = useState(-1);

  const [show, setShow] = useState(false);
  const [description, setDescription] = useState({ value: '', isValid: false });
  const [isPrivate, setIsPrivate] = useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [date, setDate] = useState({ value: '', isValid: true });
  const [time, setTime] = useState('00:00');
  const [validated, setValidated] = useState(false);
  const [completed, setCompleted] = useState(false);

  const deleteTask = tskID => {
    setTasks(oldTasks => {
      return oldTasks.map(tsk => {
        if (tsk.id === tskID) return { ...tsk, status: 'deleting' };
        else return tsk;
      });
    });

    async function deleting(id) {
      const response = await API.deleteData(id);
      if (response.status === 'success') setUpdate(true);
    }
    deleting(tskID);
  };

  const editTask = tskID => {
    if (tskID >= 0) {
      const currentTask = tasks.find(task => task.id === tskID);

      setDescription({
        value: currentTask.description,
        isValid: checkDescValidity(currentTask.description),
      });

      setIsPrivate(currentTask.isPrivate);
      setIsImportant(currentTask.isUrgent);
      setCompleted(currentTask.completed);

      setDate({
        value: currentTask.date ? currentTask.date.format('YYYY-MM-DD') : '',
        isValid: checkDateValidity(currentTask.date, tskID),
      });

      setTime(currentTask.date ? currentTask.date.format('HH:mm') : '');
    } else clearForm();

    setEditMode(tskID);
  };

  const handleShow = () => {
    setEditMode(-1);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
    setValidated(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (description.isValid && date.isValid) {
      let localId;

      if (tasks.length > 0)
        localId = tasks.sort((a, b) => a.id - b.id)[tasks.length - 1].id + 1;
      else localId = 1;

      let taskDate;

      if (!date.value) taskDate = '';
      else if (date.value && !time)
        taskDate = dayjs.tz(`${date.value}T00:00:00.000Z`);
      else taskDate = dayjs.tz(`${date.value}T${time}:00.000Z`);

      const task = {
        id: editMode > 0 ? editMode : localId,
        description: description.value,
        isPrivate: isPrivate,
        isUrgent: isImportant,
        date: taskDate,
        completed: completed,
      };

      if (editMode === -1) {
        task.status = 'loading';
        setTasks(oldTasks => [
          ...oldTasks.filter(task => task.id !== localId),
          task,
        ]);
      } else {
        setTasks(oldTasks => {
          return oldTasks.map(tsk => {
            if (tsk.id === editMode) return { ...tsk, status: 'updating' };
            else return tsk;
          });
        });
      }

      async function inserting(task) {
        const response = await API.insertData(task);
        if (response.status === 'success') setUpdate(true);
      }

      async function modifying(task) {
        const response = await API.modifyData(task);
        if (response.status === 'success') setUpdate(true);
      }

      if (editMode > 0) modifying(jsonMapperInverse(task));
      else inserting(jsonMapperInverse(task));

      handleClose();
      clearForm();

      setEditMode(-1);
    } else setValidated(true);
  };

  const handleDescChange = ev => {
    setDescription({
      value: ev.target.value,
      isValid: checkDescValidity(ev.target.value),
    });
  };

  const handleDateChange = (ev, tskID) => {
    setDate({
      value: ev.target.value,
      isValid: checkDateValidity(ev.target.value, tskID),
    });
  };

  const handleTimeChange = (ev, value) => {
    setTime(value);
  };

  const checkDescValidity = desc => !!desc;

  const checkDateValidity = (date, tskID) => {
    if (!date) return true;
    else if (tskID >= 0) return true;
    else return dayjs(date) >= dayjs().startOf('d');
  };

  const clearForm = () => {
    setValidated(false);
    setDescription({ value: '', isValid: false });
    setIsPrivate(false);
    setIsImportant(false);
    setDate({ value: '', isValid: true });
    setTime('00:00');
  };

  const completeTask = (res, tskID) => {
    setCompleted(res);
    const currentTask = tasks.find(task => task.id === tskID);

    const task = {
      id: tskID,
      description: currentTask.description,
      isPrivate: currentTask.isPrivate,
      isUrgent: currentTask.isUrgent,
      date: currentTask.date,
      completed: res,
    };

    setTasks(oldTasks => {
      return oldTasks.map(tsk => {
        if (tsk.id === tskID) return { ...tsk, status: 'updating' };
        else return tsk;
      });
    });

    async function modifying(task) {
      const response = await API.modifyData(task);
      if (response.status === 'success') setUpdate(true);
    }

    modifying(jsonMapperInverse(task));
  };

  const formProps = {
    lg: lg,
    editMode,
    editTask,
    description,
    isPrivate,
    isImportant,
    completed,
    date,
    time,
    validated,
    completeTask,
    setCompleted,
    setIsPrivate,
    setIsImportant,
    handleSubmit,
    handleDateChange,
    handleDescChange,
    handleTimeChange,
  };

  return loading ? (
    <Col as="main" lg={8} className="py-5 text-center">
      <ArrowRepeat size={32} className="loading-animation mr-3" />
      <span>Loading data from database server</span>
    </Col>
  ) : (
    <Col as="main" lg={8} className="py-3">
      {logged && justLogged && (
        <Alert
          variant="success"
          onClose={() => setJustLogged(false)}
          className="d-flex justify-content-center"
          dismissible
        >
          <span>{message.details}</span>
        </Alert>
      )}
      <h1>{filterName[0] ? filterName[0].text : ''}</h1>
      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        activeFilter={activeFilter}
        {...formProps}
      />
      <Container
        fluid
        className="fixed-bottom d-flex flex-row-reverse px-4 mb-4"
      >
        <TaskAdder
          clearForm={clearForm}
          show={show}
          handleShow={handleShow}
          handleClose={handleClose}
          {...formProps}
        />
      </Container>
    </Col>
  );
}

export default Main;
