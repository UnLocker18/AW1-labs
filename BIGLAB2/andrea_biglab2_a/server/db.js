'use-strict'
const sqlite = require("sqlite3")
const db = new sqlite.Database("tasks.db", (err) => {
    if(err) throw err
})


exports.newTask = (task) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO tasks (description, important, private, deadline, user) VALUES(?,?,?,?,?)"
        db.run(query, [task.description, task.important, task.private, task.deadline, 1], function(err) {
            if(err){
                reject(err)
                return
            }
            else{
                resolve(this.lastID)
            }
        })
    })
}

//dovrei mettere un db.close()?

exports.getTask = taskID => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'SELECT * from tasks WHERE id = ?';
    db.get(sqlQuery, [taskID], (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      if (row == undefined) {
        resolve({ error: 'Task not found' });
      } else {
        const task = {
          id: row.id,
          description: row.description,
          deadline: row.deadline,
          imortant: row.important,
          private: row.private,
          completed: row.completed,
        };
        resolve(task);
      }
    });
  });
};

exports.updateTask = (taskID, task) => {
  return new Promise((resolve, reject) => {
    const sqlQuery =
      'UPDATE tasks SET description = ?1, deadline = ?2, important = ?3, private = ?4, completed = ?5 WHERE id = ?6';
    db.run(
      sqlQuery,
      {
        1: task.description,
        2: task.deadline,
        3: task.important,
        4: task.private,
        5: task.completed,
        6: taskID,
      },
      err => {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.changes);
      }
    );
  });
};

exports.deleteTask = (taskID) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = 'DELETE FROM tasks WHERE id = ?';
    db.run(sqlQuery, [taskID], err => {
      if (err) {
        reject(err);
        return err;
      } else 
        resolve(this.changes);
    });
  });
};

