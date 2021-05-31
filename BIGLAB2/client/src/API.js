import {jsonMapper} from './utils'

const loadData = () =>{
    return (
        fetch('/api/tasks')
        .then( response => {
          if(!response.ok) { throw Error(response.statusText); }
          return response;
        })
        .then(response => response.json() )
        .then(response => jsonMapper(response.content))
        .catch( err => console.log(err))
    );
}

const loadFilteredData = (filter) =>{
  return (
    fetch(`/api/tasks/${filter}`)
    .then( response => {
      if(!response.ok) { throw Error(response.statusText); }
      return response;
    })
    .then(response => response.json() )
    .then(response => jsonMapper(response.content) )
    .catch( err => console.log(err))
);
}

const insertData = (task) =>{
    return (
        fetch('/api/tasks', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(task)
        })
      .then(data => data.json())
      .catch(err => console.log(err))
    );
}

const modifyData = (task) =>{
  return (
    fetch(`/api/tasks/${task.id}`, 
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(task)
    })
  .then(data => data.json())
  .catch(err => console.log(err))
);
}

const deleteData = (tskID) =>{
    return (
        fetch(`/api/tasks/${tskID}`, 
        {
          method: 'DELETE',
        })
        .then(data => data.json())
        .catch(err => console.log(err))
    );
}

const API = {loadData, insertData, deleteData, loadFilteredData, modifyData};

export default API;