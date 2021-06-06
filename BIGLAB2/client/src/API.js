import { jsonMapper } from './utils';

const loadData = () => {
  return fetch('/api/tasks')
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => jsonMapper(response.content))
    .catch(err => console.log(err));
};

const loadFilteredData = filter => {
  return fetch(`/api/tasks/${filter}`)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => jsonMapper(response.content))
    .catch(err => console.log(err));
};

const insertData = task => {
  return fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
    .then(data => data.json())
    .catch(err => console.log(err));
};

const modifyData = task => {
  return fetch(`/api/tasks/${task.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  })
    .then(data => data.json())
    .catch(err => console.log(err));
};

const deleteData = tskID => {
  return fetch(`/api/tasks/${tskID}`, {
    method: 'DELETE',
  })
    .then(data => data.json())
    .catch(err => console.log(err));
};

const loginUser = async credentials => {
  let response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  console.log(response);

  if (response.ok) {
    const user = await response.json();
    console.log(user);
    return user.name;
  } else {
    try {
      const errDetail = await response.json();
      console.log(errDetail);
      throw errDetail.message;
    } catch (err) {
      throw err;
    }
  }
};

async function isUserLogged() {
  return fetch('/api/login/current')
    .then(response => {
      if (response.ok) {
        console.log('User still logged!');
        return response;
      }
    })
    .catch(err => {
      throw err;
    });
}

async function logoutUser() {
  await fetch('/api/login/current', { method: 'DELETE' });
}

const API = {
  loadData,
  insertData,
  deleteData,
  loadFilteredData,
  modifyData,
  loginUser,
  isUserLogged,
  logoutUser,
};

export default API;
