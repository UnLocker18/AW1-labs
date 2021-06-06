# BigLab 2 - Class: 2021 AW1 A-L

## Team name: TEAM_NAME

Team members:

- s287515 Fasolis Simone
- s291423 Cominelli Andrea
- s281963 Garganese Gianluca
- s291076 Cresti Alessandro

## Usernames and Passwords

- username: andrea@polito.it password: password
- username: simo@polito.it password: 12345678
- username: alle@polito.it password: password
- username: gianluca@polito.it password: password

## List of APIs offered by the server

### Load Tasks

**GET** _/api/tasks_

Lists all available tasks for a specific user.

**Request body**: None  
**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error.  
**Response body**: A JSON object containing a string for status, some details and the array of loaded tasks.

```
{
  "status": "success",
  "details": "api GET /tasks",
  "content": [
    {
      "id": 2,
      "description": "Testing, please ignore",
      "important": 1,
      "private": 0,
      "deadline": "2021-05-22",
      "completed": 0,
      "user": 1
    },
    {
      ...
    }
  ]
}
```

### Load Task by ID

**GET** _/api/tasks/:id_

Load a user specific task, given its ID (an integer between 0 and 100).

**Request body**: None  
**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error and `400 Bad Request` for an invalid IDs.  
**Response Body**: A JSON object containing a string for status, some details and the requested task.

```
{
  "status": "success",
  "details": "api GET /tasks/:id",
  "content": [
    {
      "id": 2,
      "description": "Testing, please ignore",
      "important": 1,
      "private": 0,
      "deadline": "2021-05-22",
      "completed": 0,
      "user": 1
    }
}
```

### Load Tasks by Filter

**GET** _/api/tasks/:filter_

Load all user tasks which satisfy a specific filter.

**Request body**: None  
**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error and `400 Bad Request` for an invalid filters.  
**Response body**: A JSON object containing a string for status, some details and the array of loaded tasks which satisfy the filter.

```
{
  "status": "success",
  "details": "api GET /tasks",
  "content": [
    {
      "id": 2,
      "description": "Testing, please ignore",
      "important": 1,
      "private": 0,
      "deadline": "2021-05-22",
      "completed": 0,
      "user": 1
    },
    {
      ...
    }
  ]
}
```

### Create a Task

**POST** _/api/tasks_

Create a new task for the current user.

**Request body**: A Task object

```
{
  "description": "New Task",
  "important": 0,
  "private": 1,
  "deadline": "2021-06-10",
  "user", 1
}
```

**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error and `422 Unprocessable Entity` if any of the parameters fail validation.
**Responde body**: A service message containing the status and some details. If the POST is successfull it also contains the ID of the newly created task.

```
{
  "status": "success",
  "details": "api POST /tasks with id: 10"
}
```

### Update a Task

**PUT** _/api/tasks/:id_

Update an already existing task from its ID.

**Request body**: a Task object containing the updated fields  
**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error, `422 Unprocessable Entity` if any of the parameters fail validation and `404 Not Found` if a task can't be found in the db.

**Responde body**: A service message containing the status and some details.

```
{
  "status": "success",
  "details": "Updated task"
}
{
  "status": "success",
  "details": "Task not found"
}
```

### Delete a Task

**DELETE** _/api/tasks/:id_

Delete a task given its ID.

**Request body**: None  
**Response**: `200 OK` for success, `500 Internal Server Error` for a generic db error, `400 Bad Request` for an invalid IDs and `404 Not Found` if a task can't be found in the db.  
**Response body**: A service message containing the status and some details (in perticular the number of deleted tasks if succesful).

```
{
  "status": "success",
  "details": "Deleted 1 tasks"
}
{
  "status": "success",
  "details": "Task not found"
}
```

### Log In

**POST** _/api/login_

Allows a user to log in.

**Request Body**: An object containing username and password

```
{
  "username": uname1,
  "password": pwd1
}
```

**Response**: `200 OK` for login success, `401 Unauthorized` if the username or password are wrong or do not exist.  
**Response Body**: a User object

### Log Out

**DELETE** _/api/login/current_

Logs out the current user

**Request body**: None
**Response**: None

### Check if User is Logged In

**GET** _/api/login/current_

Checks wether the user is logged in or not

**Request body**: None  
**Response**: `200 OK` if the user is authenticated, `401 Unauthorized` if he is not  
**Response body**: a User object if success, otherwise an error message

- [HTTP Method] [URL, with any parameter]
- [One-line about what this API is doing]
- [Sample request, with body (if any)]
- [Sample response, with body (if any)]
- [Error responses, if any]
