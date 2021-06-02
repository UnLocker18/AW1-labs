"use strict";

const sqlite = require("sqlite3");
const dayjs = require("dayjs");
const bcrypt = require("bcrypt");

var isBetween = require("dayjs/plugin/isBetween");
var isToday = require("dayjs/plugin/isToday");

dayjs.extend(isToday);
dayjs.extend(isBetween);

const db = new sqlite.Database("tasks.db", (err) => {
  if (err) throw err;
});

//get all tasks
exports.listTasks = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE user = ?";
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const tasks = rows.map((task) => ({
          id: task.id,
          description: task.description,
          important: task.important,
          private: task.private,
          deadline: task.deadline,
          completed: task.completed,
          user: task.user,
        }));
        resolve(tasks);
      }
    });
  });
};

//get all tasks with a filter
exports.listFilteredTasks = (filterName, userID) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE user = ?";
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        reject(err);
      } else {
        if (rows === undefined)
          resolve({ error: "Tasks not found in database" });
        else {
          const tasks = rows.map((task) => ({
            id: task.id,
            description: task.description,
            important: task.important,
            private: task.private,
            deadline: task.deadline,
            completed: task.completed,
            user: task.user,
          }));
          const filteredTasks = applyFilter(filterName, tasks);
          if (filteredTasks === undefined)
            resolve({ error: "Filter not valid" });
          else resolve(filteredTasks);
        }
      }
    });
  });
};

const applyFilter = (selected, list) => {
  switch (selected) {
    case "all":
      return list;

    case "important":
      return list.filter((task) => task.important);

    case "today":
      return list.filter((task) => {
        if (dayjs(task.deadline).isToday()) return true;
        else return false;
      });

    case "next_7_days":
      return list.filter((task) => {
        if (
          dayjs(task.deadline).isBetween(
            dayjs().startOf("d").add(1, "day").subtract(1, "minute"),
            dayjs().startOf("d").add(8, "day")
          )
        )
          return true;
        else return false;
      });

    case "private":
      return list.filter((task) => task.private);

    case "completed":
      return list.filter((task) => task.completed);

    default:
      return undefined;
  }
};

//get a task with a specific id
exports.listTaskById = (taskId) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM tasks WHERE id = ?";
    db.get(sql, [taskId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        if (row == undefined) {
          resolve({ error: "Task not found in database" });
        } else {
          const task = {
            id: row.id,
            description: row.description,
            important: row.important,
            private: row.private,
            deadline: row.deadline,
            completed: row.completed,
            user: row.user,
          };
          resolve(task);
        }
      }
    });
  });
};

//create a task
exports.newTask = (task) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO tasks (description, important, private, deadline, user) VALUES(?,?,?,?,?)";
    db.run(
      query,
      [task.description, task.important, task.private, task.deadline, task.user],
      function (err) {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

//update task
exports.updateTask = (task) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      "UPDATE tasks SET description = ?1, deadline = ?2, important = ?3, private = ?4, completed = ?5 WHERE id = ?6";
    db.run(
      sqlQuery,
      [
        task.description,
        task.deadline,
        task.important,
        task.private,
        task.completed,
        task.id,
      ],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      }
    );
  });
};

// delete an existing exam
exports.deleteTask = (taskID) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "DELETE FROM tasks WHERE id = ?";
    db.run(sqlQuery, [taskID], function (err) {
      if (err) {
        reject(err);
        return err;
      } else resolve(this.changes);
    });
  });
};

exports.getUser = (username, password) =>{
  return new Promise ( (resolve, reject) => {
    const sql = " SELECT * FROM users WHERE email = ?";
    db.get(sql, [username], (err, row) => {
      if(err) reject(err);
      else if(row===undefined) resolve(false);
      else{
        const user = {
          id: row.id,
          email: row.email,
          name: row.name
        };

      bcrypt.compare(password, row.hash)
      .then(result => {
        if(result) resolve (user);
        else resolve(false);
      })
      }
    })
  });
}

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) 
          reject(err);
        else if (row === undefined)
          resolve({error: 'User not found.'});
        else {
          // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
          const user = {id: row.id, username: row.email, name: row.name}
          resolve(user);
        }
    });
  });
};
